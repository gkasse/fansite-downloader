import {UtilityHelper} from "./util.js";

/** @var browser */

export class Downloader {
    static SUPPORTED = [
        'fantia',
        'fanbox',
        'patreon',
        'cien',
    ];

    /**
     * @param params {{urls: string[], name: string, page: string}}
     * @returns {Promise<void>}
     */
    static async fantia(params) {
        const {urls = [], name, page} = params;

        for (let i = 0; i < urls.length; i++) {
            await UtilityHelper.wait(100);
            const url = urls[i];
            const tmp = new URL(url).pathname.split('/').pop();
            const filename = [
                'Fansite-downloader',
                'fantia',
                `${name} - ${page}`,
                `p${i + 1}_${tmp}`,
            ].map((path) => this.#normalizePath(path)).join('/');
            await this.#download(url, filename);
        }
    }

    /**
     * @param params {{urls: string[], author: string, title: string}}
     * @returns {Promise<void>}
     */
    static async fanbox(params) {
        const {urls = [], author, title} = params;
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            await UtilityHelper.wait(100);
            const tmp = new URL(url).pathname.split('/').pop();
            const filename = [
                'Fansite-downloader',
                'fanbox',
                `${author} - ${title}`,
                `p${i + 1}_${tmp}`,
            ].map((path) => this.#normalizePath(path)).join('/');
            await this.#download(url, filename);
        }
    }

    /**
     * @param params {{author: string, title: string, images: string[]}}
     * @returns {Promise<void>}
     */
    static async patreon(params) {
        const {author, title, images = []} = params;
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const url = new URL(image);
            const [postId, imageId] = url.pathname.split('/').splice(5, 2);
            const ext = url.pathname.split('.').pop();
            const filename = [
                'Fansite-downloader',
                'patreon',
                `${author} - ${title}(${postId})`,
                `p${i + 1}_${imageId}.${ext}`,
            ].map((path) => this.#normalizePath(path)).join('/');
            await this.#download(image, filename);
        }
    }

    /**
     * @param params {{urls: string[], author: string, title: string}}
     * @returns {Promise<void>}
     */
    static async cien(params) {
        const {urls = [], author, title} = params;
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            await UtilityHelper.wait(100);
            const filename = new URL(url).pathname.split('/').pop();
            await browser.downloads.download({
                url,
                filename: `Fansite-downloader/ci-en/${author} - ${title}/p${i + 1}_${filename}`,
                conflictAction: 'uniquify',
                saveAs: false,
            });
        }
    }

    /**
     * @param url {string}
     * @param filename {string}
     * @returns {Promise<void>}
     */
    static async #download(url, filename) {
        const id = await browser.downloads.download({
            url,
            conflictAction: 'uniquify',
            filename,
            saveAs: false,
        });

        while(true) {
            const item = await browser.downloads.search({id});
            const finished = item.every((item) => item.state === 'complete');
            if (finished) {
                break;
            }
            await UtilityHelper.wait(100);
        }

    }

    /**
     * @param path {string}
     * @returns {string}
     */
    static #normalizePath(path) {
        return path
            .replaceAll('¥', '￥')
            .replaceAll('/', '／')
            .replaceAll(':', '：')
            .replaceAll('*', '＊')
            .replaceAll('?', '？')
            .replaceAll('"', '”')
            .replaceAll('<', '＜')
            .replaceAll('>', '＞')
            .replaceAll('|', '｜');
    }
}
