/*
 * Tencent is pleased to support the open source community by making InjectFix available.
 * Copyright (C) 2019 THL A29 Limited, a Tencent company.  All rights reserved.
 * InjectFix is licensed under the MIT License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms. 
 * This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
 */

using System.Collections.Generic;
using Puerts;
using System;
using UnityEngine;

//1、配置类必须打[Configure]标签
//2、必须放Editor目录
[Configure]
public class PuretsConfig
{
    [Binding]
    static IEnumerable<Type> Bindings
    {
        get
        {
            return new List<Type>()
            {
                typeof(Debug),
                typeof(Vector2),
                typeof(Vector3),
                typeof(Quaternion),
                typeof(List<int>),
                typeof(Dictionary<string, List<int>>),
                typeof(Time),
                typeof(Transform),
                typeof(RectTransform),
                typeof(Component),
                typeof(GameObject),
                typeof(UnityEngine.Object),
                typeof(Delegate),
                typeof(System.Object),
                //typeof(Type),
                typeof(ParticleSystem),
                typeof(Canvas),
                typeof(RenderMode),
                typeof(ScriptableObject),
                typeof(Behaviour),
                typeof(MonoBehaviour),

                typeof(UnityEngine.EventSystems.UIBehaviour),
                typeof(UnityEngine.UI.Selectable),
                typeof(UnityEngine.UI.Button),
                typeof(UnityEngine.UI.Button.ButtonClickedEvent),
                typeof(UnityEngine.Events.UnityEvent),
                typeof(UnityEngine.UI.InputField),
                typeof(UnityEngine.UI.Toggle),
                typeof(UnityEngine.UI.Toggle.ToggleEvent),
                typeof(UnityEngine.Events.UnityEvent<bool>),

                typeof(JsUpdater),

                typeof(System.Text.Encoding),

                typeof(object),
                typeof(UnityEngine.Object),
                typeof(AsyncOperation),
                typeof(Ray2D),
                typeof(GameObject),
                typeof(Component),
                typeof(Behaviour),
                typeof(Transform),
                typeof(Resources),
                typeof(TextAsset),
                typeof(Keyframe),
                typeof(AnimationCurve),
                typeof(AnimationClip),
                typeof(Animation),
                typeof(Animator),
                typeof(Camera),
                typeof(Screen),
                typeof(ScreenOrientation),
                typeof(MonoBehaviour),
                typeof(ParticleSystem),
                typeof(SkinnedMeshRenderer),
                typeof(Renderer),
                typeof(TrailRenderer),
                typeof(System.Text.Encoding),
                typeof(List<int>),
                typeof(Action<string>),
                typeof(Debug),
                typeof(Delegate),
                typeof(SystemInfo),
                typeof(UnityEngine.Events.UnityEvent),
            
                // unity结合lua，这部分导出很多功能在lua侧重新实现，没有实现的功能才会跑到cs侧
                typeof(Bounds),
                typeof(Color),
                typeof(LayerMask),
                typeof(Mathf),
                typeof(Plane),
                typeof(Quaternion),
                typeof(Ray),
                typeof(RaycastHit),
                typeof(Time),
                typeof(Touch),
                typeof(TouchPhase),
                typeof(Vector2),
                typeof(Vector3),
                typeof(Vector4),
                
                // 渲染
                typeof(RenderMode),
                typeof(RuntimePlatform),
                typeof(LineRenderer),
                typeof(Canvas),
                typeof(Rect),
                typeof(RectTransform),
                typeof(RectOffset),
                typeof(Sprite),
        
                typeof(SpriteRenderer),
                typeof(CanvasGroup),
                typeof(SpriteMask),
                
                // UGUI
                typeof(UnityEngine.UI.CanvasScaler),
                typeof(UnityEngine.UI.CanvasScaler.ScaleMode),
                typeof(UnityEngine.UI.CanvasScaler.ScreenMatchMode),
                typeof(UnityEngine.UI.GraphicRaycaster),
                typeof(UnityEngine.UI.Text),
                typeof(UnityEngine.UI.InputField),
                typeof(UnityEngine.UI.Button),
                typeof(UnityEngine.UI.Image),
                typeof(UnityEngine.UI.ScrollRect),
                typeof(UnityEngine.UI.Scrollbar),
                typeof(UnityEngine.UI.Toggle),
                typeof(UnityEngine.UI.ToggleGroup),
                typeof(UnityEngine.UI.Button.ButtonClickedEvent),
                typeof(UnityEngine.UI.ScrollRect.ScrollRectEvent),
                typeof(UnityEngine.UI.GridLayoutGroup),
                typeof(UnityEngine.UI.ContentSizeFitter),
                typeof(UnityEngine.UI.Slider),
                
                // 场景、资源加载
                typeof(ResourceRequest),
                typeof(UnityEngine.SceneManagement.SceneManager),
        
        
                // 其它
                typeof(PlayerPrefs),
                typeof(GC),
        
                typeof(Physics),
                typeof(Physics2D),
            };
        }
    }

    [BlittableCopy]
    static IEnumerable<Type> Blittables
    {
        get
        {
            return new List<Type>()
            {
                //打开这个可以优化Vector3的GC，但需要开启unsafe编译
                //typeof(Vector3),
            };
        }
    }

    [Filter]
    static bool FilterMethods(System.Reflection.MemberInfo mb)
    {
        // 排除 MonoBehaviour.runInEditMode, 在 Editor 环境下可用发布后不存在
        if (mb.DeclaringType == typeof(MonoBehaviour) && mb.Name == "runInEditMode")
        {
            return true;
        }
        return false;
    }
}
