import { browser } from 'webextension-polyfill-ts';


export class Notificator {

    private static readonly DEFAULT_NOTIFICATION_OPTION = {
        title: 'Fansiteダウンローダー',
        iconUrl: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAC43bD/tNqq/7zesv+837L/t9us/6jTmP+l0pT/pdKU/6fTl//B4bn/9Prz//////////7//f79////////////w+K9/3y+ZP9QqC7/WKw4/1WqNP9tt1X/g8Ju/4TCb/94vGH/YrFG/1+vQf+TyoH/4vHe///////9/v3///////////+y2KT/Uqkw/1WqM/+g0JD///////3+/f////7///////X69P+02qj/VKkz/1erNv+937P///////7+/v//////stml/1GoL/9VqjT/ut2w///////8/fv//v/+///////+/v3//////9br0f9brTv/Uqkw/8zmxf///////////7PZpv9RqC7/V6s2/7/gtv///////P78/////////////v/+//v9+v//////nc6M/0ulJ/9yuVj/+v36//////+z2ab/Uagu/1aqNf++37X///////3+/P/////////////////9/vz//////8Phu/9Xqzb/V6s1/7zes///////s9mm/1GoLv9Wqzb/v9+1///////9/vz//////////////////v7+///////f8Nv/YLBB/1KpL/+ZzYf//////7PZpv9RqC7/Vqs2/7/ftv///////f78//////////////////7//v//////9fr0/2azR/9UqTH/hsNx//////+z2ab/Uagu/1arNf+/4LX///////3+/P/////////////////9/v3//////9rt1v9drj7/Vqoz/4TCcP//////s9mm/1GnLv9Xqzb/v9+2///////9/vz//////////////////P78//////+326z/U6ky/1arNP+Vy4P//////7PZpv9RqC7/V6s2/7/gtv///////f78/////////////v7+//7+/v/+/v7/e71j/1erNf9WqzX/vN6y//////+z2ab/Uagu/1arNv+937T///////v9+v/9/vz//P78//7+/f//////sNik/1erNv9WqjT/dbtc//z+/P//////tNqn/1GoL/9YrDf/weG4///////9/vz////////////8/v3/rNae/1utOv9VqjL/W608/9ns1P///////////63Wn/9Npin/VKox/5zPjf/l8+P/1OvP/8TivP+m05f/a7ZQ/0ijI/9RqTD/c7pa/9fs0v///////f79/6vWnP94vGH/abRN/2u1UP9ptE3/abRM/2ezSf9kskj/YLBC/3G4WP+azYj/w+K7//r9+f///////f79///////q9OX/9Pry//j79//3+/b/+Pv3//X68//1+vP/+Pv3//r9+v/8/vz///////////////7//f79////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    };

    static async start(url: string) {
        await browser.notifications.create(url, {
            ...Notificator.DEFAULT_NOTIFICATION_OPTION,
            type: 'basic',
            message: '画像のダウンロードを始めます',
            contextMessage: url,
        });
    }

    static async end(url: string) {
        await browser.notifications.create(url, {
            ...Notificator.DEFAULT_NOTIFICATION_OPTION,
            type: 'basic',
            message: '画像のダウンロードが完了しました',
            contextMessage: url,
        });
    }
}
