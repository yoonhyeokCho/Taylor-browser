import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../../hooks/useRemoveExcept";


const DaumSearch = () => {
    const WebViewRef = useRef();
    const [isDisplay,setIsDisplay] = useState(false);
    const [loadFinish,setLoadFinish] = useState(false);
    useEffect(()=>{
        if(loadFinish){
            useRemoveExcept(WebViewRef, "d_sch", "class");
            setTimeout(()=>{
                setIsDisplay(true);
            },500);
        }
    },[loadFinish])
    

    return (
        <View style={{height: 48, width: "100%", position: "relative", opacity: isDisplay ? 1 : 0}} >
            <WebView
                scrollEnabled={false}
                onLoadEnd={()=>{setLoadFinish(true)}}
                style={{width: "100%"}}
                ref={WebViewRef}
                source={{ uri: 'https://daum.net' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>
            
            </WebView>
        </View>

    )
}

export default DaumSearch;