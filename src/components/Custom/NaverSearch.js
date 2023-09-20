//sch  ->  class

import React, { useState, useEffect, useRef } from "react";
import { View} from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";

const NaverSearch = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "sch", "class");

    return (
        <View>
            <WebView
                ref={WebViewRef}
                source={{ uri: 'https://naver.com' }}
                javaScriptEnabled={true}
                domStorageEnabled={true}>

            </WebView>
        </View>

    )
}

export default NaverSearch
