export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  badge: string;
  duration: string;
  goal: string;
  terms: { term: string; description: string }[];
  body: string[];
  codeTitle: string;
  code: string;
  nextAction: string;
  quiz: QuizQuestion[];
};

export const lessons: Lesson[] = [
  {
    id: 'what-is-cloud-code',
    title: 'クラウドコードとは何か',
    badge: '基礎',
    duration: '8分',
    goal: 'クラウド上でコードを書く意味と、ブラウザだけで始められる理由を説明できる。',
    terms: [
      { term: 'クラウド', description: 'インターネット越しに使えるコンピューターやサービスのこと。' },
      { term: 'IDE', description: 'コードを書き、実行し、確認するための統合された作業画面。' },
      { term: 'リポジトリ', description: 'コードや履歴をまとめて保存するプロジェクトの箱。' },
    ],
    body: [
      'クラウドコードは、手元のPCに開発環境を全部入れなくても、ブラウザからコードを書ける学習・開発スタイルです。環境構築のつまずきを減らし、すぐに試せることが大きなメリットです。',
      '初心者は「エディタ」「ターミナル」「プレビュー」の3つを見分けられるようになると安心です。エディタで書き、ターミナルで命令を実行し、プレビューで結果を確認します。',
    ],
    codeTitle: 'ブラウザで最初に試すHTML',
    code: `<h1>こんにちは、クラウドコード！</h1>\n<p>ブラウザだけで画面を作れます。</p>`,
    nextAction: '次は、Webページが何でできているかを見ていきましょう。',
    quiz: [
      {
        question: 'クラウドコードの大きな利点はどれですか？',
        options: ['ブラウザからすぐ始めやすい', '必ず高性能なPCが必要', 'コードを書かなくてよい'],
        answerIndex: 0,
        explanation: '環境構築を軽くして、ブラウザから学習を始めやすい点が利点です。',
      },
    ],
  },
  {
    id: 'web-basics',
    title: 'Web開発の基本',
    badge: 'HTML/CSS/JS',
    duration: '10分',
    goal: 'HTML・CSS・JavaScriptの役割を区別できる。',
    terms: [
      { term: 'HTML', description: '見出しやボタンなど、ページの構造を作る言語。' },
      { term: 'CSS', description: '色、余白、レイアウトなど、見た目を整える言語。' },
      { term: 'JavaScript', description: 'クリック時の反応など、ページに動きを付ける言語。' },
    ],
    body: [
      'Webページは、よく「骨組み」「見た目」「動き」に分けて考えます。HTMLが骨組み、CSSが見た目、JavaScriptが動きです。',
      '最初は完璧に覚える必要はありません。小さな変更をして、プレビューで結果を見るサイクルを短く回しましょう。',
    ],
    codeTitle: 'ボタンを押すと文字が変わる例',
    code: `<button id="hello">押してみる</button>\n<p id="message">まだ押されていません</p>\n\n<script>\n  document.querySelector('#hello').onclick = () => {\n    document.querySelector('#message').textContent = 'クリックできました！';\n  };\n</script>`,
    nextAction: '次は、クラウド上でコードを書く一般的な流れを確認しましょう。',
    quiz: [
      {
        question: 'ページの見た目を整える主な役割を持つものは？',
        options: ['CSS', 'HTML', 'ターミナル'],
        answerIndex: 0,
        explanation: 'CSSは色や余白、レイアウトなどの見た目を担当します。',
      },
    ],
  },
  {
    id: 'cloud-workflow',
    title: 'クラウド上でコードを書く流れ',
    badge: '手順',
    duration: '9分',
    goal: '作成、実行、確認、保存の流れを自分でたどれる。',
    terms: [
      { term: 'ターミナル', description: '文字で命令を入力して、開発ツールを動かす画面。' },
      { term: 'プレビュー', description: '作ったWeb画面をブラウザ内で確認する表示。' },
      { term: 'コミット', description: '変更内容を履歴として保存すること。' },
    ],
    body: [
      'クラウド開発の基本は「ファイルを作る → コマンドで動かす → プレビューで確認する → 変更を保存する」です。途中でエラーが出ても、どの段階で起きたかを分けて考えると解決しやすくなります。',
      '迷ったときは、最後に変更したファイルと、ターミナルに出ている最初のエラーメッセージを見ましょう。',
    ],
    codeTitle: 'Vite開発サーバーを動かすコマンド例',
    code: `npm install\nnpm run dev`,
    nextAction: '次は、AIに手伝ってもらうときの頼み方を練習します。',
    quiz: [
      {
        question: 'Webアプリの表示を確認する場所として適切なのは？',
        options: ['プレビュー', 'package.json', 'コミットメッセージ'],
        answerIndex: 0,
        explanation: 'プレビューで、作成中のWeb画面がどう表示されるか確認します。',
      },
    ],
  },
  {
    id: 'ai-assist',
    title: 'AIコーディング支援の使い方',
    badge: 'AI活用',
    duration: '12分',
    goal: 'AIに具体的な依頼を出し、結果を自分で確認できる。',
    terms: [
      { term: 'プロンプト', description: 'AIに出す指示や質問の文章。' },
      { term: '差分', description: '変更前と変更後の違い。レビュー時に確認する。' },
      { term: 'レビュー', description: '意図通りで安全な変更かを確認する作業。' },
    ],
    body: [
      'AIには「目的」「現在の状態」「期待する結果」「制約」をセットで伝えると、意図に近い提案が返りやすくなります。丸投げせず、出てきたコードをプレビューやテストで確認しましょう。',
      '良い例は「ボタンを押したら進捗が増えるように、Reactの状態管理を使って実装して。初心者向けのコメントも付けて」です。',
    ],
    codeTitle: 'AIへの依頼テンプレート',
    code: `目的: レッスン完了ボタンを追加したい\n現在: React + TypeScript の学習アプリ\n期待: 押すと進捗率が更新される\n制約: 初心者にも読める変数名にして`,
    nextAction: '次は、よくあるエラーを落ち着いて読む練習をします。',
    quiz: [
      {
        question: 'AIに依頼するときに含めるとよい情報は？',
        options: ['目的と期待する結果', '気分だけ', 'エラーを隠すこと'],
        answerIndex: 0,
        explanation: '目的、現在の状態、期待する結果、制約を伝えると具体的な支援を得やすくなります。',
      },
    ],
  },
  {
    id: 'errors',
    title: 'よくあるエラーと対処',
    badge: 'トラブル対応',
    duration: '11分',
    goal: '代表的なエラーを分類し、最初に確認する場所を選べる。',
    terms: [
      { term: 'Syntax Error', description: '記号や文法の書き間違いで起きるエラー。' },
      { term: 'Module Not Found', description: '必要なファイルやパッケージが見つからないエラー。' },
      { term: 'ログ', description: '実行中の情報やエラー内容を表示した記録。' },
    ],
    body: [
      '初心者がよく出会うのは、かっこや引用符の閉じ忘れ、ファイル名の打ち間違い、パッケージの未インストールです。まずはエラー文の先頭と、ファイル名・行番号を確認しましょう。',
      'エラーは失敗ではなく、コンピューターからのヒントです。1つずつ直して、再実行して、変化を見ます。',
    ],
    codeTitle: 'エラー確認のチェックリスト',
    code: `1. エラー文の最初の1行を読む\n2. ファイル名と行番号を見る\n3. 直前に変更した場所を戻してみる\n4. npm install を忘れていないか確認する`,
    nextAction: '最後に、ミニ演習で自分の理解を試しましょう。',
    quiz: [
      {
        question: 'エラーが出たとき最初に見るとよいものは？',
        options: ['エラー文の先頭と行番号', '画面の色だけ', '関係ない古いファイル'],
        answerIndex: 0,
        explanation: 'エラー文の先頭には原因の種類、行番号には場所の手がかりが書かれています。',
      },
    ],
  },
  {
    id: 'mini-practice',
    title: 'ミニ演習',
    badge: '実践',
    duration: '15分',
    goal: '小さなWeb部品を読み、変更案を言語化できる。',
    terms: [
      { term: 'コンポーネント', description: '画面の一部を再利用しやすくまとめた部品。' },
      { term: '状態', description: 'クリック回数や選択中レッスンなど、画面が覚えている値。' },
      { term: 'デプロイ', description: '作ったアプリを他の人が見られる場所に公開すること。' },
    ],
    body: [
      '演習では、自己紹介カードを作るつもりでコードを読みます。名前、学びたいこと、今日の一歩を変えるだけでも立派な開発です。',
      'できたら「何を変えたか」「なぜ変えたか」「次に何を試すか」をメモしましょう。AIに相談するときの材料にもなります。',
    ],
    codeTitle: '自己紹介カードのReact例',
    code: `function ProfileCard() {\n  const name = 'クラウド学習者';\n  return (\n    <article className="card">\n      <h2>{name}</h2>\n      <p>今日の一歩: ボタンの色を変えてみる</p>\n    </article>\n  );\n}`,
    nextAction: 'お疲れさまでした。気になる章に戻り、コード例をコピーして自分用に書き換えてみましょう。',
    quiz: [
      {
        question: 'ミニ演習で大切な姿勢は？',
        options: ['小さく変えて結果を見る', '一度で完璧に作る', 'エラーを読まない'],
        answerIndex: 0,
        explanation: '初心者は小さく変更し、結果を確認するサイクルを回すことが大切です。',
      },
    ],
  },
];
