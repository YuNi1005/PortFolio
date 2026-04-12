/* ─── スクロールアニメーション ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── モーダル ─── */
const overlay   = document.getElementById('workModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalTags  = document.getElementById('modalTags');
const modalThumb = document.getElementById('modalThumb');
const modalFooter = document.getElementById('modalFooter');
const modalClose = document.getElementById('modalClose');

// 作品カードをクリックしたときにモーダルを開く
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const title    = card.dataset.title    || '';
    const desc     = card.dataset.desc     || '';
    const tags     = card.dataset.tags     || '';
    const thumbBg  = card.dataset.thumbBg  || '#EDEDEA';
    const thumbImg = card.dataset.thumbImg || '';
    const github   = card.dataset.github   || '';

    // タイトル・説明
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    // サムネイル（画像あり / なし）
    if (thumbImg) {
      modalThumb.innerHTML = `<img class="modal-thumb" src="${thumbImg}" alt="${title}">`;
    } else {
      modalThumb.innerHTML = `<div class="modal-thumb-placeholder" style="background:${thumbBg};">${title}</div>`;
    }

    // タグ
    modalTags.innerHTML = tags
      ? tags.split(',').map(t => `<span class="work-tag">${t.trim()}</span>`).join('')
      : '';

    // フッター（GitHubボタン）
    modalFooter.innerHTML = github
      ? `<a class="btn btn-solid" href="${github}" target="_blank" rel="noopener">GitHub で見る</a>`
      : '';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// 閉じるボタン
modalClose.addEventListener('click', closeModal);

// オーバーレイ（背景）クリックで閉じる
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// Escキーで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}