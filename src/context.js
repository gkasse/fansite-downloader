import { Notifier } from './Notifier.js';
import { Downloader } from "./downloader.js";

/** @var browser */

browser.contextMenus.create({
    id: 'fansite-downloader',
    title: 'Fansiteダウンローダー',
    contexts: ['page'],
});

browser.contextMenus.create({
    id: 'fansite-downloader-patreon',
    title: 'Patreon',
    parentId: 'fansite-downloader',
    contexts: ['page'],
    documentUrlPatterns: ['https://www.patreon.com/*'],
});

browser.contextMenus.create({
    id: 'fansite-downloader-fanbox',
    title: 'Fanbox',
    parentId: 'fansite-downloader',
    contexts: ['page'],
    documentUrlPatterns: [
        "https://www.fanbox.cc/*",
        "https://*.fanbox.cc/*",
    ],
});

browser.contextMenus.create({
    id: 'fansite-downloader-fantia',
    title: 'Fantia',
    parentId: 'fansite-downloader',
    contexts: ['page'],
    documentUrlPatterns: ['https://fantia.jp/*'],
});

browser.contextMenus.create({
    id: 'fansite-downloader-cien',
    title: 'Ci-en',
    parentId: 'fansite-downloader',
    contexts: ['page'],
    documentUrlPatterns: ['https://ci-en.dlsite.com/creator/*'],
});

browser.contextMenus.onClicked.addListener(async (info) => {
    const keyword = info.menuItemId.replace('fansite-downloader-', '');
    const [tab] = await browser.tabs.query({
        currentWindow: true,
        active: true,
    });

    if (!tab || !Downloader.SUPPORTED.includes(keyword)) {
        return false;
    }

    await Notifier.start(tab.url);
    const params = await browser.tabs.sendMessage(tab.id, {text: keyword});
    await Downloader[keyword](params);
    await Notifier.end(tab.url);

    return true;
});
