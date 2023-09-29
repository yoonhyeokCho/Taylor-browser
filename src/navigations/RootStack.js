
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';



import GNB from './GNB';
import RacgooTest from "../screen/RacgooTest";
import Splash from '../screen/Splash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getRootNavigation, RootNavigationRef } from './navigations';
import requestLoadingClose from '../actions/loading/requestLoadingClose';
import MainHome from '../screen/MainHome';
import JIHO from '../screen/JH';
import Extension from '../screen/Extension';
import GPT from '../screen/GPT';
import CustomPage from '../screen/CustomPage';
import CustomPageModify from '../screen/CustomPageModify';
import { Pressable, Text } from 'react-native';


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
                    name={"Extension"}
                    component={Extension}
                    options={{ 
                        headerShown: false , 
                        gestureEnabled: true,
                        gestureDirection: "vertical",
                        // cardStyleInterpolator: BackAnimation,
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        presentation: "transparentModal",
                    }} 
                />
                <Stack.Screen 
                    name={"GPT"}
                    component={GPT}
                    options={{ 
                        headerShown: false , 
                        gestureEnabled: true,
                        gestureDirection: "vertical",
                        // cardStyleInterpolator: BackAnimation,
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        presentation: "transparentModal",
                    }} 
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
                <Stack.Screen 
                    name={"CustomPage"}
                    component={CustomPage}
                    options={{ 
                        headerShown: true,
                        headerTitle: <Text>CustomPage</Text>,
                        headerRight: () => (
                          <Pressable
                            onPress={() => {
                                getRootNavigation().navigate('CustomPageModify',{});
                            }}
                          >
                            <Text style={{marginRight: 10}} >
                                편집
                            </Text>
                          </Pressable>
                        ),
                    }} 
                />
                <Stack.Screen 
                    name={"CustomPageModify"}
                    component={CustomPageModify}
                    options={{ headerShown: true }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack;