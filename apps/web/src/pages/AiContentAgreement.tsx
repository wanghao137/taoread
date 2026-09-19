/**
 * AI 生成内容标识说明（用户协议侧）（docs/13 P0-8 / 合规）。
 *
 * 《人工智能生成合成内容标识办法》第八条：「应当在用户服务协议中明确说明
 * 生成合成内容标识的方法、样式等规范内容，并提示用户仔细阅读」。
 *
 * 本组件是该方法与样式的规范说明：显式标识（角标）+ 隐式标识（文件元数据）
 * 各自长什么样、在哪里看、依据哪部法规。挂在登录页，首次使用前可见。
 */
export function AiContentAgreement() {
  return (
    <div className="flex flex-col gap-4 text-left">
      <section>
        <h3 className="mb-1.5 text-base font-bold">哪些内容是 AI 生成的</h3>
        <ul className="flex flex-col gap-1 text-sm leading-relaxed text-ink-700">
          <li>· 绘本插画（书籍封面与章节题图）</li>
          <li>· 「让画面动起来」的章节动画</li>
          <li>· 朗读配音（拟人化语音合成，非真人录音）</li>
        </ul>
        <p className="mt-1.5 text-sm text-ink-700">
          书籍正文为公版书籍原文或桃阅读自著，不由 AI 生成。
        </p>
      </section>

      <section>
        <h3 className="mb-1.5 text-base font-bold">标识方法与样式</h3>
        <ul className="flex flex-col gap-1 text-sm leading-relaxed text-ink-700">
          <li>
            · <span className="font-medium text-ink-900">显式标识</span>
            ：插画右下角「AI 绘制」小角标，动画右下角「AI 动画」小角标
          </li>
          <li>
            · <span className="font-medium text-ink-900">隐式标识</span>
            ：图片文件的元数据（EXIF）中写入「AI 生成 + 服务提供者 + 内容编号」，
            不影响观看，可用图片属性查看
          </li>
          <li>· 完整说明见家长端「设置 → AI 生成内容说明」</li>
        </ul>
      </section>

      <section>
        <h3 className="mb-1.5 text-base font-bold">依据</h3>
        <p className="text-sm leading-relaxed text-ink-700">
          《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行）第三、四、五、八条；
          《互联网信息服务深度合成管理规定》第十六条。
        </p>
      </section>

      <p className="text-xs leading-relaxed text-ink-700/70">
        标识一经添加不会删除或篡改。孩子端不提供内容发布功能，因此不涉及传播场景的主动声明。
      </p>
    </div>
  )
}
