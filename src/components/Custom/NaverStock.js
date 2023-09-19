

//MM_search_stock id
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const NaverStock = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "MM_search_stock", "id");

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

export default NaverStock
