using System;
using System.Collections.Generic;
using System.Diagnostics;
using UnityEngine;
using Puerts;


public delegate void ModuleInit(JsUpdater monoBehaviour);


public class JsUpdater : MonoBehaviour
{
    public string ModuleName = "Core/Updater/Updater";//可配置加载的js模块

    public Action JsStart;
    public Action<float, float> JsUpdate;
    public Action<float> JsFixedUpdate;
    public Action JsLateUpdate;
    public Action JsOnDestroy;

    static JsEnv jsEnv;


#if UNITY_EDITOR
#pragma warning disable 0414
    // performence 
    [SerializeField]
    long updateElapsedMilliseconds = 0;
    [SerializeField]
    long lateUpdateElapsedMilliseconds = 0;
    [SerializeField]
    long fixedUpdateElapsedMilliseconds = 0;
#pragma warning restore 0414
    Stopwatch sw = new Stopwatch();
#endif


    public void OnInit(JsEnv env)
    {
        jsEnv = env;
        this.Restart();
    }

    public void Restart()
    {
        Logger.Log("updater start");
        var init = jsEnv.Eval<ModuleInit>("const jsUpdater = require('" + ModuleName + "'); jsUpdater.init;");
        if (init != null) init(this); // Js Construct;
        else Logger.LogError("updater null!!!");
    }

    private void OnEnable()
    {
    }

    private void OnDisable()
    {
        if (JsOnDestroy != null) JsOnDestroy();
    }

    void Start()
    {
        if (JsStart != null) JsStart();
    }

    void Update()
    {
        if (JsUpdate != null)
        {
#if UNITY_EDITOR
            var start = sw.ElapsedMilliseconds;
#endif
            try
            {
                JsUpdate(Time.deltaTime, Time.unscaledDeltaTime);
            }
            catch (Exception ex)
            {
                Logger.LogError("JsUpdate err : " + ex.Message + "\n" + ex.StackTrace);
            }
#if UNITY_EDITOR
            updateElapsedMilliseconds = sw.ElapsedMilliseconds - start;
#endif
        }

    }

    void FixedUpdate()
    {

        if (JsFixedUpdate != null)
        {
#if UNITY_EDITOR
            var start = sw.ElapsedMilliseconds;
#endif
            try
            {
                JsFixedUpdate(Time.fixedDeltaTime);
            }
            catch (Exception ex)
            {
                Logger.LogError("JsFixedUpdate err : " + ex.Message + "\n" + ex.StackTrace);
            }
#if UNITY_EDITOR
            fixedUpdateElapsedMilliseconds = sw.ElapsedMilliseconds - start;
#endif
        }
    }

    void LateUpdate()
    {
        if (JsLateUpdate != null) JsLateUpdate();
    }

    void OnDestroy()
    {
        JsStart = null;
        JsUpdate = null;
        JsFixedUpdate = null;
        JsLateUpdate = null;
        JsOnDestroy = null;
    }

}