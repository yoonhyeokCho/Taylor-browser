import React, { Fragment } from 'react';
import { LogBox, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { setCustomText } from "react-native-global-props"
import { requestSetSystemItem, systemAtom } from './recoil/recoil';

import { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import RootStack from './navigations/RootStack';
import ModuleProvider from './components/Provider/ModuleProvider';
import requestUpdateSystem from './actions/system/requestUpdateSystem';


const AppWithModules = () => {
  const [fontsLoaded] = useFonts({
    "PretendardBold": require("./assets/fonts/Pretendard-Bold.otf"),
    "PretendardSemiBold": require("./assets/fonts/Pretendard-Medium.otf"),
    "PretendardMedium": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard": require("./assets/fonts/Pretendard-Light.otf"),
  });
  LogBox.ignoreLogs(['Warning: ...']);


  const system=useRecoilValue(systemAtom);
  
  const [isAppReady, setIsAppReady] = useState(false);


  useEffect( () => {  
    if(fontsLoaded && system.isReady===false){
      setCustomText({ style: { fontFamily: "Pretendard"}});
      requestUpdateSystem({platform: Platform.OS,isReady: true});
      setIsAppReady(true);
    }
  },[fontsLoaded,system]);
  
  return (
     <Fragment>
      {
        isAppReady &&
        <Fragment>
          <ModuleProvider />
          <RootStack />
        </Fragment>
      }
      </Fragment>
  );
}
export default AppWithModules;