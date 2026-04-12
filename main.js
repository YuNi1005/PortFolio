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

/* ─── ハンバーガーメニュー ─── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// リンクをタップしたらメニューを閉じる
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ─── モーダル ─── */
const overlay     = document.getElementById('workModal');
const modalTitle  = document.getElementById('modalTitle');
const modalPeriod = document.getElementById('modalPeriod');
const modalDesc   = document.getElementById('modalDesc');
const modalTags   = document.getElementById('modalTags');
const modalThumb  = document.getElementById('modalThumb');
const modalFooter = document.getElementById('modalFooter');
const modalClose  = document.getElementById('modalClose');

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const title    = card.dataset.title    || '';
    const period   = card.dataset.period   || '';
    const desc     = card.dataset.desc     || '';
    const tags     = card.dataset.tags     || '';
    const thumbBg  = card.dataset.thumbBg  || '#EDEDEA';
    const thumbImg = card.dataset.thumbImg || '';
    const github   = card.dataset.github   || '';

    modalTitle.textContent  = title;
    modalPeriod.textContent = period;
    modalDesc.textContent   = desc;

    modalThumb.innerHTML = thumbImg
      ? `<img class="modal-thumb" src="${thumbImg}" alt="${title}">`
      : `<div class="modal-thumb-placeholder" style="background:${thumbBg};">${title}</div>`;

    modalTags.innerHTML = tags
      ? tags.split(',').map(t => `<span class="work-tag">${t.trim()}</span>`).join('')
      : '';

    modalFooter.innerHTML = github
      ? `<a class="btn btn-solid" href="${github}" target="_blank" rel="noopener">GitHub で見る</a>`
      : '';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}