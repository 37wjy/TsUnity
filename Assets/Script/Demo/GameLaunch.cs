using UnityEngine;

public class GameLaunch : MonoSingleton<GameLaunch>
{

    public GameObject launchPageGO;

    void Start()
    {
        //TODO regist && res
        Debug.Log("js start");
        JsManager.Instance.OnStart();
    }
}
