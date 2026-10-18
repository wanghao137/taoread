// 反代新账号 dist origin，让安装包 URL 长在自有域名上（workers.dev 在大陆被 DNS 污染）。
// Cloudflare 边缘内网跳转到 workers.dev，不经过公网，不受污染影响。
const ORIGIN = 'https://taoread-dist-origin.taoread-audio-r2.workers.dev'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    return fetch(ORIGIN + url.pathname + url.search, request)
  },
}
