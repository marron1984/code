// 体験コーナーで、Claude役の返事を1文字ずつタイプ表示するドライバー。
// 連続で送信されたときは、前の返事を全文表示にしてから新しい返事を流す。

const CHAR_DELAY = 22;

let timer: number | undefined;
let active: { line: HTMLElement; target: HTMLElement | null; text: string } | undefined;

function finishActive() {
  if (!active) {
    return;
  }
  if (active.target) {
    active.target.textContent = active.text;
  }
  active.line.classList.remove('is-typing');
  active = undefined;
}

export function typePracticeReply() {
  if (timer !== undefined) {
    window.clearTimeout(timer);
    timer = undefined;
  }
  finishActive();

  const line = document.querySelector<HTMLElement>('[data-practice-fresh]');
  if (!line) {
    return;
  }
  line.removeAttribute('data-practice-fresh');

  const target = line.querySelector<HTMLElement>('.demo__type');
  const text = line.dataset.text ?? '';
  const screen = line.closest<HTMLElement>('[data-practice-screen]');
  active = { line, target, text };
  line.classList.add('is-typing');

  let charIndex = 0;
  const tick = () => {
    charIndex += 1;
    if (target) {
      target.textContent = text.slice(0, charIndex);
    }
    if (screen) {
      screen.scrollTop = screen.scrollHeight;
    }
    if (charIndex >= text.length) {
      line.classList.remove('is-typing');
      active = undefined;
      timer = undefined;
      return;
    }
    timer = window.setTimeout(tick, CHAR_DELAY);
  };
  tick();
}
