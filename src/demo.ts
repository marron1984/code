// 自動再生デモのドライバー。
// 画面録画のように、各行を1文字ずつタイプして表示し、最後まで再生したら少し待って最初に戻る（ループ）。
// ⏸/▶ ボタンで一時停止と再開、↻ ボタンで最初からの再生に対応する。
// App の render() が innerHTML を作り直すたびに startDemo() を呼ぶ。古いタイマーは必ず止める。

const CHAR_DELAY = 26; // 1文字あたりの待ち時間(ms)
const LINE_PAUSE = 480; // 行と行の間の待ち時間(ms)
const LOOP_PAUSE = 2400; // 最後まで再生したあと、最初に戻るまでの待ち時間(ms)

let timer: number | undefined;
let paused = false;
let lineIndex = 0;
let charIndex = 0;
let lines: HTMLElement[] = [];
let typeTargets: (HTMLElement | null)[] = [];

function clearTimer() {
  if (timer !== undefined) {
    window.clearTimeout(timer);
    timer = undefined;
  }
}

function reset() {
  lines.forEach((line, index) => {
    line.classList.remove('is-visible', 'is-typing');
    const target = typeTargets[index];
    if (target) {
      target.textContent = '';
    }
  });
  lineIndex = 0;
  charIndex = 0;
}

function syncToggleButton() {
  const button = document.querySelector<HTMLButtonElement>('[data-action="demo-toggle"]');
  if (button) {
    button.textContent = paused ? '▶' : '⏸';
  }
}

function tick() {
  if (paused) {
    return;
  }

  // 全部の行を再生し終えたら、少し待ってから最初に戻る
  if (lineIndex >= lines.length) {
    timer = window.setTimeout(() => {
      reset();
      tick();
    }, LOOP_PAUSE);
    return;
  }

  const line = lines[lineIndex];
  const target = typeTargets[lineIndex];
  const fullText = line.dataset.text ?? '';

  if (charIndex === 0) {
    line.classList.add('is-visible', 'is-typing');
  }

  charIndex += 1;
  if (target) {
    target.textContent = fullText.slice(0, charIndex);
  }

  if (charIndex >= fullText.length) {
    line.classList.remove('is-typing');
    lineIndex += 1;
    charIndex = 0;
    timer = window.setTimeout(tick, LINE_PAUSE);
  } else {
    timer = window.setTimeout(tick, CHAR_DELAY);
  }
}

export function startDemo() {
  clearTimer();
  paused = false;

  const stage = document.querySelector<HTMLElement>('[data-demo]');
  lines = stage ? Array.from(stage.querySelectorAll<HTMLElement>('[data-demo-line]')) : [];
  typeTargets = lines.map((line) => line.querySelector<HTMLElement>('.demo__type'));
  if (lines.length === 0) {
    return;
  }

  reset();
  syncToggleButton();
  tick();
}

export function toggleDemo() {
  if (lines.length === 0) {
    return;
  }
  paused = !paused;
  if (paused) {
    clearTimer();
  } else {
    tick();
  }
  syncToggleButton();
}

export function replayDemo() {
  if (lines.length === 0) {
    return;
  }
  clearTimer();
  paused = false;
  reset();
  syncToggleButton();
  tick();
}
