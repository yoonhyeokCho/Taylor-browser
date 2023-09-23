import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../../hooks/useRemoveExcept";
const DaumNews = () => {
    const WebViewRef = useRef();
    const [isDisplay,setIsDisplay] = useState(false);
    const [loadFinish,setLoadFinish] = useState(false);
    useEffect(()=>{
        if(loadFinish){
            useRemoveExcept(WebViewRef, 'box_g.box_rtnews._tesla_news_news', "class");
            setTimeout(()=>{
                setIsDisplay(true);
            },200);
        }
    },[loadFinish])
    

    return (
        <View style={{height: 600, width: "100%", position: "relative", opacity: isDisplay ? 1 : 0}} >
            <WebView
                onLoadEnd={()=>{setLoadFinish(true)}}    
                style={{width: "100%"}}
                ref={WebViewRef}
                source={{ uri: 'https://m.daum.net/' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>

            </WebView>
        </View>

    )
}

export default DaumNews;


