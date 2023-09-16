import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, DeviceEventEmitter, Animated, PanResponder } from "react-native";
import Browser from "../components/Browser/Browser";
import RenderSafeAreaView from "../components/Layout/RenderSafeAreaView";

const MainHome = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [isSplit, setIsSplit] = useState(true);
    const [splitContainer1Height, setSplitContainer1Height] = useState(300);
    const [splitContainer2Height, setSplitContainer2Height] = useState(500);

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

    return (
        <RenderSafeAreaView>
            <View style={styles.entire}>
                <View style={{ height: splitContainer1Height }}>
                    <Browser />
                </View>

                {isSplit && (
                    <View>
                        <View style={styles.grayBar} {...panResponder.panHandlers} />
                        <View style={{ height: splitContainer2Height }}>
                            <Browser />
                        </View>
                    </View>
                )}
            </View>
        </RenderSafeAreaView>
    )
}

const styles = StyleSheet.create({
    entire: {
        height: '100%',
        backgroundColor: 'white',
    },
    grayBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#206FE5',
    }
})

export default MainHome;
