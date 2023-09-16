import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dimensions from "../../styles/dimensions";
import colors from "../../styles/colors";
const CustomHeader = ({ title, navigation, RightComponent,route }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container,{ height: dimensions.headerHeight+insets.top, paddingTop: insets.top , backgroundColor: colors.gray.white }]}>
      {
        navigation.canGoBack() ?
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        :
        <Text style={styles.backButton} >ㅤ</Text>
      }
      <Text style={styles.title}>{route?.params?.screenProps?.title ?? title}</Text>
      {
        RightComponent ?
        <View style={styles.rightButton} >
          <RightComponent />
        </View>
        :
        <Text style={styles.rightButton}  >ㅤ</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff', // 헤더 배경색을 원하는 색상으로 변경하세요
    // elevation: 4, // 필요한 경우 헤더에 그림자를 추가하세요
  },
  backButton: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // 버튼 색상을 원하는 색상으로 변경하세요
  },
  title: {
    width: 300,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // 제목 색상을 원하는 색상으로 변경하세요
  },
  rightButton: {
    textAlign: "right",
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // 버튼 색상을 원하는 색상으로 변경하세요
  }
});

export default CustomHeader;
