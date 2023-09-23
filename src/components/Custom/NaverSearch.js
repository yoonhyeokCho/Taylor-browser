import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../../hooks/useRemoveExcept";
import { getRootNavigation } from "../../navigations/navigations";


const NaverSearch = () => {
    const WebViewRef = useRef();
    const [isDisplay,setIsDisplay] = useState(false);
    const [loadFinish,setLoadFinish] = useState(false);
    useEffect(()=>{
        if(loadFinish){
            useRemoveExcept(WebViewRef, "sch", "class");
            setTimeout(()=>{
                setIsDisplay(true);
            },200);
        }
    },[loadFinish])
    

    return (
        <View style={{height: 52, width: "100%", position: "relative", opacity: isDisplay ? 1 : 0}} >
            <WebView
                onNavigationStateChange={(state)=>{
                    loadFinish &&
                    getRootNavigation().reset({routes: [{name: 'MainHome', params: {url: state.url}}]})
                }}
                scrollEnabled={false}
                onLoadEnd={()=>{setLoadFinish(true)}}    
                style={{width: "100%"}}
                ref={WebViewRef}
                source={{ uri: 'https://naver.com' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>
            </WebView>
        </View>

    )
}

export default NaverSearch;