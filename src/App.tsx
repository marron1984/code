import { renderLessonSidebar } from './components/LessonSidebar.js';
import { renderLessonViewer } from './components/LessonViewer.js';
import { renderPracticeLine, type PracticeEntry } from './components/Practice.js';
import { renderQuiz } from './components/Quiz.js';
import { lessons } from './data/lessons.js';
import { burstConfetti } from './confetti.js';
import { replayDemo, startDemo, toggleDemo } from './demo.js';
import { typePracticeReply } from './practice.js';

const STORAGE_KEY = 'claude-code-learning-progress-v1';

const state: {
  currentLessonId: string;
  completedLessonIds: Set<string>;
  quizAnswers: Record<string, Record<number, number>>;
  practiceLogs: Record<string, PracticeEntry[]>;
} = {
  currentLessonId: lessons[0].id,
  completedLessonIds: new Set(),
  quizAnswers: {},
  practiceLogs: {},
};

// 進捗をブラウザに保存する（閉じても続きから学べる）
function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentLessonId: state.currentLessonId,
        completed: [...state.completedLessonIds],
        quizAnswers: state.quizAnswers,
      }),
    );
  } catch {
    // プライベートモードなどで保存できなくても、学習は続けられる
  }
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const saved: unknown = JSON.parse(raw);
    if (typeof saved !== 'object' || saved === null) {
      return;
    }
    const data = saved as { currentLessonId?: unknown; completed?: unknown; quizAnswers?: unknown };
    if (typeof data.currentLessonId === 'string' && lessons.some((lesson) => lesson.id === data.currentLessonId)) {
      state.currentLessonId = data.currentLessonId;
    }
    if (Array.isArray(data.completed)) {
      for (const id of data.completed) {
        if (typeof id === 'string' && lessons.some((lesson) => lesson.id === id)) {
          state.completedLessonIds.add(id);
        }
      }
    }
    if (typeof data.quizAnswers === 'object' && data.quizAnswers !== null) {
      state.quizAnswers = data.quizAnswers as Record<string, Record<number, number>>;
    }
  } catch {
    // 壊れた保存データは無視して最初から
  }
}

const root = document.querySelector<HTMLDivElement>('#root');

function currentLessonIndex() {
  return lessons.findIndex((lesson) => lesson.id === state.currentLessonId);
}

function currentLesson() {
  return lessons[currentLessonIndex()] ?? lessons[0];
}

function render() {
  if (!root) {
    return;
  }

  const lesson = currentLesson();
  const lessonIndex = currentLessonIndex();
  const progressPercent = Math.round((state.completedLessonIds.size / lessons.length) * 100);
  const currentQuizAnswers = state.quizAnswers[lesson.id] ?? {};
  const progressMessage = progressPercent === 100
    ? '🎉 全部クリア！ きみはもう Claude Code の立派な相棒です！'
    : `${state.completedLessonIds.size} / ${lessons.length} 章を完了しました。超入門から実務まで、1章ずつ進めましょう。`;

  root.innerHTML = `
    <div class="app-shell">
      ${renderLessonSidebar(lessons, lesson.id, state.completedLessonIds)}
      <main class="main-content">
        <section class="progress-card" aria-label="学習進捗">
          <div>
            <p class="eyebrow">進捗</p>
            <h2>${progressPercent}% 完了</h2>
            <p>${progressMessage}</p>
          </div>
          <div class="progress-ring" aria-hidden="true" style="--progress: ${progressPercent}%">
            <span>${progressPercent}%</span>
          </div>
        </section>
        ${renderLessonViewer(
          lesson,
          (lessonIndex === -1 ? 0 : lessonIndex) + 1,
          lessons.length,
          currentQuizAnswers,
          state.completedLessonIds.has(lesson.id),
          state.practiceLogs[lesson.id] ?? [],
        )}
      </main>
    </div>
  `;

  // 画面を作り直したら、自動再生デモを開始（前のタイマーは内部で止まる）
  startDemo();
}

