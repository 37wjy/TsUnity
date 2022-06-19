import { UnityEngine } from "csharp";
import { Time } from "../Core/Common/Time";
import { Timer } from "../Core/Updater/Timer";
import { Updatable } from "../Core/Updater/Updatable";

UnityEngine.Debug.Log('hello world');

var go = UnityEngine.GameObject.Find('Cube');
let speed = 1;

export class Example extends Updatable{

    constructor(){
        super();
        console.log('init example main');
        this.enableUpdate(true);  //Updatable 继承痛点
    }

    protected update = ()=>{
        let newpos = new UnityEngine.Vector3(go.transform.position.x+speed*Time.deltaTime,go.transform.position.y,go.transform.position.z);
        go.transform.position = newpos;
        //console.log("move go ",go.transform.position.x);
    }

    static async sec1() {
        while (true) {
            await Timer.sleep(1000);
            console.log("sleep 1sec");
        }
    }
    static async sec15() {
        while (true) {
            await Timer.sleep(1500);
            console.log("sleep 1.5sec");
        }
    }
}
const example = new Example();



export class Example2 extends Updatable{

    constructor(){
        super();
        console.log('init example main');
        this.enableUpdate(true);  //目前痛点
    }

    protected update = ()=>{
        Example2.sec1();
        console.log("move go ",go.transform.position.x);
    }

    static async sec1() {
        await Timer.sleep(1000);
        console.log("sleep 1sec");
    }
    static async sec15() {
        while (true) {
            await Timer.sleep(1500);
            console.log("sleep 1.5sec");
        }
    }
}
new Example2();
//Example.sec1();
Example.sec15();