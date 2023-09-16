import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import RenderSafeAreaView from "../components/Layout/RenderSafeAreaView";
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { getRootNavigation } from "../navigations/navigations";
import { useRecoilState, useRecoilValue } from "recoil";
import { systemAtom } from "../recoil/recoil";
import requestUpdateSystem from "../actions/system/requestUpdateSystem";
import actions from "../modules/extension/actions";
const Extension = () => {
    const [system,setSystem]  = useRecoilState(systemAtom);
    
    useEffect(()=>{
        // console.log(system)
    },[system])

    return <RenderSafeAreaView>
        <View style={[styles.container]} >

            <View style={{alignItems: "flex-end"}} >
                <Pressable
                    onPress={()=>{
                        getRootNavigation().goBack();
                    }} 
                    hitSlop={{bottom: 4, left: 4, right: 4, top: 4}}
                >
                    <FontAwesome 
                        name="angle-double-down" 
                        size={24} 
                        color="black" 
                    />
                </Pressable>
            </View>

            <View style={{height: 20}} />

            <Text style={{fontSize: 20}} >
                Extensions
            </Text>

            <View style={{height: 20}} />

            <View style={{gap: 10}} >

                {
                    system.extensionStates.map((extension,extensionIndex) => <View 
                        key={extensionIndex}  
                        style={[styles.extensionCard]}
                    >
                        <Text>
                            {extension.name}
                        </Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value)=>{
                                if(["chatGPT"].indexOf(extension.name)===-1){
                                    let tmpExtension = JSON.parse(JSON.stringify([...system.extensionStates]));
                                    tmpExtension[extensionIndex].active = !tmpExtension[extensionIndex].active;
                                    setSystem({...system,extensionStates: tmpExtension});
                                }
                                if(actions[extension.name]){
                                    actions[extension.name]();
                                }
                            }}
                            value={extension.active}
                        />
                    </View>)
                }

            </View>
        </View>
    </RenderSafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },  
    extensionCard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default Extension;