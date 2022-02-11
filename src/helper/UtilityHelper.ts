export class UtilityHelper {
    static async wait(time: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(() => resolve(), time));
    }
}
