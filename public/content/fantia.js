console.log('hogejo');

/**
 * @param {number} time
 * @returns {Promise<void>}
 */
const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 * @param {HTMLAnchorElement[]} elements
 * @returns {Promise<string[]>}
 */
const parseUrl = async elements => {
  const result = [];
  for (let element of elements) {
    element.click();
    await wait(300);
    result.push(document.querySelector('a.btn.btn-secondary.btn-sm.mr-10.ng-scope').href);
    document.querySelector('a.btn.btn-dark.btn-sm').click();
    await wait(300);
  }
  return result;
};

browser.runtime.onMessage.addListener(async (msg) => {
  console.log('hoge');
  if (msg.text !== 'fantia') {
    throw new Error();
  }

  const elements = document.querySelectorAll('a.image-container');
  if (elements.length === 0) {
    return [];
  }

  const urls = await parseUrl(elements)
  const name = document.querySelector('.fanclub-name a').textContent.trim();
  const page = document.querySelector('.the-post .post-title').textContent.trim();
  return {urls, name, page};
});
