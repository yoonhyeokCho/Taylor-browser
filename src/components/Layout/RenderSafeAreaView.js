import React from "react";
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../styles/colors";

const RenderSafeAreaView = ({
  children,
  style,
}) => {
  return <SafeAreaView style={[styles.root, style]}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: colors.gray.White,
    flex: 1,
  },
});

export default RenderSafeAreaView;
