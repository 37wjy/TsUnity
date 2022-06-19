using Puerts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;
public class JsManager : MonoSingleton<JsManager>
{
    private JsEnv jsEnv = null;
    private JsUpdater _jsUpdater = null;

    public Dictionary<string, string> jscache = new Dictionary<string, string>();

    public string entry = "/Demo/Example";
    public Action JsOnApplicationQuit;
    public Action JsOnDispose;

    protected override void Init()
    {
        base.Init();
        this.InitJsEnv();
    }

    private void initUpdater()
    {
        if (jsEnv == null) return;
        _jsUpdater = gameObject.GetComponent<JsUpdater>();
        if (_jsUpdater == null)
        {
            _jsUpdater = gameObject.AddComponent<JsUpdater>();
        }
        _jsUpdater.OnInit(jsEnv);
    }

    public JsEnv GetJsEnv()
    {
        return jsEnv;
    }

    void InitJsEnv()
    {
        //调试端口：8080
        jsEnv = new JsEnv(new JsLoader(), 8080);
        if (jsEnv == null)
        {
            Debug.Log("InitJsEnv null!!!");
        }

        //声明Action： 值类型才需要这样添加
        jsEnv.UsingAction<float>();
        jsEnv.UsingAction<float, float>();
        jsEnv.UsingAction<string, byte[]>();
    }

    public void StartGame()
    {
        if (jsEnv != null)
        {
            try
            {
                jsEnv.Eval(String.Format( @"require('{0}')",entry));
            }
            catch (Exception e)
            {
                Debug.Log(e.ToString());
            }
        }
    }


    public void OnStart()
    {
        StartGame();
        initUpdater();
    }

    private void Update()
    {
        jsEnv?.Tick();
    }

    public void Restart()
    {
        Dispose();
        InitJsEnv();
        StartGame();
    }

    private void OnApplicationQuit()
    {
        if (jsEnv != null)
        {
            JsOnApplicationQuit?.Invoke();
        }
    }

    public override void Dispose()
    {
        base.Dispose();
        JsOnDispose?.Invoke();

        if (jsEnv != null)
        {
            try
            {
                jsEnv.Dispose();
                jsEnv = null;
            }
            catch (Exception ex)
            {
                string msg = string.Format("js exception : {0}\n {1}", ex.Message, ex.StackTrace);
                Debug.Log(msg);
            }
        }
    }
}

