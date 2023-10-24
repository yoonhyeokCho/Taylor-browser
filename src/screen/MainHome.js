import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, DeviceEventEmitter, Animated, PanResponder } from "react-native";
import WebView from 'react-native-webview';
import Browser from "../components/Browser/Browser";
import { useRemoveExcept } from "../hooks/useRemoveExcept";
import { useRoute } from "@react-navigation/native";

const MainHome = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const WebViewRef1 = useRef(null);
    const WebViewRef2 = useRef(null);
    const [isSplit, setIsSplit] = useState(true);
    const [splitContainer1Height, setSplitContainer1Height] = useState(300);
    const [splitContainer2Height, setSplitContainer2Height] = useState(500);
    const params = useRoute().params;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (e, gesture) => {
            const newHeight1 = Math.max(100, splitContainer1Height + gesture.dy);
            const newHeight2 = Math.max(100, splitContainer2Height - gesture.dy);

            setSplitContainer1Height(newHeight1);
            setSplitContainer2Height(newHeight2);
        },

        onPanResponderRelease: () => {
            pan.flattenOffset();
        },
    });

    useEffect(() => {
        console.log('booleanValue2 changed:', isSplit);
        DeviceEventEmitter.addListener("splitView", (isSplit) => {
            setIsSplit(isSplit);
        });
    }, []);

    useEffect(() => {
        if (isSplit) {
            setSplitContainer1Height(300);
            setSplitContainer2Height(500);
        }else{
            setSplitContainer1Height("100%");
        }
    }, [isSplit]);

    useRemoveExcept(WebViewRef1, "MM_HOME_SEARCH_WEATHER", "id");

    return (
        <View style={styles.entire}>
    
            {/* <WebView
                ref={WebViewRef}
                source={{ uri: params?.url ?? 'https://naver.com' }}
                javaScriptEnabled ={true}
                domStorageEnabled = {true}
            /> */}
            <View style={{width: "100%", height: splitContainer1Height}} >
                <Browser 
                    ref={WebViewRef1}
                    uri={ params?.url ?? 'https://naver.com'}
                />
            </View>
            {isSplit && (
                <View>
                    <View style={styles.grayBar} {...panResponder.panHandlers} />
                    <View style={{ height: splitContainer2Height }}>
                        <Browser 
                            webViewRef={WebViewRef2}
                        />
                    </View>
                </View>
            )}
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    entire: {
        flex: 1,
        backgroundColor: 'white',
    },
    grayBar: {
        width: '100%',
        height: 20,
        backgroundColor: 'green',
    },
});

export default MainHome;
