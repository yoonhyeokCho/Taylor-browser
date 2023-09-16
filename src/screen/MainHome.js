import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, DeviceEventEmitter } from "react-native";
import Browser from "../components/Browser/Browser";
import RenderSafeAreaView from "../components/Layout/RenderSafeAreaView";

const MainHome = () => {
    //newScreenValue = true 면 브라우저 추가, false면 구글 화면 추가

    const [isSplit, setIsSplit] = useState(true);

    useEffect(() => {
        console.log('booleanValue2 changed:', isSplit);
        DeviceEventEmitter.addListener("splitView",(isSplit) => {
            setIsSplit(isSplit);
        });
    }, []);

    return (
        <RenderSafeAreaView>
            <View style={styles.entire}>
                <View style={isSplit ? styles.splitContainer1 : styles.fullContainer}>
                    <Browser />
                </View>

                {isSplit && (
                    <View>
                        <View style={styles.grayBar} />
                        <View style={styles.splitContainer2}>
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
        backgroundColor: 'yellow',
    },
    fullContainer: {
        height: 750,
        backgroundColor: 'green',
    },
    splitContainer1: {
        height: 300,
        backgroundColor: 'green',
    },
    splitContainer2: {
        height: 500,
        backgroundColor: 'white',
    },
    grayBar: {
        width: '100%',
        height: 10,
        backgroundColor: 'gray',
    }
})

export default MainHome;