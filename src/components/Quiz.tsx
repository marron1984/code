import type { QuizQuestion } from '../data/lessons.js';
import { escapeHtml } from './CodeBlock.js';

export type QuizAnswers = Record<number, number>;

export function renderQuiz(questions: QuizQuestion[], selectedAnswers: QuizAnswers) {
  return `
    <section class="quiz" aria-labelledby="quiz-title">
      <p class="eyebrow" id="quiz-title">理解度チェック</p>
      ${questions.map((question, questionIndex) => renderQuestion(question, questionIndex, selectedAnswers)).join('')}
    </section>
  `;
}

function renderQuestion(question: QuizQuestion, questionIndex: number, selectedAnswers: QuizAnswers) {
  const selectedAnswer = selectedAnswers[questionIndex];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.answerIndex;

  return `
    <div class="quiz__question">
      <h3>${escapeHtml(question.question)}</h3>
      <div class="quiz__options">
        ${question.options.map((option, answerIndex) => `
          <button
            class="${selectedAnswer === answerIndex ? 'quiz__option quiz__option--selected' : 'quiz__option'}"
            type="button"
            data-question-index="${questionIndex}"
            data-answer-index="${answerIndex}"
          >${escapeHtml(option)}</button>
        `).join('')}
      </div>
      ${isAnswered ? `
        <p class="${isCorrect ? 'quiz__feedback quiz__feedback--correct' : 'quiz__feedback quiz__feedback--incorrect'}">
          ${isCorrect ? '正解です。' : 'もう一度見直してみましょう。'} ${escapeHtml(question.explanation)}
        </p>
      ` : ''}
    </div>
  `;
}
