using Puerts;
using System.IO;
using System.Text;
using UnityEngine;

public class JsLoader : ILoader
{
    private string root = "";

    public JsLoader() { }

    public JsLoader(string root)
    {
        this.root = root;
    }

    public bool FileExists(string filepath)
    {

        return true;
    }

    public string ReadFile(string filepath, out string debugpath)
    {

#if UNITY_EDITOR
        var puertsDir = Path.Combine(Application.dataPath, "ScriptTs");
        var jsPath = Path.Combine(puertsDir, filepath);

        // Debug.Log("load "+jsPath);
        var txt = File.ReadAllText(jsPath);
        debugpath = jsPath.Replace("/", "\\");

        return txt;
#else
        // TODO
        debugpath = "";
        var jscache = JsManager.Instance.jscache;
        string jsName = filepath.Replace("puerts/", "");

        string txt;
        jscache.TryGetValue(jsName, out txt);

        if (txt == null) txt = "";
        return txt;
#endif
    }
}