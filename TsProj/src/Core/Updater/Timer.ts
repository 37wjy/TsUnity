export class Timer {
    constructor() {

    }

    /**
     * sleep
     * sleep for seconds
     */
    public static async sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(''); }, ms);
        });
    }

    public static async waitForUpdate() {
        //jsenv.tick会调用 也可以通过绑定uodater
        return new Promise(
            (resolve) => { setInterval(() => { resolve(''); }) }
        )
    }

    public static async waitForFixedUpdate() {

    }

    public static async waitForLateUpdate() {

    }

    public static async waitForFrames(frames: number) {
    }

    public static async waitForFixedFrames(frames: number) {

    }
}