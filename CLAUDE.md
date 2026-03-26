# Gyaki

ブラウザでお絵描きしてGyazoにアップロードするサービス。

## 構成

- Next.js (Pages Router)
- API Routes: `pages/api/upload.js`, `pages/api/gyazodata/[id].js`
- 描画ロジック: `lib/draw.js` (vanilla JS, React不使用)
- ルーティング: `pages/[...params].js` で `/:id` と `/:id/:imageId` を処理

## ローカル実行

```
npm install
npm run dev
```

`http://localhost:3000` で起動。

## デプロイ

Vercel にデプロイ。GitHub リポジトリと連携すれば push で自動デプロイ。
