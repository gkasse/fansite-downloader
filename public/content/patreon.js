/**
 * @param {number} time
 * @returns {Promise<void>}
 */
const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.text !== 'patreon') {
    throw new Error();
  }

  const pinnedImageUrls = [];
  const pinnedElementCount = document.querySelectorAll('img[data-pin-nopin="true"]').length;
  if (pinnedElementCount > 0) {
    // open carousel
    const pinnedElement = document.querySelector('img[data-pin-nopin="true"]');
    pinnedElement?.click();
    console.debug('Open carousel');
    console.debug('wait...');
    await wait(500);

    for (let i = 0; i < pinnedElementCount; i++) {
      const imgElement = document.querySelector('div[data-focus-lock-disabled="false"] img[data-pin-nopin="true"]');
      console.debug('Add new Image');
      pinnedImageUrls.push(imgElement.src);
      const [, nextButton] = document.querySelectorAll('div[data-focus-lock-disabled="false"] button');
      console.debug('Move next');
      nextButton?.click();
      console.debug('wait....')
      await wait(1000);
    }

    let closeButton;
    if (pinnedElementCount === 1) {
      closeButton = document.querySelector('div[data-focus-lock-disabled="false"] button');
    } else {
      [, , closeButton] = document.querySelectorAll('div[data-focus-lock-disabled="false"] button');
    }
    console.debug('Close carousel');
    closeButton?.click();
  } else {
    document.querySelector('div[data-tag="post-card"] img')?.click();
    await wait(500);
    const imgElement = document.querySelector('div[data-focus-lock-disabled="false"] img');
    pinnedImageUrls.push(imgElement.src);

    document.querySelector('div[data-focus-lock-disabled="false"] button')?.click();
  }
  await wait(500);

  const nameHolder = document.querySelector('div[data-tag="metadata-wrapper"] > div:nth-child(1) > div');
  const author = nameHolder?.textContent?.trim() ?? '';
  const elements = document.querySelectorAll('div[data-tag="post-content"] img');
  const images = Array.from(elements.values()).map(image => image.src);

  const title = document.querySelector('span[data-tag="post-title"]')?.textContent?.trim() ?? '';
  console.debug({title, author, images: [...pinnedImageUrls, ...images]});

  return {title, author, images: [...pinnedImageUrls, ...images]};
});
