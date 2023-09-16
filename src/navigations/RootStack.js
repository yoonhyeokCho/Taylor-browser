
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';



import GNB from './GNB';
import Splash from '../screen/Splash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RootNavigationRef } from './navigations';
import requestLoadingClose from '../actions/loading/requestLoadingClose';
import MainHome from '../screen/MainHome';
import MultiWindow from '../screen/MultiWindow';


const RootStack = () => {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer
            ref={RootNavigationRef}
            independent={true}
            onStateChange={(state)=>{
                requestLoadingClose();
                // cancelPreviousRequests();
            }}
        >
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ ...TransitionPresets.SlideFromRightIOS }} >
                <Stack.Screen
                    name={"Splash"}
                    component={Splash}
                    options={{
                        headerShown: false,
                        // header: (props) => <CustomHeader {...props} title={"Splash"} />
                    }}
                />
                <Stack.Screen 
                    name={"GNB"}
                    component={GNB}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name={"MainHome"}
                    component={MainHome}
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name={"MultiWindow"}
                    component={MultiWindow}
                    options={{ headerShown: true }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack;