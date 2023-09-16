import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const MainHome = () => {
    //newScreenValue = true 면 브라우저 추가, false면 구글 화면 추가
    const [state, setState] = useState({
        newScreenType: false,
        isSplit: true,
    });
    
    useEffect(() => {
        console.log('booleanValue1 changed:', state.booleanValue1);
    }, [state.newScreenType]);

    useEffect(() => {
        console.log('booleanValue2 changed:', state.booleanValue2);
    }, [state.isSplit]);

    return (

        <View style={styles.entire}>
            <View style={state.isSplit ? styles.splitContainer1 : styles.fullContainer}>
                <Text>New Screen: Browser</Text>
                <Text>New Screen: Browser</Text>
                <Text>New Screen: Browser</Text>
            </View>

            {state.isSplit && (
                state.newScreenType ? (
                <View>
                    <View style={styles.grayBar}/>
                    <View style={styles.splitContainer2}>
                        <Text>New Screen: Browser</Text>
                    </View>
                </View>
                    
                ) : (
                    <View>
                        <View style={styles.grayBar}/>
                        <View style={styles.splitContainer2}>
                            <Text>New Screen: Google</Text>
                        </View>
                    </View>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    entire: {
        height : '100%',
        backgroundColor:'yellow',
    },
    fullContainer:{
        height : 750,
        backgroundColor:'green',
    },
    splitContainer1:{
        height : 300,
        backgroundColor:'green',
    },
    splitContainer2:{
        height : 500,
        backgroundColor:'white',
    },
    grayBar: {
        width: '100%', 
        height: 10, 
        backgroundColor: 'gray', 
    }
})

export default MainHome;