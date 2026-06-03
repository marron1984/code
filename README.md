# クラウドコード入門ラーニング

ブラウザだけで読める、クラウドコード初心者向けの学習ツールです。レッスン一覧、本文、用語説明、コピー可能なコード例、理解度チェック、進捗表示を備えています。

## ローカルで動かす

```bash
npm install
npm run build
npm run dev
```

`npm run dev` は先に `dist` を生成してから、`http://localhost:5173` で静的プレビューサーバーを起動します。

## Vercel へのデプロイ

このプロジェクトは Vercel 用に `vercel.json` を含んでいます。

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`



過去に `sh: line 1: tsc: command not found` が出た場合は、TypeScript コンパイラがデプロイ環境にインストールされていない状態です。このプロジェクトでは `typescript` を `devDependencies` に追加しているため、Vercel の `npm install` 後に `npm run build` で `tsc` が利用できます。
