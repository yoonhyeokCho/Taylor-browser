import WebView from "react-native-webview";
import RenderSafeAreaView from "../components/Layout/RenderSafeAreaView";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";
import dimensions from "../styles/dimensions";
import { getRootNavigation } from "../navigations/navigations";

const GPT = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <RenderSafeAreaView>
      <View style={{ flex: 1,justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%",alignItems: "flex-end", paddingRight: 20 }}>
          <Pressable
            onPress={() => {
              getRootNavigation().goBack();
            }}
            hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
          >
            <FontAwesome name="angle-double-down" size={24} color="black" />
          </Pressable>
        </View>
        {isLoading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#000000"
          />
        )}
        <WebView
          style={{ flex: 1, width: dimensions.width }}
          source={{
            uri: "https://chat.openai.com/",
          }}
          onLoadEnd={()=>{
            setIsLoading(false);
          }}
        />
      </View>
    </RenderSafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default GPT;
