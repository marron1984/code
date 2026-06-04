// 自動再生デモのドライバー。
// 画面録画のように、各行を1文字ずつタイプして表示し、最後まで再生したら少し待って最初に戻る（ループ）。
// App の render() が innerHTML を作り直すたびに startDemo() を呼ぶ。古いタイマーは必ず止める。

let timer: number | undefined;

const CHAR_DELAY = 26; // 1文字あたりの待ち時間(ms)
const LINE_PAUSE = 480; // 行と行の間の待ち時間(ms)
const LOOP_PAUSE = 2400; // 最後まで再生したあと、最初に戻るまでの待ち時間(ms)

export function startDemo() {
  if (timer !== undefined) {
    window.clearTimeout(timer);
    timer = undefined;
  }

  const stage = document.querySelector<HTMLElement>('[data-demo]');
  if (!stage) {
    return;
  }

  const lines = Array.from(stage.querySelectorAll<HTMLElement>('[data-demo-line]'));
  if (lines.length === 0) {
    return;
  }

  const typeTargets = lines.map((line) => line.querySelector<HTMLElement>('.demo__type'));

  function reset() {
    lines.forEach((line, index) => {
      line.classList.remove('is-visible', 'is-typing');
      const target = typeTargets[index];
      if (target) {
        target.textContent = '';
      }
    });
  }

  let lineIndex = 0;
  let charIndex = 0;

  function tick() {
    // 全部の行を再生し終えたら、少し待ってから最初に戻る
    if (lineIndex >= lines.length) {
      timer = window.setTimeout(() => {
        reset();
        lineIndex = 0;
        charIndex = 0;
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

  reset();
  tick();
}
