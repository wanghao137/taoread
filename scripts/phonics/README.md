# 自然拼读候选素材制作

这些脚本只制作候选文件和检查报告，不签认教学、语音或素材权利，不修改生产库。当前两种语音候选均未达到正式开放条件。不要把 ASR 文本相同或 PCM 可解码当成纯音、口音、合成教学正确的证明。

## 环境与来源

- 图片：仓库锁定的 Node、sharp；原创 SVG 源在 `docs/phonics/art`。16 场景覆盖 32 引用，15 组不同 WebP 字节。图片经 Codex 目视检查，仍待教学情境审校。
- 中文/第一批英文：现有配置的 StepAudio；脚本显式读取指定 env 文件，不打印凭据。供应商请求声音标签不代表固定声纹或经验证的英式口音。第一批的拒绝和音素异常保留在制作记录。
- 第二批英文：Piper `en_GB-cori-high`，模型 SHA256 `470b4dd634c98f8a4850d7626ffc3dfc90774628eeef6605a6dd8f88f30a5903`；模型卡声明 LibriVox/public domain，仍需权利审校。来源：https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_GB/cori/high 。独立音素输入出现异常长辅音，不用于正式教学。
- Python 工具依赖：`onnxruntime==1.23.2`、numpy、soundfile、imageio-ffmpeg；独立转写检查另需 sherpa-onnx 和已验证校验和的 SenseVoice 模型。模型、依赖和音频不随业务应用运行，不增加服务器实时推理或在线供应商调用。

## 制作命令

在仓库根运行，`<python>` 指安装了上述依赖的隔离解释器；所有路径必须显式指定。

```powershell
node scripts/phonics/create-illustrations.mjs --out <media-root>
node --import tsx apps/server/scripts/produce-phonics-audio.mts --out <media-root> --env-file <local-env> --concurrency 2
<python> scripts/phonics/produce-controlled-audio.py --course apps/server/src/modules/phonics/courses/taoread-phonics-gb-v1 --voice <voice-directory> --out <media-root>
node scripts/phonics/assemble-candidates.mjs --course apps/server/src/modules/phonics/courses/taoread-phonics-gb-v1 --media <media-root>
<python> scripts/phonics/review-audio.py --root <media-root> --model-dir <sensevoice-directory> --receipt combined-audio-candidates.json --report combined-audio-technical-review.json --workers 2
node --import tsx apps/server/scripts/validate-phonics.mts --mode development --media-root <media-root> --out <development-report>
node --import tsx apps/server/scripts/export-phonics-review.mts --out docs/phonics
```

`assemble-candidates` 只接受 draft 且无已批准素材的课程；逐文件校验 SHA256 后绑定元数据，保留 pending/rejected。修改绑定后须重新计算课程哈希并更新清单，再导出台账。英文分音 timeline 是原始 PCM 边界，尚未经 MP3 延迟校正和听审，因此未写入正式任务。当前空 timeline 不能称已完成同步音块。

技术检查报告在 `docs/phonics/evidence`；真实候选媒体和原始 WAV 在本地 `output/phonics-release-20261019/media`。其不属于公开课程，不进入公共媒体同步。正式发布仍须通过 `phonics-release.mts` 的内容、语音、权利、教学、真机、家庭试点与恢复证据门槛。

## 两阶段发布

解决“试点前先要求试点结果”的流程循环，不降低孩子接触内容的质量要求：

1. `publish-pilot`：内容 release 校验通过，提交技术、真实设备、教学/语音、备份恢复四类真实验收证据，写入 `status=pilot`。不要求尚未发生的家庭观察。
2. `TAO_PHONICS_ROLLOUT=pilot` 加受控家庭名单，家长主动开启。`pilot` 版本在 `rollout=all` 时也不可访问，防止误切开关扩大范围；不能设为默认正式版本。
3. 按 `docs/phonics/pilot-protocol.md` 完成真实观察、修订和复测，`publish` 在原四类证据之外要求 `familyPilot`。改了课程内容或素材时，相关证据须重新对应新哈希。
4. 正式 published 后才允许 `set-default` 和按计划扩大范围；withdraw 对两种状态都有效。

写操作均须显式 `--database file:<absolute-db-path>`、`--media-root <media-root>`、`--expect-hash <exact-content-hash>`、发布时另传 `--acceptance <receipt.json>`。不能依靠应用启动自动发布，也不直接手工改库跳过工具。

验收收据字段沿用 `complete/versionId/contentHash/technical/realDevices/teachingAndSpeech/backupRestore/approvedBy/approvedAt`，正式发布另需 `familyPilot`。各证据引用必须是可解析 JSON，包含匹配的 `versionId/contentHash`、对应字段名的 `kind`、真实通过后的 `complete:true/result:passed`，以及实际检查记录。空文件、旧哈希、pending 结果拒绝。该结构只是机器校验，不能替代实际验收；真实签认不得由此文档或测试夹具生成。
