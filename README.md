# EL PARAISO

**[▶ 公開サイト](https://elparaiso.vercel.app)**

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
- `/admin` — 管理（Supabase 認証）

## 技術スタック

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## 起動

```bash
cp .env.example .env.local  # 環境変数を設定
npm install
npm run dev
```

## 環境変数

`.env.example` を参照。

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_KEY` | Supabase anon キー |
| `NEXT_PUBLIC_GA_ID` | Google Analytics トラッキング ID（任意） |
