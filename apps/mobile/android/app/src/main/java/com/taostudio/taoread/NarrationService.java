package com.taostudio.taoread;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.Nullable;
import androidx.media3.common.AudioAttributes;
import androidx.media3.common.C;
import androidx.media3.common.MediaItem;
import androidx.media3.common.Player;
import androidx.media3.exoplayer.ExoPlayer;
import androidx.media3.session.MediaSession;
import androidx.media3.session.MediaSessionService;

import java.util.ArrayList;
import java.util.List;

/**
 * 原生朗读前台服务（docs/104 路线B M2b）。
 *
 * 第一性约束：息屏后 WebView JS 挂起，段级衔接必须发生在原生层——
 * 因此本服务持有整条播放队列（ExoPlayer playlist 链式），web 只订事件。
 * web 的 SSE 流入经 NarrationPlugin.appendSegment 追加，天然支持边合成边播。
 */
public class NarrationService extends MediaSessionService {

  private ExoPlayer player;
  private MediaSession session;
  /** 是否已进入前台服务状态（首个 play 时 startForeground） */
  private boolean foreground = false;
  private static final String CHANNEL_ID = "narration";

  @Override
  public void onCreate() {
    super.onCreate();
    NotificationChannel channel = new NotificationChannel(
        CHANNEL_ID, "朗读播放", NotificationManager.IMPORTANCE_LOW);
    channel.setShowBadge(false);
    NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    if (nm != null) nm.createNotificationChannel(channel);

    player = new ExoPlayer.Builder(this)
        .setAudioAttributes(
            new AudioAttributes.Builder()
                .setUsage(C.USAGE_MEDIA)
                .setContentType(C.AUDIO_CONTENT_TYPE_SPEECH)
                .build(),
            true /* handleAudioFocus=true：来电/其他应用请求焦点时让出 */
        )
        .setHandleAudioBecomingNoisy(true) /* 拔耳机自动暂停 */
        .build();

    player.addListener(new Player.Listener() {
      @Override
      public void onMediaItemTransition(@Nullable MediaItem mediaItem, int reason) {
        int index = player.getCurrentMediaItemIndex();
        NarrationPlugin.emitSegmentStart(index);
      }

      @Override
      public void onPlaybackStateChanged(int playbackState) {
        NarrationPlugin.emitState(player.isPlaying());
        if (playbackState == Player.STATE_ENDED) {
          NarrationPlugin.emitEnded();
        }
      }

      @Override
      public void onIsPlayingChanged(boolean isPlaying) {
        NarrationPlugin.emitState(isPlaying);
      }

      @Override
      public void onPlayerError(androidx.media3.common.PlaybackException error) {
        int index = player.getCurrentMediaItemIndex();
        NarrationPlugin.emitSegmentError(index, String.valueOf(error.errorCode));
      }
    });

    session = new MediaSession.Builder(this, player).build();
  }

  @Override
  public androidx.media3.session.MediaSession onGetSession(MediaSession.ControllerInfo controllerInfo) {
    return session;
  }

  /** 追加段到队列；若播放器自然播完处于 ENDED 态则自动续播（SSE 流入衔接的关键） */
  void appendSegment(String url) {
    ensureForeground();
    player.addMediaItem(MediaItem.fromUri(url));
    if (player.getPlaybackState() == Player.STATE_ENDED) {
      player.play();
    }
  }

  void play() {
    ensureForeground();
    player.prepare();
    player.play();
  }

  void pause() {
    player.pause();
  }

  /** 停止并清空队列（web stop() 语义） */
  void stopAll() {
    player.stop();
    player.clearMediaItems();
    stopForeground(STOP_FOREGROUND_REMOVE);
    stopSelf();
    foreground = false;
  }

  void jumpTo(int index) {
    if (index >= 0 && index < player.getMediaItemCount()) {
      player.seekToDefaultPosition(index);
      player.play();
    }
  }

  /** 当前段下标与段内毫秒位置（字级高亮轮询用） */
  long getPositionMs() {
    return player.getCurrentPosition();
  }

  int getCurrentIndex() {
    return player.getCurrentMediaItemIndex();
  }

  boolean isPlayingNow() {
    return player.isPlaying();
  }

  int getMediaItemCount() {
    return player.getMediaItemCount();
  }

  /** 哄睡渐弱：durationMs 内音量线性降到 0 再停（web fadeOutAndStop 语义） */
  void fadeStop(long durationMs, Context context) {
    final int steps = 12;
    final long stepMs = Math.max(200, durationMs / steps);
    final float from = player.getVolume() > 0 ? player.getVolume() : 1f;
    for (int i = 1; i <= steps; i++) {
      final float target = Math.max(0f, from * (1f - i / (float) steps));
      android.os.Handler h = new android.os.Handler(android.os.Looper.getMainLooper());
      h.postDelayed(() -> {
        player.setVolume(target);
        if (target <= 0f) {
          stopAll();
          player.setVolume(1f);
        }
      }, stepMs * i);
    }
  }

  private void ensureForeground() {
    // MediaSessionService 默认 MediaNotificationProvider 会在播放开始时自动
    // startForeground + 媒体样式通知（播放/暂停/上下段按钮）。这里只保证服务已启动。
    try {
      startService(new Intent(this, NarrationService.class));
    } catch (Exception ignored) {
      /* 已在运行 */
    }
    NarrationPlugin.attachService(this);
  }

  @Override
  public void onTaskRemoved(android.content.Intent rootIntent) {
    // 上滑划掉任务卡：按家庭朗读场景选择「继续播」（前台服务本就为此存在）
    super.onTaskRemoved(rootIntent);
  }

  @Override
  public void onDestroy() {
    NarrationPlugin.detachService(this);
    if (player != null) {
      player.release();
      player = null;
    }
    if (session != null) {
      session.release();
      session = null;
    }
    super.onDestroy();
  }
}
