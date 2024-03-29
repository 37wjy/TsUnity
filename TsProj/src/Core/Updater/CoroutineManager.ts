import { List } from "../Common/List";
import { Singleton } from "../Common/Singleton";
import { Updatable } from "./Updatable";
import { UpdateManager } from "./UpdateManager";

export {}

class CoWrap {

    private func: Function;
    private resolv: Function;
    private reject: Function;
    public name: string;

    constructor(resolve: Function, reject:Function , func: Function, name: string) {
        this.func = func;
        this.resolv = resolve;
        this.reject = reject;
        this.name = name;
    }

    public Check() {
        return this.func()
    }

    public Complete() {
        this.resolv();
    }

    public Faild(){
        this.reject();
    }
}

function coCatch() {
    
}


class CoroutineManager extends Singleton<CoroutineManager> {

    private co_list: List<CoWrap>;
    private co_update_list: List<CoWrap>;
    private co_fixed_update_list: List<CoWrap>;
    private co_remove_list: List<CoWrap>;

    constructor() {
        super()
        let updateMgr = UpdateManager.Instance(UpdateManager);
        this.co_list = new List<CoWrap>();
        this.co_update_list = new List<CoWrap>();
        this.co_fixed_update_list = new List<CoWrap>();
        this.co_remove_list = new List<CoWrap>();
        updateMgr.addUpdate(CoroutineManager.Update)
    }

    static Update() {
        var com = CoroutineManager.Instance(CoroutineManager)
        com.co_update_list.forEach((co) => {
            if (co.Check()) {
                co.Complete();
                com.co_remove_list.push(co);
            }
            else {
                co.Faild();
                com.co_remove_list.push(co);
            } 
        })
        com.co_remove_list.forEach((co) => {
            com.co_update_list.remove(co);
        })
        com.co_remove_list.clear();
    }

    private appendUpdate(resolve: Function, reject:Function, condition: Function, name: string) {
        var tmp = new CoWrap(resolve, reject, condition, name);
        this.co_update_list.add(tmp);
    }

    public WaitWhile(condition: Function) {
        var resolve;
        var rej;
        var p = new Promise((resolve, rejected) => {
            this.appendUpdate(resolve, rejected, () => { return condition() != true; }, "test");
        });
        p.then(null,coCatch);
        return p;
    }

    
}


declare global{
    function WaitWhile(condition: Function):Promise<unknown>
}
globalThis.WaitWhile = (condition: Function)=>{
    return CoroutineManager.Instance(CoroutineManager).WaitWhile(condition);
}