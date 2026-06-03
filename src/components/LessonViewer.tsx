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
  return `
    <article class="lesson-viewer">
      <header class="lesson-hero">
        <div>
          <p class="eyebrow">Lesson ${lessonNumber} / ${totalLessons}</p>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p class="lesson-hero__goal">ゴール: ${escapeHtml(lesson.goal)}</p>
        </div>
        <span class="lesson-badge">${escapeHtml(lesson.badge)}</span>
      </header>

      <section class="term-panel" aria-labelledby="terms-title">
        <p class="eyebrow" id="terms-title">用語ミニ説明</p>
        <div class="term-grid">
          ${lesson.terms.map((term) => `
            <div class="term">
              <strong>${escapeHtml(term.term)}</strong>
              <span>${escapeHtml(term.description)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="lesson-body">
        ${lesson.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </section>

      ${renderCodeBlock(lesson.codeTitle, lesson.code)}
      ${renderQuiz(lesson.quiz, selectedAnswers)}

      <section class="next-action" aria-label="次にやること">
        <p class="eyebrow">次にやること</p>
        <p>${escapeHtml(lesson.nextAction)}</p>
      </section>

      <div class="lesson-actions">
        <button class="primary-button" type="button" data-action="complete">
          ${isCompleted ? '完了済み' : 'この章を完了にする'}
        </button>
        <button class="secondary-button" type="button" data-action="next">
          次のレッスンへ
        </button>
      </div>
    </article>
  `;
}
