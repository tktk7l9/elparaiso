# EL PARAISO

**[▶ 公開サイト](https://elparaiso.saitotakuya0719.workers.dev)**

2021年より発足したコミュニティブランドのWebサイト。EL PARAISOはスペイン語で「楽園」を意味し、染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映している。

## ページ構成

- `/` — トップ
- `/about` — ブランドについて
- `/projects` — プロジェクト一覧
- `/library` — ライブラリ
- `/melodies` — 音楽
- `/melodies/playlist` — プレイリスト詳細
- `/store` — ストア（外部リンク: elparaiso.stores.jp）
- `/contact` — コンタクト

## 技術スタック

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Cloudflare Workers](https://workers.cloudflare.com/)（[@opennextjs/cloudflare](https://opennext.js.org/cloudflare) でビルド）
- CSP: next.config.js の静的ヘッダーを土台に、Worker（`worker.ts`）が HTML の応答ごとに `script-src` の
  `'unsafe-inline'` を毎リクエストの nonce に差し替える（`src/lib/csp-nonce.ts`）。
  Cloudflare Web Analytics のビーコンは HTML に書かず、ハイドレーション後に追加する

## 起動

```bash
npm install
npm run dev
```

