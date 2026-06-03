import type { Lesson } from '../data/lessons.js';
import { escapeHtml } from './CodeBlock.js';

export function renderLessonSidebar(lessons: Lesson[], currentLessonId: string, completedLessonIds: Set<string>) {
  return `
    <aside class="sidebar" aria-label="レッスン一覧">
      <div class="sidebar__intro">
        <span class="logo-mark">☁️</span>
        <div>
          <p class="eyebrow">Browser Learning</p>
          <h1>クラウドコード入門</h1>
        </div>
      </div>
      <nav class="lesson-nav">
        ${lessons.map((lesson, index) => {
          const isCurrent = lesson.id === currentLessonId;
          const isCompleted = completedLessonIds.has(lesson.id);
          return `
            <button
              class="${isCurrent ? 'lesson-nav__item lesson-nav__item--active' : 'lesson-nav__item'}"
              type="button"
              data-lesson-id="${escapeHtml(lesson.id)}"
              aria-current="${isCurrent ? 'step' : 'false'}"
            >
              <span class="lesson-nav__number">${String(index + 1).padStart(2, '0')}</span>
              <span>
                <strong>${escapeHtml(lesson.title)}</strong>
                <small>${escapeHtml(lesson.badge)}・${escapeHtml(lesson.duration)}</small>
              </span>
              <span class="lesson-nav__status" aria-label="${isCompleted ? '完了' : '未完了'}">${isCompleted ? '✓' : '○'}</span>
            </button>
          `;
        }).join('')}
      </nav>
    </aside>
  `;
}
