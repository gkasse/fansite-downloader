

/**
 * @param {number} time
 * @returns {Promise<void>}
 */
const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

const HEADER_CLASSNAME = 'byKBvM';
const MAIN_CLASSNAME = 'biGFvI';

/**
 * 
 * @param {HTMLImageElement[]} images 
 * @returns {Promise<string[]>}
 */
async function parseLightboxImages(images) {
  const result = [];
  for (const image of images) {
    image.click();
    await wait(300);

    const imageInBox = await new Promise(resolve => {
      const id = setInterval(() => {
        const tmp = document.querySelector('img[data-tag="lightboxImage"]');
        if (!tmp) {
          return;
        }

        clearInterval(id);
        resolve(tmp);
      }, 500);
    });
    result.push(imageInBox.src);

    const close = await new Promise(resolve => {
      const id = setInterval(() => {
        const tmp = document.querySelector('*[data-tag="close"]');
        if (!tmp) {
          return;
        }

        clearInterval(id);
        resolve(tmp);
      }, 500);
    });
    close.click();
    await wait(100);
  }

  return result;
}

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.text !== 'patreon') {
    return null;
  }

  const images = [];
  const pinedImages = document.querySelectorAll(`*[data-tag="post-card"] .${HEADER_CLASSNAME} img`);
  if (pinedImages.length > 0) {
    const pinedImageSources = await parseLightboxImages(pinedImages);
    images.push(...pinedImageSources);
  }

  const mains = document.querySelectorAll(`.${MAIN_CLASSNAME} > div:nth-child(1) img`);
  for (const body of mains) {
    images.push(body.src);
  }

  const author = document.querySelector('div[data-tag="metadata-wrapper"] > div:nth-child(1) > div')?.textContent?.trim() ?? '';
  const title = document.querySelector('span[data-tag="post-title"]')?.textContent?.trim() ?? '';

  return { title, author, images };
});
