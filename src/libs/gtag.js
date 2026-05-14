const rawId = process.env.NEXT_PUBLIC_GA_ID || ''

// G-XXXXXXXX / UA-XXXXXXX-X / AW-XXXXXXX / DC-XXXXXXX のみ許可
// 不正な値がインラインスクリプトに埋め込まれるのを防ぐ
export const GA_TRACKING_ID = /^(G|UA|AW|DC)-[A-Za-z0-9_-]+$/.test(rawId) ? rawId : ''

export const pageview = (url) => {
  if (!GA_TRACKING_ID) return
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
