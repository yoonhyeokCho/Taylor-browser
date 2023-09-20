//daumTotalSearchLayer  ->  class

import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const DaumSearch = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "daumTotalSearchLayer", "class");

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

export default DaumSearch