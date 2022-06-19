import { JsUpdater } from "csharp";
import { List } from "../Common/List";
import { Singleton } from "../Common/Singleton";

class _event { // 看看能不能用原本的eventlister。。
    public name: string;
    private lock: boolean;
    private op_list: List<Function>;
    private event_list: List<Function>;
    constructor(name: string) {
        this.name = name;
        this.lock = false;
        this.op_list = new List<Function>();
        this.event_list = new List<Function>();
    }

    public tick() {
        this.lock = true;
        this.event_list.forEach(f => {
            f();       //TODO error
        });
        this.lock = false;

        this.op_list.forEach(f => {f();});
        this.op_list.clear();
    }

    public addListener(listener: Function) {
        console.log("add listener ");
        if (this.lock) {
            this.op_list.add(()=>{this.event_list.push(listener)});
        }
        else{
            this.event_list.push(listener);
        }
    }

    public removeListener(listener: Function) {
        if (this.lock) {
            this.op_list.add(()=>{this.event_list.remove(listener);});
        }
        else{
            this.event_list.remove(listener);
        }
    }

    public count(): number {
        return this.event_list.length;
    }

    public clear() {
        this.event_list = new List<Function>();
    }

}


export class UpdateManager extends Singleton<UpdateManager> {
    csUpdater: JsUpdater | undefined;
    private updateEvent: _event;
    private lateUpdateEvent: _event;
    private fixedUpdateEvent: _event;
    constructor() {
        super();
        this.updateEvent = new _event("update");
        this.fixedUpdateEvent = new _event("fixedUpdate");
        this.lateUpdateEvent = new _event("lateUpdate");
    }

    onUpdate() {
        this.updateEvent.tick();
    }

    onFixedUpdate() {
        this.fixedUpdateEvent.tick();
    }

    onLateUpdate() {
        this.lateUpdateEvent.tick();
    }

    addUpdate(listener: Function) {
        this.updateEvent.addListener(listener);
    }
    addFixedUpdate(listener: Function) {
        this.fixedUpdateEvent.addListener(listener);
    }
    addLateUpdate(listener: Function) {
        this.lateUpdateEvent.addListener(listener);
    }

    removeUpdate(listener: Function) {
        this.updateEvent.removeListener(listener);
    }

    removeFixedUpdate(listener: Function) {
        this.fixedUpdateEvent.removeListener(listener);
    }

    removeLateUpdate(listener: Function) {
        this.lateUpdateEvent.removeListener(listener);
    }
}