// 体験コーナーへの送信。画面全体は作り直さず、やりとりの行だけ追加する
// （全体を作り直すとデモが再生し直しになり、入力欄のフォーカスも失われるため）。
function submitPractice(rawText: string, forcedReply?: string) {
  const text = rawText.trim();
  if (!text) {
    return;
  }

  const lesson = currentLesson();
  let reply = forcedReply;
  if (!reply) {
    const lower = text.toLowerCase();
    const match = lesson.practice.suggestions.find((suggestion) =>
      suggestion.keywords.some((keyword) => lower.includes(keyword.toLowerCase())),
    );
    reply = match ? match.reply : lesson.practice.fallback;
  }

  const log = state.practiceLogs[lesson.id] ?? (state.practiceLogs[lesson.id] = []);
  log.push({ role: 'you', text }, { role: 'ai', text: reply });

  const screen = document.querySelector<HTMLElement>('[data-practice-screen]');
  if (screen) {
    screen.querySelector('.practice__hint')?.remove();
    screen.insertAdjacentHTML('beforeend', renderPracticeLine('you', text));
    screen.insertAdjacentHTML('beforeend', renderPracticeLine('ai', reply, { fresh: true }));
    screen.scrollTop = screen.scrollHeight;
    typePracticeReply();
  }

  const input = document.querySelector<HTMLInputElement>('[data-practice-input]');
  if (input) {
    input.value = '';
    input.focus();
  }
}

document.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const lessonButton = target.closest<HTMLButtonElement>('[data-lesson-id]');
  if (lessonButton) {
    state.currentLessonId = lessonButton.dataset.lessonId ?? state.currentLessonId;
    persist();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // 言葉カードをめくる（画面は作り直さない）
  const termCard = target.closest<HTMLButtonElement>('[data-term-card]');
  if (termCard) {
    termCard.classList.toggle('term--flipped');
    return;
  }

  // 体験コーナーの選択肢ボタン
  const chip = target.closest<HTMLButtonElement>('[data-suggestion-index]');
  if (chip) {
    const suggestion = currentLesson().practice.suggestions[Number(chip.dataset.suggestionIndex)];
    if (suggestion) {
      submitPractice(suggestion.input, suggestion.reply);
    }
    return;
  }

  // クイズはクイズの部分だけ描き直す（デモを再生し直さないため）
  const answerButton = target.closest<HTMLButtonElement>('[data-question-index][data-answer-index]');
  if (answerButton) {
    const questionIndex = Number(answerButton.dataset.questionIndex);
    const answerIndex = Number(answerButton.dataset.answerIndex);
    state.quizAnswers[state.currentLessonId] = {
      ...(state.quizAnswers[state.currentLessonId] ?? {}),
      [questionIndex]: answerIndex,
    };
    persist();
    const quizSection = document.querySelector('.quiz');
    if (quizSection) {
      quizSection.outerHTML = renderQuiz(currentLesson().quiz, state.quizAnswers[state.currentLessonId] ?? {});
    } else {
      render();
    }
    return;
  }

  const copyButton = target.closest<HTMLButtonElement>('[data-copy-code]');
  if (copyButton) {
    await navigator.clipboard.writeText(copyButton.dataset.copyCode ?? '');
    copyButton.textContent = 'コピーしました';
    window.setTimeout(() => {
      copyButton.textContent = '📋 コピー';
    }, 1800);
    return;
  }

  const actionButton = target.closest<HTMLButtonElement>('[data-action]');
  if (!actionButton) {
    return;
  }

  switch (actionButton.dataset.action) {
    case 'demo-toggle':
      toggleDemo();
      return;
    case 'demo-replay':
      replayDemo();
      return;
    case 'practice-send': {
      const input = document.querySelector<HTMLInputElement>('[data-practice-input]');
      submitPractice(input?.value ?? '');
      return;
    }
    case 'complete': {
      const firstTime = !state.completedLessonIds.has(state.currentLessonId);
      state.completedLessonIds.add(state.currentLessonId);
      persist();
      render();
      if (firstTime) {
        // 全クリのときは特大のお祝い
        burstConfetti(state.completedLessonIds.size === lessons.length ? 140 : 45);
      }
      return;
    }
    case 'next': {
      const nextLesson = lessons[(currentLessonIndex() + 1) % lessons.length];
      state.currentLessonId = nextLesson.id;
      persist();
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  }
});

// 入力欄で Enter でも送信できるように
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') {
    return;
  }
  const target = event.target;
  if (target instanceof HTMLInputElement && target.matches('[data-practice-input]')) {
    submitPractice(target.value);
  }
});

restore();
render();
