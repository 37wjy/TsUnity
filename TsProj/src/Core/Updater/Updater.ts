import { JsUpdater } from "csharp";
import { Singleton } from "../Common/Singleton";
import { Time } from "../Common/Time";
import { UpdateManager } from "./UpdateManager";


export class Updater extends Singleton<Updater> {
    csUpdater:JsUpdater | undefined ;
    updateMgr:UpdateManager;
    constructor() {
        super();
        this.updateMgr = UpdateManager.Instance(UpdateManager);
    }

    public bindUpdater(bindTo:JsUpdater){
        this.csUpdater = bindTo;
        this.csUpdater.JsUpdate = (deltaTime,unscaledDeltaTime) => this.onUpdate(deltaTime,unscaledDeltaTime);
        this.csUpdater.JsFixedUpdate = (fixedDeltaTime) => this.onFixedUpdate(fixedDeltaTime);
        this.csUpdater.JsLateUpdate = () => this.onLateUpdate();
        this.csUpdater.JsOnDestroy = () => this.onDestroy();
    }

    onUpdate(deltaTime:number, unscaledDeltaTime:number) {
        Time.setDeltaTime(deltaTime);
        Time.setUnscaledDeltaTime(unscaledDeltaTime);
        this.updateMgr.onUpdate();
    }
    
    onFixedUpdate(fixedDeltaTime:number) {
        //console.log('onFixedUpdate...',fixedDeltaTime);
        this.updateMgr.onFixedUpdate();
    }

    onLateUpdate() {
        //console.log('onLateUpdate...');
        this.updateMgr.onLateUpdate();
    }
    
    onDestroy() {
        console.log('onDestroy...');
    }

}

exports.init = function(bindTo: JsUpdater) {
    Updater.Instance(Updater).bindUpdater(bindTo);
}