import type { DemoLine, Lesson } from '../data/lessons.js';
import { escapeHtml, renderCodeBlock } from './CodeBlock.js';
import { renderPractice, type PracticeEntry } from './Practice.js';
import { renderQuiz, type QuizAnswers } from './Quiz.js';

function roleLabel(role: DemoLine['role']) {
  switch (role) {
    case 'you':
      return 'あなた';
    case 'ai':
      return '🤖 Claude';
    case 'cmd':
      return '$';
    case 'out':
      return '↳';
  }
}

export function renderLessonViewer(
  lesson: Lesson,
  lessonNumber: number,
  totalLessons: number,
  selectedAnswers: QuizAnswers,
  isCompleted: boolean,
  practiceLog: PracticeEntry[],
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

      <section class="demo" aria-label="自動再生デモ">
        <div class="demo__bar">
          <span class="demo__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="demo__label">▶ 動きを見てみよう（自動でくり返し再生）</span>
          <span class="demo__controls">
            <button class="demo__btn" type="button" data-action="demo-toggle" aria-label="一時停止 / 再生">⏸</button>
            <button class="demo__btn" type="button" data-action="demo-replay" aria-label="最初から再生">↻</button>
          </span>
        </div>
        <div class="demo__screen" data-demo>
          ${lesson.demo.map((line) => `
            <div class="demo__line demo__line--${escapeHtml(line.role)}" data-demo-line data-text="${escapeHtml(line.text)}">
              <span class="demo__role" aria-hidden="true">${escapeHtml(roleLabel(line.role))}</span>
              <span class="demo__type"></span>
            </div>
          `).join('')}
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
        <p class="eyebrow" id="terms-title">📚 言葉カード（タップでめくれる）</p>
        <div class="term-grid">
          ${lesson.terms.map((term) => `
            <button class="term" type="button" data-term-card>
              <span class="term__inner">
                <span class="term__front">
                  <span class="term__icon" aria-hidden="true">${escapeHtml(term.icon)}</span>
                  <strong>${escapeHtml(term.term)}</strong>
                  <span class="term__hint">タップで意味を見る 👆</span>
                </span>
                <span class="term__back">${escapeHtml(term.description)}</span>
              </span>
            </button>
          `).join('')}
        </div>
      </section>

      ${renderCodeBlock(lesson.codeTitle, lesson.code)}
      ${renderPractice(lesson, practiceLog)}
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
