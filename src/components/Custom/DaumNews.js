
//box_g box_rtnews _tesla_news_news  -> class

import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const DaumNews = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "box_g.box_rtnews._tesla_news_news", "class");

    return (
        <View>
            <WebView
                ref={WebViewRef}
                source={{ uri: 'https://daum.net' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>

            </WebView>
        </View>

    )
}

export default DaumNews