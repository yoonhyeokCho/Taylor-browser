import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const RenderSafeAreaView = ({
  children,
  style,
}) => {
  return <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: colors.gray.White,
    flex: 1,
  },
});

export default RenderSafeAreaView;
