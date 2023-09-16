
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';



import GNB from './GNB';
import RacgooTest from "../screen/RacgooTest";
import Splash from '../screen/Splash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RootNavigationRef } from './navigations';
import requestLoadingClose from '../actions/loading/requestLoadingClose';
import MainHome from '../screen/MainHome';
import JIHO from '../screen/JH';


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
                    name={"JIHO"}
                    component={JIHO}
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name={"RacgooTest"}
                    component={RacgooTest}
                    options={{ headerShown: true }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack;