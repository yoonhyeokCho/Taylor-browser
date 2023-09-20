import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

const BookMark = () => {

    headerStyle = () => {
        this.props.navigation.setOptions({
          headerRight: () => (
            <Button title="Add"/>
          )
      })
    };

    const data = [
        { name: '네이버', uri: 'https://www.naver.com/' },
        { name: '구글', uri: 'https://www.google.com/' },
    ]

    LoadData = () => {
        //List Data 불러오기
    }

    AddData = () => {
        
    }

    GotoURI = (uri) => {
        //BookMark Screen 끄고
        //WebView로 uri 쏘면 됨
    }

    DeleteList = () => {
        //북마크 삭제(Alert로 Yes/No)
    }

    return (
        
        <View>
            <FlatList 
                data = {data}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => GotoURI(item.uri)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>)}
            />
        </View>

    );
}
export default BookMark;