export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Step = {
  icon: string;
  text: string;
};

export type Term = {
  icon: string;
  term: string;
  description: string;
};

/** 自動再生デモの1行（画面録画のセリフ） */
export type DemoLine = {
  /** you=あなた / ai=Claude / cmd=コマンド / out=出力や差分 */
  role: 'you' | 'ai' | 'cmd' | 'out';
  text: string;
};

export type Lesson = {
  id: string;
  title: string;
  badge: string;
  duration: string;
  /** ステージのテーマカラー（HEX） */
  accent: string;
  /** 章を表す大きなアイコン（絵文字） */
  icon: string;
  /** その章のゴール（1行） */
  goal: string;
  /** 一言サマリー（1行で要点） */
  summary: string;
  /** 自動再生される画面録画風デモ（タイプされていく） */
  demo: DemoLine[];
  /** 絵で追うステップフロー（この章の主役） */
  steps: Step[];
  /** 用語の絵カード */
  terms: Term[];
  codeTitle: string;
  code: string;
  nextAction: string;
  quiz: QuizQuestion[];
};

// ステージ共通カラー
const C1 = '#2f7df6'; // ステージ1：青
const C2 = '#7c5cff'; // ステージ2：紫
const C3 = '#f59e0b'; // ステージ3：オレンジ
const C4 = '#10b981'; // ステージ4：緑

