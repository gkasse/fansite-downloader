browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.text !== 'ci-en') {
    return null;
  }

  const urls = [...document.querySelectorAll('img.file-player-image')]
    .filter(elem => elem.width > 450 || elem.height > 380)
    .map(elem => elem.getAttribute('data-raw'));
  const author = document.querySelector('.e-userName').textContent.trim().replaceAll('/', '／').replaceAll('*', '＊');
  const title = document.querySelector('.article-title').textContent.trim().replaceAll('/', '／').replaceAll('*', '＊');
  return {urls, title, author};
});

