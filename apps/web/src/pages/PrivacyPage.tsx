/**
 * 隐私政策（docs/34 P1-3）：静态公开页，与登录页同视觉语言。
 * 红线：零外链、零追踪脚本、只写我们真正做的事——
 * 不收集儿童真实身份信息、无第三方广告/SDK、家庭数据自部署自持有。
 */

export const PRIVACY_VERSION = '2026-09-28'

const SECTIONS: Array<{ title: string; lines: string[] }> = [
  {
    title: '我们收集什么',
    lines: [
      '孩子档案只有家长填写的展示昵称和年龄段（3-5 / 6-8 / 9-12），不要真实姓名、生日、照片或联系方式。',
      '设备标识是浏览器本地随机生成的一串字符（如 web-x1a2b3），只用于在设置页区分设备，不关联任何身份。',
      '阅读行为数据（读了哪本书、读到哪、共读时长、金句、生词）保存在家庭自己的数据库里，用于周报和成就。',
    ],
  },
  {
    title: '我们不做什么',
    lines: [
      '没有任何第三方广告、统计 SDK 或跨站追踪；页面字体与插画全部自托管。',
      '不向任何第三方出售或共享数据；孩子端不外发任何请求到第三方网站。',
      '不做付费推广推送；没有消息轰炸。',
    ],
  },
  {
    title: '监护人同意',
    lines: [
      '创建家庭时，监护人需勾选同意本政策；同意行为（政策版本与时间）会留痕，可审计。',
      '孩子使用家庭码加入即视为监护人已阅读并同意本政策。',
    ],
  },
  {
    title: '你的权利',
    lines: [
      '家长可以在「设置 → 导出家庭数据」随时下载全部阅读记录（JSON 文件）。',
      '家长可以撤销任意设备的登录、删除孩子档案，或在「注销家庭」中一次性物理删除全部数据（需重输家庭码确认）。',
    ],
  },
  {
    title: 'AI 生成内容',
    lines: [
      '书中的部分插画与朗读声音由 AI 生成，画面均有「AI」角标，文件内嵌 AI 生成标识。',
      'AI 生成仅由家长在家长端触发，孩子端没有生成入口。',
    ],
  },
]

export function PrivacyPage() {
  return (
    <div className="app">
      <div className="wrap login-wrap">
        <header className="login-brand">
          <div className="logo big">
            <img src="/brand/logo-256.png" alt="桃阅读" />
          </div>
          <h1>隐私政策</h1>
          <p className="mono-line" style={{ fontSize: 12 }}>
            版本 {PRIVACY_VERSION}
          </p>
        </header>
        {SECTIONS.map((s) => (
          <div className="panel" key={s.title} style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: 18 }}>{s.title}</h2>
            {s.lines.map((line, i) => (
              <p key={i} style={{ textIndent: 0, marginTop: 8 }}>
                · {line}
              </p>
            ))}
          </div>
        ))}
        <p className="mono-line" style={{ textAlign: 'center', fontSize: 12 }}>
          有问题请直接联系搭建这个服务的大人（自部署，联系渠道由部署者提供）
        </p>
        <button type="button" className="sticker-btn primary block" onClick={() => window.history.back()}>
          返回
        </button>
      </div>
    </div>
  )
}
