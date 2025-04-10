

/**
 * @param {number} time
 * @returns {Promise<void>}
 */
const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.text !== 'patreon') {
    return null;
  }

  const pinnedImageUrls = [];
  const chip = document.querySelector('*[data-tag="chip-container"]');
  if (!!chip) {
    const count = parseInt(chip.textContent, 10);
    pinnedImageUrls.push(...await parseLightboxImages(count));
  }

  const header = document.querySelector('.dVruMo');
  if (!!header) {
    header.querySelector('img').click();
    await wait(500);
    const img = document.querySelector('img[data-tag="lightboxImage"]');
    pinnedImageUrls.push(img.src);

    document.querySelector('button[data-tag="close"]').click();
    await wait(500);
  }

  const nameHolder = document.querySelector('div[data-tag="metadata-wrapper"] > div:nth-child(1) > div');
  const author = nameHolder?.textContent?.trim()?.replaceAll('"', '') ?? '';
  const elements = document.querySelectorAll('.iATlLz img');
  const images = Array.from(elements.values()).map(image => image.src);

  const title = document.querySelector('span[data-tag="post-title"]')
    ?.textContent?.trim()?.replaceAll('"', '')?.replaceAll('?', '？') ?? '';
  console.debug({title, author, images: [...pinnedImageUrls, ...images]});

  return {title, author, images: [...pinnedImageUrls, ...images]};
});

/**
 * @param {number} count
 * @return string[]
 */
async function parseLightboxImages(count) {
  const result = [];
  document.querySelector('.dBNGew img').click();
  await wait(500);

  let img = document.querySelector('img[data-tag="lightboxImage"]');
  result.push(img.src);

  for (let i = 1; i < count; i++) {
    document.querySelector('button[data-tag="nextImage"]').click();
    await wait(500);
    img = document.querySelector('img[data-tag="lightboxImage"]');
    result.push(img.src);
  }

  document.querySelector('button[data-tag="close"]').click();
  await wait(500);

  return result;
}
