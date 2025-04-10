const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));
const parseUrl = elements => elements.map(element => document.evaluate('./ancestor::a', element, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue.href);

/** @var browser */

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.text !== 'fanbox') {
    return null;
  }

  const elements = [], evaluated = document.evaluate('//a[@target="_blank"]//img', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  let element = evaluated.iterateNext();
  while(element) {
    elements.push(element);
    element = evaluated.iterateNext();
  }

  const [, authorElement, titleElement] = document.querySelectorAll('h1');
  const author = authorElement.textContent.trim()
    .replaceAll('/', '／')
    .replaceAll('*', '＊');
  const title = titleElement.textContent.trim()
    .replaceAll('/', '／')
    .replaceAll('*', '＊');
  return {urls: parseUrl(elements), author, title};
});
