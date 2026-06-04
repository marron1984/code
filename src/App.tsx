import { renderLessonSidebar } from './components/LessonSidebar.js';
import { renderLessonViewer } from './components/LessonViewer.js';
import { lessons } from './data/lessons.js';
import { startDemo } from './demo.js';

const state: {
  currentLessonId: string;
  completedLessonIds: Set<string>;
  quizAnswers: Record<string, Record<number, number>>;
} = {
  currentLessonId: lessons[0].id,
  completedLessonIds: new Set(),
  quizAnswers: {},
};

const root = document.querySelector<HTMLDivElement>('#root');

function render() {
  if (!root) {
    return;
  }

  const currentLessonIndex = lessons.findIndex((lesson) => lesson.id === state.currentLessonId);
  const currentLesson = lessons[currentLessonIndex] ?? lessons[0];
  const progressPercent = Math.round((state.completedLessonIds.size / lessons.length) * 100);
  const currentQuizAnswers = state.quizAnswers[currentLesson.id] ?? {};

  root.innerHTML = `
    <div class="app-shell">
      ${renderLessonSidebar(lessons, currentLesson.id, state.completedLessonIds)}
      <main class="main-content">
        <section class="progress-card" aria-label="学習進捗">
          <div>
            <p class="eyebrow">進捗</p>
            <h2>${progressPercent}% 完了</h2>
            <p>${state.completedLessonIds.size} / ${lessons.length} 章を完了しました。超入門から実務まで、1章ずつ進めましょう。クイズに答えて、章末のボタンで記録できます。</p>
          </div>
          <div class="progress-ring" aria-hidden="true" style="--progress: ${progressPercent}%">
            <span>${progressPercent}%</span>
          </div>
        </section>
        ${renderLessonViewer(
          currentLesson,
          currentLessonIndex + 1,
          lessons.length,
          currentQuizAnswers,
          state.completedLessonIds.has(currentLesson.id),
        )}
      </main>
    </div>
  `;

  // 画面を作り直したら、自動再生デモを開始（前のタイマーは内部で止まる）
  startDemo();
}

function currentLessonIndex() {
  return lessons.findIndex((lesson) => lesson.id === state.currentLessonId);
}

document.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const lessonButton = target.closest<HTMLButtonElement>('[data-lesson-id]');
  if (lessonButton) {
    state.currentLessonId = lessonButton.dataset.lessonId ?? state.currentLessonId;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const answerButton = target.closest<HTMLButtonElement>('[data-question-index][data-answer-index]');
  if (answerButton) {
    const questionIndex = Number(answerButton.dataset.questionIndex);
    const answerIndex = Number(answerButton.dataset.answerIndex);
    state.quizAnswers[state.currentLessonId] = {
      ...(state.quizAnswers[state.currentLessonId] ?? {}),
      [questionIndex]: answerIndex,
    };
    render();
    return;
  }

  const copyButton = target.closest<HTMLButtonElement>('[data-copy-code]');
  if (copyButton) {
    await navigator.clipboard.writeText(copyButton.dataset.copyCode ?? '');
    copyButton.textContent = 'コピーしました';
    window.setTimeout(() => {
      copyButton.textContent = 'コードをコピー';
    }, 1800);
    return;
  }

  const actionButton = target.closest<HTMLButtonElement>('[data-action]');
  if (actionButton?.dataset.action === 'complete') {
    state.completedLessonIds.add(state.currentLessonId);
    render();
    return;
  }

  if (actionButton?.dataset.action === 'next') {
    const nextLesson = lessons[(currentLessonIndex() + 1) % lessons.length];
    state.currentLessonId = nextLesson.id;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

render();
