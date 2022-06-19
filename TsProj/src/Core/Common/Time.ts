export class Time {
    private static _deltaTime:number=0;
    private static _fixedDeltaTime:number=0;
    private static _unscaledDeltaTime:number=0;

    public static get deltaTime() : number {
        return this._deltaTime;
    }
    
    public static get fixedDeltaTime() : number {
        return this._fixedDeltaTime;
    }

    public static get unscaledDeltaTime() : number {
        return this._unscaledDeltaTime;
    }

    static setDeltaTime(time:number){
        this._deltaTime = time;
    }

    static setFixedDeltaTime(time:number){
        this._fixedDeltaTime = time;
    }

    static setUnscaledDeltaTime(time:number){
        this._unscaledDeltaTime = time;
    }
}