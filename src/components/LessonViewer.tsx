import type { Lesson } from '../data/lessons.js';
import { escapeHtml, renderCodeBlock } from './CodeBlock.js';
import { renderQuiz, type QuizAnswers } from './Quiz.js';

export function renderLessonViewer(
  lesson: Lesson,
  lessonNumber: number,
  totalLessons: number,
  selectedAnswers: QuizAnswers,
  isCompleted: boolean,
) {
  const accent = escapeHtml(lesson.accent);

  return `
    <article class="lesson-viewer" style="--accent: ${accent}">
      <header class="lesson-hero">
        <span class="lesson-hero__icon" aria-hidden="true">${escapeHtml(lesson.icon)}</span>
        <div class="lesson-hero__text">
          <p class="eyebrow">Lesson ${lessonNumber} / ${totalLessons}・${escapeHtml(lesson.badge)}</p>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p class="lesson-hero__summary">${escapeHtml(lesson.summary)}</p>
        </div>
      </header>

      <section class="goal-banner" aria-label="この章のゴール">
        <span class="goal-banner__icon" aria-hidden="true">🎯</span>
        <div>
          <p class="eyebrow">この章のゴール</p>
          <p>${escapeHtml(lesson.goal)}</p>
        </div>
      </section>

      <section class="flow" aria-label="やることの流れ">
        <p class="eyebrow flow__title">👇 こんな流れ</p>
        <ol class="flow__steps">
          ${lesson.steps.map((step, index) => `
            <li class="flow__step">
              <span class="flow__icon" aria-hidden="true">${escapeHtml(step.icon)}</span>
              <span class="flow__num">${index + 1}</span>
              <span class="flow__text">${escapeHtml(step.text)}</span>
            </li>
          `).join('<span class="flow__arrow" aria-hidden="true">→</span>')}
        </ol>
      </section>

      <section class="term-panel" aria-labelledby="terms-title">
        <p class="eyebrow" id="terms-title">📚 言葉カード</p>
        <div class="term-grid">
          ${lesson.terms.map((term) => `
            <div class="term">
              <span class="term__icon" aria-hidden="true">${escapeHtml(term.icon)}</span>
              <strong>${escapeHtml(term.term)}</strong>
              <span class="term__desc">${escapeHtml(term.description)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      ${renderCodeBlock(lesson.codeTitle, lesson.code)}
      ${renderQuiz(lesson.quiz, selectedAnswers)}

      <section class="next-action" aria-label="次にやること">
        <span class="next-action__icon" aria-hidden="true">➡️</span>
        <div>
          <p class="eyebrow">次にやること</p>
          <p>${escapeHtml(lesson.nextAction)}</p>
        </div>
      </section>

      <div class="lesson-actions">
        <button class="primary-button" type="button" data-action="complete">
          ${isCompleted ? '✅ 完了済み' : '🏅 この章を完了にする'}
        </button>
        <button class="secondary-button" type="button" data-action="next">
          次のレッスンへ →
        </button>
      </div>
    </article>
  `;
}
