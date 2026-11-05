package com.taostudio.taoread;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    // docs/104 路线B：工程内本地插件手动注册（不走 npm 插件自动注册）
    registerPlugin(NarrationPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
