package com.taostudio.taoread;

import android.content.Context;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.List;

/**
 * 原生朗读桥（docs/104 路线B M2b）。
 * 同进程静态服务引用 + pending 队列，规避 startService 后 onCreate 异步竞态；
 * web 侧编排（audioPlayer.ts）完全复用，只换引擎。
 */
@CapacitorPlugin(name = "Narration")
public class NarrationPlugin extends Plugin {

  private static volatile NarrationService service;
  /** 服务 onCreate 前到达的 append 先排队，attachService 时放行 */
  private static final List<String> pending = new ArrayList<>();
  private static volatile NarrationPlugin instance;
  private static boolean pendingPlay = false;

  @Override
  public void load() {
    instance = this;
  }

  /* ---- service -> web 事件桥（静态，服务同进程直调） ---- */

  static void emitSegmentStart(int index) {
    NarrationPlugin p = instance;
    if (p == null) return;
    JSObject data = new JSObject();
    data.put("index", index);
    p.notifyListeners("segmentStart", data);
  }

  static void emitState(boolean playing) {
    NarrationPlugin p = instance;
    if (p == null) return;
    JSObject data = new JSObject();
    data.put("playing", playing);
    p.notifyListeners("state", data);
  }

  static void emitEnded() {
    NarrationPlugin p = instance;
    if (p == null) return;
    p.notifyListeners("ended", new JSObject());
  }

  static void emitSegmentError(int index, String message) {
    NarrationPlugin p = instance;
    if (p == null) return;
    JSObject data = new JSObject();
    data.put("index", index);
    data.put("message", message);
    p.notifyListeners("segmentError", data);
  }

  /* ---- service 生命周期桥 ---- */

  static void attachService(NarrationService svc) {
    service = svc;
    for (String url : new ArrayList<>(pending)) {
      svc.appendSegment(url);
    }
    pending.clear();
    if (pendingPlay) {
      pendingPlay = false;
      svc.play();
    }
  }

  static void detachService(NarrationService svc) {
    if (service == svc) service = null;
  }

  private void ensureService(Context ctx) {
    try {
      ContextCompat.startForegroundService(ctx, new android.content.Intent(ctx, NarrationService.class));
    } catch (Exception ignored) {
      /* Android 12+ 后台启动限制：仅在前台手势路径调用，忽略异常保播放体验 */
    }
  }

  /* ---- web -> native 命令 ---- */

  @PluginMethod
  public void appendSegment(PluginCall call) {
    String url = call.getString("url");
    if (url == null || url.isEmpty()) { call.reject("url required"); return; }
    Context ctx = getContext();
    if (service != null) {
      service.appendSegment(url);
    } else {
      ensureService(ctx);
      pending.add(url);
    }
    call.resolve();
  }

  @PluginMethod
  public void play(PluginCall call) {
    if (service != null) {
      service.play();
    } else {
      ensureService(getContext());
      pendingPlay = true;
    }
    call.resolve();
  }

  @PluginMethod
  public void pause(PluginCall call) {
    if (service != null) service.pause();
    call.resolve();
  }

  @PluginMethod
  public void stop(PluginCall call) {
    if (service != null) service.stopAll();
    pending.clear();
    pendingPlay = false;
    call.resolve();
  }

  @PluginMethod
  public void jumpTo(PluginCall call) {
    Integer index = call.getInt("index");
    if (service != null && index != null) service.jumpTo(index);
    call.resolve();
  }

  @PluginMethod
  public void fadeStop(PluginCall call) {
    Integer ms = call.getInt("durationMs", 6000);
    if (service != null) service.fadeStop(ms, getContext());
    call.resolve();
  }

  @PluginMethod
  public void getPosition(PluginCall call) {
    JSObject out = new JSObject();
    if (service != null) {
      out.put("index", service.getCurrentIndex());
      out.put("positionMs", service.getPositionMs());
      out.put("playing", service.isPlayingNow());
      out.put("count", service.getMediaItemCount());
    } else {
      out.put("index", 0);
      out.put("positionMs", 0L);
      out.put("playing", false);
      out.put("count", 0);
    }
    call.resolve(out);
  }
}
