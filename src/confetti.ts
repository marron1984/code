// 章をクリアしたときのお祝い紙吹雪。CSSアニメだけの軽量実装。

const COLORS = ['#2f7df6', '#7c5cff', '#f59e0b', '#10b981', '#ef4444', '#f472b6'];

export function burstConfetti(count = 40) {
  const host = document.createElement('div');
  host.className = 'confetti';
  host.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${2 + Math.random() * 1.6}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    host.appendChild(piece);
  }

  document.body.appendChild(host);
  window.setTimeout(() => host.remove(), 4500);
}
