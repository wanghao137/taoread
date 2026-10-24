/**
 * 隐私政策（docs/34 P1-3）：静态公开页，与登录页同视觉语言。
 * 红线：零外链、零追踪脚本、只写我们真正做的事——
 * 不收集儿童真实身份信息、无第三方广告/SDK、家庭数据自部署自持有。
 */

import { BrandLogo } from '../components/ui'

export const PRIVACY_VERSION = '2026-10-15'

const SECTIONS: Array<{ title: string; lines: string[] }> = [
  {
    title: '我们收集什么',
    lines: [
      '孩子档案只有家长填写的展示昵称和年龄段（3-5 / 6-8 / 9-12），不要真实姓名、生日、照片或联系方式。',
      '设备标识是浏览器本地随机生成的一串字符（如 web-x1a2b3），只用于在设置页区分设备，不关联任何身份。',
      '家长登录使用家庭码和独立 PIN，孩子只使用家庭码。服务端仅保存加盐、带服务端密钥保护的 PIN 哈希及尝试次数，不保存明文 PIN；PIN 不随家庭数据导出。',
      '阅读记录由本服务的部署者保存在服务端数据库，按家庭和孩子区分，用于进度、回看和共读记录；并非每个家庭有一台独立数据库。',
    ],
  },
  {
    title: '我们不做什么',
    lines: [
      '没有第三方广告、统计 SDK 或跨站追踪，不出售家庭阅读记录。',
      '页面与媒体通过部署者配置的服务器和 Cloudflare 网络提供；部分公共图片、音频会从媒体域名请求。网络服务可能处理提供内容所需的 IP 地址等技术信息。',
      '朗读缓存缺失时，服务端可能向配置的语音供应商发送本章文本及音色参数以合成声音。家庭上传书籍也可能用于朗读；不发送家庭码或孩子真实身份。家长主动生成图片、视频或连接微信读书时，相关服务会处理该功能必要的数据。',
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
      '家长可以在「设置 → 导出家庭数据」下载服务端提供的家庭记录；记录导出与完整可恢复备份的范围不同，下载前会说明。',
      '家长可以撤销设备、删除孩子档案或注销家庭。注销会删除在线数据库中的家庭记录、家庭书正文与媒体访问权并撤销会话；原始上传文件、媒体文件和历史备份不保证即时物理删除，目前历史备份没有自动到期清理期限，需要部署者处理。恢复旧备份前必须排除已注销家庭。',
      '公共书离线副本在应用中保存 7 天，联网注销不能远程抹除其他设备上的文件；导出文件由保存者自行保管和删除。请在各设备清除本机离线书架及下载文件。',
    ],
  },
  {
    title: 'AI 生成内容',
    lines: [
      '书中的部分插画与朗读声音由 AI 生成，画面均有「AI」角标，文件内嵌 AI 生成标识。',
      '家长可主动触发插画和动画生成；孩子点击朗读时，缓存缺失也可能触发服务端语音合成。部分译文或改写包含 AI 辅助加工，以书籍来源说明为准。',
    ],
  },
]

export function PrivacyPage() {
  return (
    <div className="app utility-app privacy-app">
      <main id="main-content" className="wrap utility-page privacy-page">
        <header className="login-brand">
          <div className="logo big">
            <BrandLogo alt="桃阅读" />
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
          数据或内容问题可由家长在「设置 → 帮助与反馈」提交，请不要填写孩子真实姓名、电话或地址。
        </p>
        <button type="button" className="sticker-btn primary block" onClick={() => window.history.back()}>
          返回
        </button>
      </main>
    </div>
  )
}
