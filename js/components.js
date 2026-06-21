/**
 * Загрузка переиспользуемых partials (шапка и футер)
 * Подключайте на любой странице: <div id="site-header"></div> + components.js
 */
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Не удалось загрузить ${url}:`, err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('#site-header', 'partials/header.html'),
    loadPartial('#site-footer', 'partials/footer.html'),
  ]);

  document.dispatchEvent(new CustomEvent('components:loaded'));
});
