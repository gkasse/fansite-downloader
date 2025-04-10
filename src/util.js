export class UtilityHelper {
    /**
     * @param time {number} milliseconds to wait
     * @returns {Promise<void>}
     */
    static async wait(time) {
        return new Promise(resolve => setTimeout(() => resolve(), time));
    }
}
