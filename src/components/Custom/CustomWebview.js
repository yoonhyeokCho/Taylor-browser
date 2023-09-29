import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";

import { useRemoveExcept } from "../../hooks/useRemoveExcept";
import { getRootNavigation } from "../../navigations/navigations";
import WebView from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";

const CustomWebview = ({
    uri,
    targetCss,
    cssType,
    rootCss,
    height= "100%",
    scrollEnabled = false
}) => {
    const origin = uri.match(/^https?:\/\/[^/]+/)[0];
    const path = uri.split('?')[0].replace(origin, '');
    const WebViewRef = useRef();
    const [isDisplay,setIsDisplay] = useState(false);
    const [loadFinish,setLoadFinish] = useState(false);
    const [loadOffset,setLoadOffset] = useState((new Date().getTime())+5000);
    const [reloadCount,setReloadCount] = useState(0);
    useEffect(()=>{
        if(loadFinish){
            setTimeout(()=>{
                useRemoveExcept(WebViewRef, targetCss, cssType, rootCss);
                setTimeout(()=>{
                    setIsDisplay(true);
                    setLoadOffset(new Date().getTime()+2000);
                },100)
            },1000);
        }
    },[loadFinish]);

    
    // console.log(uri)
    // console.log(path)
    // console.log(origin)
    const whiteListPathList = [
        "/#sbfbu=1&pi="
    ]
    
    return (
        <View style={{height: height, width: "100%", position: "relative", opacity: isDisplay ? 1 : 0}} >
            <WebView
                onNavigationStateChange={(state)=>{
                    const stateOrigin = state.url.match(/^https?:\/\/[^/]+/)[0];
                    const statePath = state.url.split('?')[0].replace(stateOrigin, '');
                    if(loadFinish  && whiteListPathList.indexOf(statePath)==-1 ){
                        if(stateOrigin === origin){
                            if(state.url == uri)return;
                        }
                        console.log(statePath, "path",state.url, uri)
                        console.log(loadFinish , whiteListPathList.indexOf(statePath)==-1 )
                        getRootNavigation().reset({routes: [{name: 'MainHome', params: {url: state.url}}]})
                    }
                }}
                scrollEnabled={scrollEnabled}
                onLoadEnd={()=>{setLoadFinish(true)}}    
                style={{width: "100%"}}
                ref={WebViewRef}
                source={{ uri: uri }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>
            </WebView>
        </View>

    )
}

export default CustomWebview;