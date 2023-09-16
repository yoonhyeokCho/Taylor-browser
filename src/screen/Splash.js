import {  Text, View } from "react-native"

import {  useEffect } from "react";
import { navigationIterator } from "../navigations/navigations";
import { getRootNavigation } from "../navigations/navigations";
const Splash = ({}) => {
    
    useEffect(()=>{
        setTimeout(()=>{
            navigationIterator([
                [getRootNavigation,"reset",{routes: [{name: 'MainHome',params: {}}]}],
            ]);
        },2000);
    },[]);
    
    return <View>
        <Text>Splash</Text>
    </View>
}
export default Splash;