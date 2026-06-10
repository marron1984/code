import type { Lesson } from '../data/lessons.js';
import { escapeHtml } from './CodeBlock.js';

/** 体験コーナーのやりとり1行分 */
export type PracticeEntry = { role: 'you' | 'ai'; text: string };

/**
 * やりとりの1行を描画する。fresh を付けると本文を空にしておき、
 * あとから practice.ts がタイプ演出で文字を流し込む。
 */
export function renderPracticeLine(role: 'you' | 'ai', text: string, opts: { fresh?: boolean } = {}) {
  const safe = escapeHtml(text);
  const label = role === 'you' ? 'あなた' : '🤖 Claude';

  if (opts.fresh) {
    return `
      <div class="demo__line demo__line--ai is-visible" data-practice-fresh data-text="${safe}">
        <span class="demo__role" aria-hidden="true">${label}</span>
        <span class="demo__type"></span>
      </div>
    `;
  }

  return `
    <div class="demo__line demo__line--${role} is-visible">
      <span class="demo__role" aria-hidden="true">${label}</span>
      <span class="demo__type">${safe}</span>
    </div>
  `;
}

export function renderPractice(lesson: Lesson, log: PracticeEntry[]) {
  return `
    <section class="practice" aria-label="自分でやってみよう">
      <div class="practice__bar">
        <span aria-hidden="true">🎮</span>
        <span>自分でやってみよう — ${escapeHtml(lesson.practice.prompt)}</span>
      </div>
      <div class="practice__screen" data-practice-screen>
        ${log.length === 0
          ? '<p class="practice__hint">👇 下のボタンを押すか、自由に書いて送ってみよう</p>'
          : log.map((entry) => renderPracticeLine(entry.role, entry.text)).join('')}
      </div>
      <div class="practice__suggestions">
        ${lesson.practice.suggestions.map((suggestion, index) => `
          <button class="practice__chip" type="button" data-suggestion-index="${index}">${escapeHtml(suggestion.label)}</button>
        `).join('')}
      </div>
      <div class="practice__inputrow">
        <input
          class="practice__input"
          data-practice-input
          type="text"
          placeholder="${escapeHtml(lesson.practice.placeholder)}"
          autocomplete="off"
        />
        <button class="practice__send" type="button" data-action="practice-send">送信 ▶</button>
      </div>
    </section>
  `;
}
