export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderCodeBlock(title: string, code: string) {
  return `
    <section class="code-card" aria-label="${escapeHtml(title)}のコード例">
      <div class="code-card__header">
        <h3><span aria-hidden="true">💻</span> ${escapeHtml(title)}</h3>
        <button class="copy-button" type="button" data-copy-code="${escapeHtml(code)}">📋 コピー</button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </section>
  `;
}
