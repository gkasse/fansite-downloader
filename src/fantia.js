const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));

browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.text !== 'fantia') {
        return null;
    }

    const urls = [];
    /** @var {HTMLAnchorElement[]} elements */
    const elements = [...document.querySelectorAll('.post-contents .post-content a.image-container')];
    for (const element of elements) {
        element.click();
        await wait(100);

        /** @var {HTMLAnchorElement} anchor */
        const anchor = await new Promise(resolve => {
            const id = setInterval(() => {
                const node = document.evaluate('//a[text()="オリジナルサイズを表示"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
                if (!node) {
                    return;
                }

                resolve(node);
                clearInterval(id);
            }, 100);
        });
        const response = await fetch(anchor.href);
        const body = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(body, 'text/html');

        const resolvedUrl = doc.querySelector('img')?.src ?? '';
        if (!!resolvedUrl) {
            urls.push(resolvedUrl);
        }

        /** @var {HTMLAnchorElement} closeButton */
        const closeButton = await new Promise(resolve => {
            const id = setInterval(() => {
                const node = document.evaluate('//a[contains(text(), "閉じる")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
                if (!node) {
                    return;
                }

                resolve(node);
                clearInterval(id);
            }, 100);
        })
        closeButton.click();
        await wait(100);
    }

    const name = document.querySelector('.fanclub-name a').textContent.trim();
    const page = document.querySelector('.the-post .post-title').textContent.trim();

    return {urls, name, page};
});