export const lessons: Lesson[] = [
  // ===== ステージ1: はじめの一歩（超入門） =====
  {
    id: 'what-is-claude-code',
    title: 'Claude Code ってなに？',
    badge: 'ステージ1・超入門',
    duration: '8分',
    accent: C1,
    icon: '🤖',
    goal: 'Claude Code が「何をしてくれる相棒」なのかをイメージできる。',
    summary: 'ふだんの言葉で頼むと、AIが代わりにコードを書いてくれる相棒。',
    demo: [
      { role: 'you', text: 'こんにちは。何ができますか？' },
      { role: 'ai', text: 'コードを書いたり直したりできます！' },
      { role: 'you', text: 'このフォルダの中身を教えて。' },
      { role: 'ai', text: 'index.html があります。練習用のページですね。' },
    ],
    steps: [
      { icon: '🗣️', text: 'あなたが「こうしたい」と話す' },
      { icon: '🤖', text: 'AIがコードを書く・直す' },
      { icon: '👀', text: 'あなたが結果をチェック' },
      { icon: '🎉', text: 'できあがり！の くりかえし' },
    ],
    terms: [
      { icon: '🤖', term: 'Claude Code', description: 'AIと話しながらコードを書ける相棒。' },
      { icon: '🧠', term: 'AI', description: '言葉を理解して文章やコードを作る頭脳。' },
      { icon: '⌨️', term: 'ターミナル', description: '文字で命令を打つ黒い画面。' },
    ],
    codeTitle: 'まず話しかけてみよう',
    code: `あなた: こんにちは。何ができますか？\nあなた: このフォルダの中身を教えて。`,
    nextAction: '次は、自分のパソコンで使えるように「準備（インストール）」をします。',
    quiz: [
      {
        question: 'Claude Code を一番うまく表しているのは？',
        options: [
          'AIと話しながらコードを書ける相棒',
          '人の手なしで完璧なアプリを作る魔法',
          'ゲーム専用の機械',
        ],
        answerIndex: 0,
        explanation: 'あなたが頼み、AIが手を動かし、あなたが確認する「チームプレイ」の道具です。',
      },
    ],
  },
  {
    id: 'setup-install',
    title: '準備をしよう',
    badge: 'ステージ1・超入門',
    duration: '12分',
    accent: C1,
    icon: '🛠️',
    goal: 'インストールから最初のログインまでを自分で進められる。',
    summary: 'Node.js を入れる → コマンド1回で導入 → 起動してログイン。',
    demo: [
      { role: 'cmd', text: 'npm install -g @anthropic-ai/claude-code' },
      { role: 'out', text: '✓ インストールが完了しました' },
      { role: 'cmd', text: 'claude' },
      { role: 'out', text: 'ようこそ！ ブラウザでログインしてください 🔑' },
    ],
    steps: [
      { icon: '⬇️', text: 'Node.js を入れる（土台）' },
      { icon: '📦', text: 'コマンド1回で Claude Code 導入' },
      { icon: '🚀', text: 'claude と打って起動' },
      { icon: '🔑', text: 'ブラウザでログイン' },
    ],
    terms: [
      { icon: '🧱', term: 'Node.js', description: '動かすための土台。先に入れる。' },
      { icon: '📦', term: 'npm', description: 'ソフトを入れる道具。Node.jsに付属。' },
      { icon: '🔑', term: 'ログイン', description: '「これは私です」と確認すること。' },
    ],
    codeTitle: 'この3行で準備OK',
    code: `# 1. インストール（最初の1回だけ）\nnpm install -g @anthropic-ai/claude-code\n\n# 2. 入ったか確認\nclaude --version\n\n# 3. 起動（画面の案内でログイン）\nclaude`,
    nextAction: '準備できたら、いよいよ「はじめての会話」をしてみましょう。',
    quiz: [
      {
        question: 'Claude Code を入れる前に、先に用意するものは？',
        options: ['Node.js', '高価なゲーミングPC', '紙とえんぴつ'],
        answerIndex: 0,
        explanation: 'Node.js（と npm）が土台。先に入れておきましょう。',
      },
      {
        question: 'npm install -g の「-g」の意味は？',
        options: ['どこでも使えるように入れる', 'ゲームモード', 'こっそり隠す'],
        answerIndex: 0,
        explanation: '-g は global。パソコン全体で claude を使えるようにします。',
      },
    ],
  },
  {
    id: 'first-conversation',
    title: 'はじめての会話',
    badge: 'ステージ1・超入門',
    duration: '10分',
    accent: C1,
    icon: '💬',
    goal: '起動して、日本語で頼んで、安全に終了するまでできる。',
    summary: 'フォルダに移動 → 起動 → 言葉で頼む → /exit で終了。',
    demo: [
      { role: 'cmd', text: 'cd my-project' },
      { role: 'cmd', text: 'claude' },
      { role: 'you', text: 'README.md の一番上に「練習中」と1行足して。' },
      { role: 'ai', text: '追加しました ✅  /exit で終われます。' },
    ],
    steps: [
      { icon: '📂', text: 'cd でフォルダに移動' },
      { icon: '🚀', text: 'claude で起動' },
      { icon: '🗣️', text: 'ふだんの言葉で頼む' },
      { icon: '👋', text: '/exit で終了（Escで中断）' },
    ],
    terms: [
      { icon: '📁', term: 'プロジェクト', description: '1つのアプリのファイルをまとめた箱。' },
      { icon: '🔁', term: 'セッション', description: '起動から終了までの会話のまとまり。' },
      { icon: '✋', term: 'Esc キー', description: '動いている処理を途中で止める。' },
    ],
    codeTitle: '起動 → 会話 → 終了',
    code: `cd my-project\nclaude\n\nあなた: このフォルダには何がある？\nあなた: README.md の一番上に「練習中」と1行足して。\n\n/exit`,
    nextAction: '次は「ファイルを作ってもらう」体験で、許可の仕組みを学びます。',
    quiz: [
      {
        question: '動いている処理を途中で止めたいときのキーは？',
        options: ['Esc キー', 'スペース連打', 'Enter を5回'],
        answerIndex: 0,
        explanation: 'Esc で実行中の処理を止められます。終了は /exit や Ctrl+C を2回。',
      },
    ],
  },

  // ===== ステージ2: 基本操作 =====
  {
    id: 'create-files',
    title: 'ファイルを作ってもらおう',
    badge: 'ステージ2・基本操作',
    duration: '12分',
    accent: C2,
    icon: '📝',
    goal: '差分を確認し、許可するかどうかを自分で選べる。',
    summary: '勝手に上書きしない。差分を見せて「OK?」と聞いてくれる。',
    demo: [
      { role: 'you', text: 'hello.html を作って。大きな見出しで挨拶を表示して。' },
      { role: 'ai', text: 'この差分で進めていい？' },
      { role: 'out', text: '+ <h1>こんにちは、Claude Code！</h1>' },
      { role: 'you', text: 'はい！' },
      { role: 'ai', text: '作成しました 🎉' },
    ],
    steps: [
      { icon: '🗣️', text: '「○○を作って」と頼む' },
      { icon: '🟢', text: '差分が出る（緑=追加 / 赤=削除）' },
      { icon: '✅', text: '納得したら はい / ちがえば いいえ' },
      { icon: '👀', text: 'プレビューで結果を確認' },
    ],
    terms: [
      { icon: '🔼', term: '差分（さぶん）', description: '変える前と後の「ちがい」。' },
      { icon: '✅', term: '許可', description: '実行の前に出す「OK」の返事。' },
      { icon: '🖥️', term: 'プレビュー', description: '実際の見た目を確かめる表示。' },
    ],
    codeTitle: '頼む → 差分が出る',
    code: `あなた: hello.html を作って。\n       「こんにちは、Claude Code！」と大きな見出しで。\n\n--- 差分（イメージ）---\n+ <h1>こんにちは、Claude Code！</h1>\n\nこの変更を許可しますか？  [ はい / いいえ ]`,
    nextAction: '次は、会話を便利にする「スラッシュコマンド」を覚えましょう。',
    quiz: [
      {
        question: 'Claude Code がファイルを書きかえる前にすることは？',
        options: ['差分を見せて許可をもらう', '何も言わず全部消す', 'PCを再起動'],
        answerIndex: 0,
        explanation: '変更前に差分を見せて許可を求めるので、安全に確認できます。',
      },
      {
        question: '初心者のコツとして正しいのは？',
        options: ['小さく頼んで結果を確認する', '100個まとめて頼む', '差分を見ずに全部はい'],
        answerIndex: 0,
        explanation: '小さく頼んで確認するサイクルだと、ミスに早く気づけます。',
      },
    ],
  },
  {
    id: 'slash-commands',
    title: 'スラッシュコマンド',
    badge: 'ステージ2・基本操作',
    duration: '10分',
    accent: C2,
    icon: '⚡',
    goal: 'よく使うコマンドの役割を知り、使い分けられる。',
    summary: '/ で始める便利ボタン。迷ったら /help、混乱したら /clear。',
    demo: [
      { role: 'you', text: '/help' },
      { role: 'out', text: '使えるコマンドの一覧を表示しました 📖' },
      { role: 'you', text: '/clear' },
      { role: 'out', text: '会話をリセットしました 🧹 頭がすっきり！' },
    ],
    steps: [
      { icon: '❓', text: '/help … 一覧を見る' },
      { icon: '🧹', text: '/clear … 会話をリセット' },
      { icon: '📋', text: '/init … 説明書を作る' },
      { icon: '🔀', text: '/model … 頭脳を切りかえ' },
    ],
    terms: [
      { icon: '⚡', term: 'スラッシュコマンド', description: '/ で始める特別な命令。' },
      { icon: '🧠', term: 'コンテキスト', description: 'AIがいま覚えている会話の中身。' },
      { icon: '🔀', term: 'モデル', description: 'AIの頭脳の種類。賢さ・速さが違う。' },
    ],
    codeTitle: 'まず覚えたい6つ',
    code: `/help     ← コマンド一覧\n/clear    ← 会話をリセット\n/init     ← 説明書(CLAUDE.md)を作る\n/model    ← AIの頭脳を切りかえ\n/config   ← 設定を見る\n/exit     ← 終了`,
    nextAction: '次は、プロジェクトのルールを伝える「CLAUDE.md」を作ります。',
    quiz: [
      {
        question: '話題を変えて頭をすっきりさせたいときは？',
        options: ['/clear', '/help を連打', 'PCの電源を切る'],
        answerIndex: 0,
        explanation: '/clear で会話をリセット。長くなって混乱したら使いどき。',
      },
      {
        question: 'どんなコマンドがあるか分からなくなったら？',
        options: ['/help で一覧を見る', 'あきらめる', '適当に打つ'],
        answerIndex: 0,
        explanation: '/help でいつでも一覧を確認できます。',
      },
    ],
  },
  {
    id: 'claude-md',
    title: 'CLAUDE.md でルールを伝える',
    badge: 'ステージ2・基本操作',
    duration: '11分',
    accent: C2,
    icon: '📜',
    goal: 'CLAUDE.md の役割を理解し、約束ごとを書ける。',
    summary: 'プロジェクトのフォルダに置く「AIへの手紙」。/init でたたき台を自動生成。',
    demo: [
      { role: 'you', text: '/init' },
      { role: 'ai', text: 'フォルダを調べています…' },
      { role: 'ai', text: 'CLAUDE.md を作りました 📜' },
      { role: 'you', text: '「コメントは日本語で」のルールも足して。' },
      { role: 'ai', text: '追記しました ✅' },
    ],
    steps: [
      { icon: '📋', text: '/init でたたき台を自動生成' },
      { icon: '✍️', text: 'ルールや説明を書き足す' },
      { icon: '🤖', text: 'AIが毎回読んでから手伝う' },
      { icon: '👥', text: 'チームでルールを共有できる' },
    ],
    terms: [
      { icon: '📜', term: 'CLAUDE.md', description: 'AI向けのメモ書き（手紙）。' },
      { icon: '📋', term: '/init', description: 'たたき台を自動で作るコマンド。' },
      { icon: '📏', term: 'コーディング規約', description: '書き方のチームの約束ごと。' },
    ],
    codeTitle: 'CLAUDE.md の中身の例',
    code: `# このプロジェクトについて\nブラウザで学ぶ Claude Code の学習サイト。\n\n## ルール\n- コメントはやさしい日本語で\n- 変更は小さく分ける\n- テストは npm test で動かす`,
    nextAction: 'ステージ2おつかれさま！次は「上手な頼み方」を学びます。',
    quiz: [
      {
        question: 'CLAUDE.md のたたき台を作るコマンドは？',
        options: ['/init', '/delete', '/sleep'],
        answerIndex: 0,
        explanation: '/init でAIがフォルダを調べ、たたき台を作ってくれます。',
      },
      {
        question: 'CLAUDE.md に書くとよいものは？',
        options: ['プロジェクトの説明やルール', '今日の天気', '好きな食べ物'],
        answerIndex: 0,
        explanation: '説明やルールを書くと、毎回伝えなくても守ってくれます。',
      },
    ],
  },

  // ===== ステージ3: 上手な頼み方 =====
  {
    id: 'good-prompts',
    title: '上手な頼み方',
    badge: 'ステージ3・上達',
    duration: '12分',
    accent: C3,
    icon: '🎯',
    goal: '「目的・現状・期待・制約」を入れて、伝わる頼み方ができる。',
    summary: '具体的なほど思いどおり。4点セットで伝えるのがコツ。',
    demo: [
      { role: 'you', text: '目的・現状・期待・制約をそろえて頼むね。' },
      { role: 'you', text: '完了ボタンを、初心者にも読めるコードで追加して。' },
      { role: 'ai', text: '4点セット、とても分かりやすいです！' },
      { role: 'ai', text: 'ボタンを追加しました ✨' },
    ],
    steps: [
      { icon: '🎯', text: '目的：何のため？' },
      { icon: '📍', text: '現状：いまどうなってる？' },
      { icon: '✨', text: '期待：どうなってほしい？' },
      { icon: '🚧', text: '制約：守ってほしい条件' },
    ],
    terms: [
      { icon: '🎯', term: '目的', description: '何のためにやるのか。ゴール。' },
      { icon: '🚧', term: '制約', description: '「これは守ってね」の条件。' },
      { icon: '🔍', term: '具体的', description: 'ぼんやりさせず、はっきり書く。' },
    ],
    codeTitle: '伝わる頼み方テンプレ',
    code: `目的: 「完了ボタン」を付けたい\n現状: HTMLと少しのJavaScript\n期待: 押すと「完了！」に変わる\n制約: 初心者にも読める名前で`,
    nextAction: '次は「先に計画を立てさせる」プランモードと、安全な許可の話です。',
    quiz: [
      {
        question: 'AIに伝わりやすいのはどれ？',
        options: [
          '押すと数字が1増える機能を初心者向けのコードで追加して',
          'いい感じにして',
          'なんかすごいの作って',
        ],
        answerIndex: 0,
        explanation: '目的・期待・制約をはっきり伝えると思いどおりに近づきます。',
      },
    ],
  },
  {
    id: 'plan-and-permissions',
    title: 'プランモードと許可',
    badge: 'ステージ3・上達',
    duration: '11分',
    accent: C3,
    icon: '🗺️',
    goal: '計画を確認してから、安全に進められる。',
    summary: '大きめの頼みは「まず計画」。読むだけで作戦を見せてくれる。',
    demo: [
      { role: 'you', text: 'ログイン画面を追加したい。手は動かさず計画だけ見せて。' },
      { role: 'ai', text: '①login.htmlを作る ②入力欄 ③ボタン。これでいい？' },
      { role: 'you', text: 'OK、その計画で進めて。' },
      { role: 'ai', text: '承認ありがとう。実行しました ✅' },
    ],
    steps: [
      { icon: '🗺️', text: '「まず計画を見せて」と頼む' },
      { icon: '👀', text: '読み取りだけで作戦を提案' },
      { icon: '🛠️', text: '直したい所は手を動かす前に修正' },
      { icon: '✅', text: '納得したら承認して実行' },
    ],
    terms: [
      { icon: '🗺️', term: 'プランモード', description: 'まず計画を立ててもらう状態。' },
      { icon: '👀', term: '読み取り専用', description: '見るだけで書きかえない安全な状態。' },
      { icon: '✅', term: '承認', description: '「これでOK」と返事をすること。' },
    ],
    codeTitle: 'プランモードの流れ',
    code: `あなた: ログイン画面を追加したい。\n       手は動かさず、計画だけ見せて。\n\nAI（計画）:\n  1. login.html を作る\n  2. 入力欄を置く\n  3. ボタンを置く\n  この計画でいい？\n\nあなた: OK、進めて。`,
    nextAction: '次は、かならず出会う「エラー」と仲良くなる練習です。',
    quiz: [
      {
        question: '大きめの変更を安全に進めるコツは？',
        options: [
          'まず計画を見せてもらい、確認してから進める',
          '計画は見ずいきなり全部やらせる',
          'エラーは見なかったことにする',
        ],
        answerIndex: 0,
        explanation: '先に計画を確認すると、手を動かす前に方向を直せます。',
      },
    ],
  },
  {
    id: 'fix-errors',
    title: 'エラーの直し方',
    badge: 'ステージ3・上達',
    duration: '11分',
    accent: C3,
    icon: '🐞',
    goal: 'エラーをそのまま伝え、一緒に原因を探して直せる。',
    summary: 'エラーは失敗じゃなくヒント。まるごと貼って「直して」でOK。',
    demo: [
      { role: 'cmd', text: 'npm run dev' },
      { role: 'out', text: "Error: Cannot find module './utils'  (index.js:3)" },
      { role: 'you', text: 'このエラーをまるごと貼ります。直して。' },
      { role: 'ai', text: 'パスを修正しました。もう一度試して 🔧' },
    ],
    steps: [
      { icon: '🐞', text: 'エラーが出る（=ヒント）' },
      { icon: '📋', text: 'エラー文をまるごとコピー' },
      { icon: '🗣️', text: '「これ直して」と貼って頼む' },
      { icon: '🔧', text: '1つ直して動かして確認' },
    ],
    terms: [
      { icon: '🐞', term: 'エラー', description: 'うまく動かないときのメッセージ。' },
      { icon: '💡', term: 'エラーメッセージ', description: '何が・どこで・なぜのヒント。' },
      { icon: '📜', term: 'ログ', description: '実行中の出来事の記録。手がかり。' },
    ],
    codeTitle: 'エラーの伝え方',
    code: `あなた: npm run dev でこのエラーが出ました。直して。\n\nError: Cannot find module './utils'\n  at index.js:3\n\nやりたいこと: 開発サーバーを起動して画面を見たい`,
    nextAction: 'ステージ3クリア！ここからは「実務」へ進みます。',
    quiz: [
      {
        question: 'エラーが出たとき、AIに伝えるとよいのは？',
        options: [
          'エラー文をまるごと（最初の行や行番号も）',
          '「動かない」と一言だけ',
          'エラーは隠して別の話',
        ],
        answerIndex: 0,
        explanation: 'まるごと伝えると手がかりが増え、速く直せます。',
      },
    ],
  },

  // ===== ステージ4: 実務に活かす =====
  {
    id: 'git-workflow',
    title: 'Git と一緒に使う',
    badge: 'ステージ4・実務',
    duration: '13分',
    accent: C4,
    icon: '🌳',
    goal: 'コミット・ブランチ・PR の役割を理解して頼める。',
    summary: 'こまめに保存（コミット）。枝道（ブランチ）で安全に試す。',
    demo: [
      { role: 'you', text: 'ブランチ「feature/login」を作って。' },
      { role: 'cmd', text: 'git checkout -b feature/login' },
      { role: 'you', text: 'いまの変更を分かりやすくコミットして。' },
      { role: 'cmd', text: 'git commit -m "ログイン画面を追加"' },
      { role: 'ai', text: 'コミットしました 💾' },
    ],
    steps: [
      { icon: '🌿', text: 'ブランチ（枝道）を作る' },
      { icon: '✍️', text: '変更する' },
      { icon: '💾', text: 'コミット（保存ポイント）' },
      { icon: '📤', text: 'PR で仲間にレビュー依頼' },
    ],
    terms: [
      { icon: '🌳', term: 'Git', description: '履歴を記録し前に戻せる道具。' },
      { icon: '💾', term: 'コミット', description: '変更をまとめて履歴に保存。' },
      { icon: '🌿', term: 'ブランチ', description: '安全に試せる作業用の枝道。' },
      { icon: '📤', term: 'プルリク(PR)', description: '「取り込んで」と相談する場。' },
    ],
    codeTitle: 'Git まわりを頼む',
    code: `あなた: ブランチ「feature/login」を作って。\nあなた: いまの変更を分かりやすいメッセージでコミットして。\n\n# 裏で動くコマンドのイメージ\ngit checkout -b feature/login\ngit commit -m "ログイン画面を追加"`,
    nextAction: '次は、さらに強くする拡張機能をのぞいて、総まとめをします。',
    quiz: [
      {
        question: 'コミットをこまめにする良いことは？',
        options: ['失敗しても前に戻せて安心して挑戦できる', 'PCが速くなる', '充電できる'],
        answerIndex: 0,
        explanation: 'コミットは保存ポイント。戻れるから思いきって試せます。',
      },
      {
        question: '新しい機能を安全に試す定番は？',
        options: ['ブランチを作る', 'いきなり本番を書きかえる', '何も保存しない'],
        answerIndex: 0,
        explanation: 'ブランチ（枝道）なら本流に影響を出さず試せます。',
      },
    ],
  },
  {
    id: 'extensions-and-recap',
    title: '拡張機能と総まとめ',
    badge: 'ステージ4・実務',
    duration: '15分',
    accent: C4,
    icon: '🏁',
    goal: '便利な拡張を知り、実務の1サイクルを説明できる。',
    summary: '頼む→確認→動かす→直す→コミット→PR。これが実務の1周。',
    demo: [
      { role: 'you', text: 'profile.html を作って、名前と好きなこと3つを表示して。' },
      { role: 'ai', text: '作りました。差分を確認して 👀' },
      { role: 'you', text: '見出しを青にして、コミットして。' },
      { role: 'ai', text: '変更してコミット完了 🎉' },
      { role: 'ai', text: '1サイクル完走！ おつかれさま 🏁' },
    ],
    steps: [
      { icon: '🗣️', text: '具体的に頼む（必要なら計画）' },
      { icon: '✅', text: '差分を確認して許可' },
      { icon: '🐞', text: 'エラーは貼って一緒に直す' },
      { icon: '💾', text: 'こまめにコミット' },
      { icon: '📤', text: '完成したら PR' },
    ],
    terms: [
      { icon: '🔌', term: 'MCP', description: '外部の道具やデータにつなぐ仕組み。' },
      { icon: '🧑‍🚀', term: 'サブエージェント', description: '専門が得意なAIの助っ人。' },
      { icon: '🪝', term: 'フック', description: '決まった場面で自動実行する仕掛け。' },
    ],
    codeTitle: 'ミニ演習：自己紹介ページで1周まわす',
    code: `あなた: profile.html を作って、名前と「好きなこと」を3つ表示して。\nあなた: 見出しの色を青にして中央ぞろえに。\n（差分を確認して許可）\nあなた: 表示がくずれた。出たエラーを貼るので直して。\nあなた: いまの変更を分かりやすくコミットして。`,
    nextAction: 'カリキュラム完走！気になる章に戻って、コード例を書きかえて練習しましょう。',
    quiz: [
      {
        question: '「保存したら自動でテスト」のような自動実行の仕掛けは？',
        options: ['フック', 'コミット', 'ブランチ'],
        answerIndex: 0,
        explanation: 'フックは決まった場面で自動的に処理を走らせる仕掛けです。',
      },
      {
        question: '実務の1サイクルとして正しい流れは？',
        options: [
          '頼む→差分を確認して許可→動かす→直す→コミット',
          '頼む→確認せず全部許可→保存しない',
          'いきなりPR→何も確認しない',
        ],
        answerIndex: 0,
        explanation: '頼んで、確認・許可、動かして確認、直し、こまめにコミット。これが安全な1周です。',
      },
    ],
  },
];
