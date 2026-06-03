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

## Vercel のビルドログの見方

次のような行は、エラーではなく Vercel のビルド開始を示す通常ログです。

```text
Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 4 cores, 8 GB
Cloning github.com/<owner>/<repo> (Branch: main, Commit: <commit>)
Previous build caches not available.
Cloning completed: 253.000ms
```

各行の意味は次のとおりです。

- `Running build...`: Vercel がどのリージョンでビルドを開始したかを示します。
- `Build machine configuration...`: ビルド用マシンの CPU / メモリ構成です。
- `Cloning github.com...`: GitHub から対象ブランチとコミットを取得しています。
- `Previous build caches not available.`: 初回ビルドなどでキャッシュが無いことを示します。通常は問題ありません。
- `Cloning completed...`: リポジトリの取得が完了したことを示します。

この5行だけが表示されている場合、まだ失敗原因は表示されていません。エラーを判断するには、後続の `Installing dependencies...`、`Running "npm run build"`、赤字の `Error:` 行まで確認してください。

過去に `sh: line 1: tsc: command not found` が出た場合は、TypeScript コンパイラがデプロイ環境にインストールされていない状態です。このプロジェクトでは `typescript` を `devDependencies` に追加しているため、Vercel の `npm install` 後に `npm run build` で `tsc` が利用できます。
