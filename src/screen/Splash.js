import {  Text, View } from "react-native"

import {  useEffect } from "react";
import { navigationIterator } from "../navigations/navigations";
import { getRootNavigation } from "../navigations/navigations";
const Splash = ({}) => {
    
    useEffect(()=>{
        setTimeout(()=>{
            navigationIterator([
                [getRootNavigation,"reset",{routes: [{name: 'JIHO',params: {}}]}],
                // [getRootNavigation,"reset",{routes: [{name: 'RacgooTest',params: {}}]}],
            ]);
        },100);
    },[]);
    
    return <View>
        <Text>Splash</Text>
    </View>
}
export default Splash;