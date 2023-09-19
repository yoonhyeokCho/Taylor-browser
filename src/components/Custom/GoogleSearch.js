//Gwkg9c  -> class

import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const GoogleSearch = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "Gwkg9c", "class");

    return (
        <View>
            <WebView
                ref={WebViewRef}
                source={{ uri: 'https://google.com' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>

            </WebView>
        </View>

    )
}

export default GoogleSearch