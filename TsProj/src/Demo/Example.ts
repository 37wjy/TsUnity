import { UnityEngine } from "csharp";
import { Time } from "../Core/Common/Time";
import { Timer } from "../Core/Updater/Timer";
import { Updatable } from "../Core/Updater/Updatable";

const Vector3 = UnityEngine.Vector3;
const Quaternion = UnityEngine.Quaternion;

UnityEngine.Debug.Log('hello world');

var go = UnityEngine.GameObject.Find('Cube');

export class Example extends Updatable {

    constructor() {
        super();
        console.log('init example main');
        this.enableUpdate(true);  //Updatable 继承痛点
    }

    protected update = () => {
        let curRot = go.transform.eulerAngles;
        let delta = Time.deltaTime * 30;
        let newAngle = new Vector3(curRot.x + delta, curRot.y + delta, 0);
        go.transform.eulerAngles = newAngle;
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



export class Example2 extends Updatable {

    constructor() {
        super();
        console.log('init example main');
        this.enableUpdate(true);  //目前痛点
    }

    protected update = () => {
        Example2.sec1();
        console.log("rot go ", go.transform.rotation);
    }

    static async sec1() {
        await Timer.sleep(1000);
        console.log("sleep 1sec");
    }
    static async sec15() {
        for (let index = 0; index < 10; index++) {
            await Timer.sleep(1500);
            console.log("sleep 1.5sec");
        }
    }
}
new Example2();
//Example.sec1();
Example2.sec15();