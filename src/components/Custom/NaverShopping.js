// comp_now_player comp_card  -> class 


import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const NaverShopping = () => {
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

export default NaverShopping