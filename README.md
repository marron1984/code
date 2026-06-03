# Claude Code 入門ラーニング

ブラウザだけで読める、**Claude Code** のステップバイステップ学習カリキュラムです。中学生にもわかる難易度で、超入門（インストール）から実務（Git・PR）まで、順を追って学べます。レッスン一覧、本文、用語ミニ説明、コピー可能なコード例、理解度チェック（クイズ）、進捗表示を備えています。

## カリキュラムの流れ

4つのステージ・全11章で構成しています。

### ステージ1：はじめの一歩（超入門）
1. Claude Code ってなに？
2. 準備をしよう（インストールとログイン）
3. はじめての会話をしてみよう

### ステージ2：基本操作
4. ファイルを作って・直してもらおう
5. スラッシュコマンドを使おう
6. CLAUDE.md でルールを伝える

### ステージ3：上手な頼み方（上達）
7. 上手な頼み方（プロンプトのコツ）
8. プランモードと、安全に進める許可
9. エラーが出たときの直し方

### ステージ4：実務に活かす
10. Git と一緒に使う（保存・履歴・共有）
11. 拡張機能の紹介と、実務ワークフロー総まとめ

## ローカルで動かす

```bash
npm install
npm run build
npm run dev
```

`npm run dev` は先に `dist` を生成してから、`http://localhost:5173` で静的プレビューサーバーを起動します。

## 教材の編集方法

レッスンの中身は `src/data/lessons.ts` にまとまっています。章を追加・編集したいときは、この配列に `Lesson` を足すだけで、サイドバーの一覧や進捗表示には自動で反映されます。各章は次の項目を持ちます。

- `title` / `badge` / `duration`：見出し・ステージ・目安時間
- `goal`：その章のゴール
- `terms`：用語ミニ説明
- `body`：本文（段落の配列）
- `codeTitle` / `code`：コピー可能なコード例
- `quiz`：理解度チェック（複数可）
- `nextAction`：次にやること

## Vercel へのデプロイ

このプロジェクトは Vercel 用に `vercel.json` を含んでいます。

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

過去に `sh: line 1: tsc: command not found` が出た場合は、TypeScript コンパイラがデプロイ環境にインストールされていない状態です。このプロジェクトでは `typescript` を `devDependencies` に追加しているため、Vercel の `npm install` 後に `npm run build` で `tsc` が利用できます。
