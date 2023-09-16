//react
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';

//components

//navigation
import { NavigationContainer, useNavigation,useNavigationContainerRef } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Layout
import { getStatusBarHeight } from 'react-native-safearea-height';



//Screen

//recoil


import Home from '../screen/GNB/Home';
import Home2 from '../screen/GNB/Home2';
import Home3 from '../screen/GNB/Home3';
import More from '../screen/GNB/More';

import { GNBNavigationRef, getGNBNavigation } from './navigations';

import CustomHeader from '../components/Header/CustomHeader';
import CustomTabBar from '../components/TabBar/CustomTabBar';
import requestLoadingClose from '../actions/loading/requestLoadingClose';

const GNB = ({navigation, route}) => {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer 
        ref={GNBNavigationRef} 
        independent={true} 
        onStateChange={(state)=>{
          requestLoadingClose();
      }}
      >
        <Tab.Navigator 
          initialRouteName={route?.params?.initialRouteName ?? "Home"} 
          backBehavior="none"   
          tabBar={(props) => <CustomTabBar {...props} />}
        >
              <Tab.Screen 
                name={"Home"}  
                component={Home}   
                options={{
                    header: (props) => <CustomHeader {...props} title={"홈"}  />,
                    tabBarLabel: 'Home',
                    iconName: 'home'
                }}
            /> 
              <Tab.Screen 
                name={"Home2"}  
                component={Home2} 
                options={{
                    header: (props) => <CustomHeader {...props} title={"홈2"}  />,
                    tabBarLabel: 'Home',
                    iconName: 'home'
                }}
            /> 
            <Tab.Screen 
                name={"Home3"}  
                component={Home3} 
                options={{
                    header: (props) => <CustomHeader {...props} title={"홈3"}  />,
                    tabBarLabel: 'Home3',
                    iconName: 'chatbox'
                }}
            /> 
            <Tab.Screen 
                name={"More"}  
                component={More} 
                options={{
                    header: (props) => <CustomHeader {...props} title={"더보기"}  />,
                    tabBarLabel: 'Home',
                    iconName: 'ios-menu'
                }}
            /> 
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

export default GNB;