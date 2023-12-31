import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Modal, ScrollView } from "react-native";
import getCustomPageList from "../data/getCustomPageList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NestableScrollContainer, NestableDraggableFlatList, ScaleDecorator } from "react-native-draggable-flatlist"
const CustomPageModify = () => {
    const bottomSheetModalRef = useRef(null);    
    const snapPoints = useMemo(() => ['25%', '50%','90%'], []);
    const customPageList = getCustomPageList();
    const [currentCustomPageNameList,setCurrentCustomPageNameList] = useState([]);

    const getCurrentCustomPageNameList = async () => {
        let currentCustomPageNameList = [];
        try{
            let rawCurrentCustomPageNameList = await AsyncStorage.getItem("currentCustomPageNameList");
              if(rawCurrentCustomPageNameList!== null){
                currentCustomPageNameList = JSON.parse(rawCurrentCustomPageNameList);
              }
          }catch(error){
          }
          return currentCustomPageNameList;
    }

    const updateCurrentCustomPageNameList = async () => {
        setCurrentCustomPageNameList(await getCurrentCustomPageNameList());
    }

    useEffect(()=>{
        updateCurrentCustomPageNameList();
    },[]);
    
    // CustomPageList
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
      }, []);
      const handleOpen = () => {
        bottomSheetModalRef.current?.present();
      }
      const handleClose = () => {
        bottomSheetModalRef.current?.close();
      }
    const hanldeAdd = async (name) => {
        let currentCustomPageNameList = await getCurrentCustomPageNameList();
        currentCustomPageNameList.push(name);
        await AsyncStorage.setItem("currentCustomPageNameList",JSON.stringify(currentCustomPageNameList));
        await updateCurrentCustomPageNameList();
        handleClose();
    }

    const renderItem = ({ item, drag, isActive, getIndex }) => {
        const [isDeleteMode,setIsDeleteMode] = useState(false);
        const handleDelete = async () => {
            let tmp = currentCustomPageNameList.slice();
            await AsyncStorage.setItem("currentCustomPageNameList",JSON.stringify(tmp.filter((d,di)=>di!==getIndex())));
            setIsDeleteMode(false);
            updateCurrentCustomPageNameList();
        }
        return (
            <ScaleDecorator   >
                <TouchableOpacity
                    onPressIn={drag}
                    onLongPress={()=>{
                        console.log("long press")
                        setIsDeleteMode(true);
                    }}
                    disabled={isDeleteMode} 
                    style={{borderWidth: 2}}
                    >
                <View style={{width: "100%", height: '100%',position: "absolute", backgroundColor: "red", zIndex: 1, opacity: 0.1, alignItems: "flex-end"}} >
                    
                </View  >
                {
                        isDeleteMode && <View style={{flexDirection: "row", height: 40, backgroundColor: "red", position: "absolute", right: 0, alignItems: "center", gap: 10, zIndex: 2}} >
                            <Pressable 
                                style={{justifyContent: "center", alignItems: "center", width: 60}} 
                                onPress={handleDelete}
                            >
                                <Text style={{fontSize: 20}} >
                                    삭제
                                </Text>
                            </Pressable>
                            <Pressable 
                                style={{justifyContent: "center", alignItems: "center", width: 60}}
                                onPress={()=>{
                                    setIsDeleteMode(false);
                                }}
                            >
                                <Text style={{fontSize: 20}} >
                                    취소
                                </Text>
                            </Pressable>
                        </View>
                    }
                <Text style={{
                    fontSize: 30, 
                    fontWeight: 700,
                    height: 40
                }} 
                >
                    {item}
                </Text>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    }
    

    return <BottomSheetModalProvider>
        <View style={styles.container} >
            <NestableScrollContainer>
                <NestableDraggableFlatList
                    
                    data={currentCustomPageNameList}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                    onDragEnd={async({ data }) => {
                        setCurrentCustomPageNameList(data);
                        await AsyncStorage.setItem("currentCustomPageNameList",JSON.stringify(data));
                    }}
                />
            </NestableScrollContainer>
            <TouchableOpacity style={styles.addButton} 
                onPress={handleOpen}
            >
                <Text style={{fontSize: 40}} >
                    +
                </Text>
            </TouchableOpacity> 
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
        <ScrollView 
            style={{...styles.contentContainer}}
            bounces={false}
        >
            {
                Object.keys(customPageList).map((name, index) => <TouchableOpacity key={index} onPress={()=>{
                    hanldeAdd(name);
                }} >
                    <Text
                        style={{
                            fontSize: 30, 
                            fontWeight: 700
                        }}
                    >
                        {name}
                    </Text>
                </TouchableOpacity>)
            }
          </ScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray"
    },
    addButton: {
        position: "absolute",
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: "blue",
        borderRadius: 30,
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    contentContainer: {
        // justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 30
    }
});

export default CustomPageModify;