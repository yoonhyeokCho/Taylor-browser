import { ScrollView, StyleSheet, View } from "react-native";
import DaumNews from "../components/Custom/DaumNews";
import GoogleSearch from "../components/Custom/GoogleSearch";
import DaumSearch from "../components/Custom/DaumSearch";
import NaverSearch from "../components/Custom/NaverSearch";
import CustomWebview from "../components/Custom/CustomWebview";
import { useEffect, useLayoutEffect, useState } from "react";
import getCustomPageList from "../data/getCustomPageList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused, useRoute } from "@react-navigation/native";



const CustomPage = () => {
    const isFocused = useIsFocused();
    let [currentCustomPageNameList,setCurrentCustomPageNameList] = useState([]);
    const customPageList = getCustomPageList();
    const route = useRoute();
    const [reloadFlag,setReloadFlag] = useState(false);

    const getCurrentCustomPageNameList = async () => {
        let currentCustomPageNameList = [];
        try{
            let rawCurrentCustomPageNameList = await AsyncStorage.getItem("currentCustomPageNameList");
              if(rawCurrentCustomPageNameList!== null){
                currentCustomPageNameList = JSON.parse(rawCurrentCustomPageNameList);
              }
          }catch(error){
              console.log(error)
          }
          return currentCustomPageNameList;
    }

    useEffect(()=>{
        if(!reloadFlag){
            setTimeout(()=>{
                setReloadFlag(true);
            },10);
        }
    },[reloadFlag]);


    const updateCurrentCustomPageNameList = async () => {
        setCurrentCustomPageNameList(await getCurrentCustomPageNameList());
    }

    // useFocusEffect(()=>{
    //     console.log("focus")
    //     updateCurrentCustomPageNameList();
    // })

    useEffect(()=>{
        if(isFocused){
            updateCurrentCustomPageNameList();
            setReloadFlag(false);
        }
    },[isFocused]);

    return <View style={{flex: 1, backgroundColor: "gray"}} >
        {
            reloadFlag &&
            <ScrollView bounces={false} >
                {
                    currentCustomPageNameList?.map((customPageName,index) => <View key={index} >
                        {customPageList[customPageName]}
                    </View>)
                }
            </ScrollView>
        }
        {/* <DaumNews /> */}
        

        
        
    </View>
}

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 20,
        backgroundColor: "black"
    }
})

export default CustomPage;