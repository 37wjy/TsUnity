import { UpdateManager } from "./UpdateManager";

export class Updatable {
    private update_handle:Function|undefined;
    private lateupdate_handle:Function|undefined;
    private fixedupdate_handle:Function|undefined;

    protected update:Function|undefined;
    protected lateUpdate:Function|undefined;
    protected fixedUpdate:Function|undefined;

    constructor() {

    }

    public enableUpdate(enable:boolean) {
        this.stopUpdate();
        if (enable) {
            this.startUpdate();
        }
    }

    protected startUpdate() {
        //看看怎么自动调用好了 
        console.log("start update");
        let updateMgr = UpdateManager.Instance(UpdateManager);
        if (this.update) {
            this.update_handle = this.update;
            updateMgr.addUpdate(this.update_handle);
        }
        if (this.lateUpdate) {
            this.lateupdate_handle = this.lateUpdate;
            updateMgr.addLateUpdate(this.lateupdate_handle);
        }
        if (this.fixedUpdate) {
            this.fixedupdate_handle = this.fixedUpdate;
            updateMgr.addFixedUpdate(this.fixedupdate_handle);
        }
    }

    protected stopUpdate() {
        let updateMgr = UpdateManager.Instance(UpdateManager);
        if (this.update_handle) {
            updateMgr.removeUpdate(this.update_handle);
            this.update_handle = undefined;
        }
        if (this.lateupdate_handle) {
            updateMgr.removeLateUpdate(this.lateupdate_handle);
            this.lateupdate_handle = undefined;
        }
        if (this.fixedupdate_handle) {
            updateMgr.removeFixedUpdate(this.fixedupdate_handle);
            this.fixedupdate_handle = undefined;
        }
    }
    
}