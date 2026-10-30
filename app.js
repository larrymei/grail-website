const isEnglish = document.documentElement.lang === 'en';
const newsCopy = isEnglish ? window.GRAIL_EN?.news : null;
const assetRoot = new URL('.', document.currentScript.src);
const assetUrl = path => new URL(path, assetRoot).href;
const readMore = isEnglish ? 'Read article' : '阅读全文';
const illustrationLabel = isEnglish ? 'Illustration' : '主题插图';
const pendingLabel = isEnglish ? 'Original article unavailable' : '原文链接待补';
const newsItems = (window.GRAIL_NEWS || []).map(item => ({...item, ...newsCopy?.[item.id]})).sort((a, b) => b.date.localeCompare(a.date));
const grid = document.querySelector('.news-grid');
const empty = document.querySelector('.empty-state');
const moreButton = document.querySelector('.news-more');
const newsStatus = document.querySelector('.news-count');
const pageSize = 8;
let visibleCount = pageSize;

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const dateLabel = date => {
  if (!isEnglish) return date.length === 4 ? `${date} 年` : date.replace(/-/g, '.');
  return date.length === 4 ? date : new Intl.DateTimeFormat('en', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));
};

function renderCards() {
  const previousCount = grid.children.length;
  empty.hidden = newsItems.length > 0;
  grid.innerHTML = newsItems.slice(0, visibleCount).map(item => {
    const cover = assetUrl(item.image || `assets/news/${item.type}.svg`);
    const link = item.articleLink && /^(https?:\/\/|#)/.test(item.url) ? item.url : null;
    return `<article class="news-card" id="${escapeHtml(item.id)}" aria-labelledby="${escapeHtml(item.id)}-title" tabindex="-1">
      <div class="news-card-media${item.image ? '' : ' is-placeholder'}">
        <img src="${escapeHtml(cover)}" alt="${escapeHtml(item.image ? item.imageAlt : '')}" loading="lazy" decoding="async" width="720" height="480" style="object-position:${escapeHtml(item.imagePosition || 'center')}" />
        ${item.image ? '' : `<span class="news-image-note">${illustrationLabel}</span>`}
      </div>
      <div class="news-card-body">
        <p class="news-source">${escapeHtml(item.source)}</p>
        <h3 id="${escapeHtml(item.id)}-title">${escapeHtml(item.title)}</h3>
        <p class="news-summary">${escapeHtml(item.summary)}</p>
      </div>
      <div class="news-card-footer">
        ${item.date.length === 4 ? `<span class="news-date">${dateLabel(item.date)}</span>` : `<time datetime="${escapeHtml(item.date)}">${dateLabel(item.date)}</time>`}
        ${link ? `<a href="${escapeHtml(link)}" ${link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${readMore}: ${escapeHtml(item.title)}${isEnglish ? ' (Chinese source; opens in a new tab)' : '（新窗口打开）'}">${readMore}</a>` : `<span class="news-link-pending" role="link" aria-disabled="true" aria-label="${pendingLabel}" title="${pendingLabel}">${readMore}</span>`}
      </div>
    </article>`;
  }).join('');
  grid.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
    image.src = assetUrl('assets/news/media.svg');
    image.alt = '';
    const media = image.closest('.news-card-media');
    media.classList.add('is-placeholder');
    if (!media.querySelector('.news-image-note')) media.insertAdjacentHTML('beforeend', `<span class="news-image-note">${illustrationLabel}</span>`);
  }, {once: true}));
  moreButton.hidden = visibleCount >= newsItems.length;
  newsStatus.textContent = `${Math.min(visibleCount, newsItems.length)} / ${newsItems.length}`;
  // Newly revealed items receive focus so keyboard readers continue from here.
  if (previousCount) grid.children[previousCount]?.focus({preventScroll:true});
}

moreButton.addEventListener('click', () => {
  visibleCount += pageSize;
  renderCards();
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', isEnglish ? (open ? 'Close menu' : 'Open menu') : (open ? '关闭菜单' : '打开菜单'));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', isEnglish ? 'Open menu' : '打开菜单');
}));

renderCards();

// Keep visitors at the same section when they change language.
const languageLinks = document.querySelectorAll('.language-switch a:not([aria-current])');
function updateLanguageLinks() {
  languageLinks.forEach(link => { link.hash = window.location.hash; });
}
updateLanguageLinks();
window.addEventListener('hashchange', updateLanguageLinks);
languageLinks.forEach(link => link.addEventListener('click', updateLanguageLinks));
