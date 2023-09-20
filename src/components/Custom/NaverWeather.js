//MM_HOME_SEARCH_WEATHER id

import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import WebView from 'react-native-webview';
import { useRemoveExcept } from "../hooks/useRemoveExcept";


const NaverWeather = () => {
    const WebViewRef = useRef();

    useRemoveExcept(WebViewRef, "MM_HOME_SEARCH_WEATHER", "id");

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

export default NaverWeather