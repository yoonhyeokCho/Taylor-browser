import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { useState } from "react";
const Browser = ({ width = "100%", height = "100%" }) => {
  const [inputUri, setInputUri] = useState("");
  const [currentUri, setCurrentUri] = useState("https://google.com");
  const handleChangeUri = (text) => {
    setInputUri(text);
  };
  const handleSearch = () => {
    let normarlizedUri = "";
    if (inputUri.includes("http://") || inputUri.includes("https://")) {
      normarlizedUri = inputUri;
    } else {
      normarlizedUri = `https://www.google.com/search?q=+${inputUri}`;
    }
    setCurrentUri(normarlizedUri);
  };

  return (
    <View style={{ width, height }}>
      <TextInput
        style={styles.uriContainer}
        placeholder="주소를 입력해주세요"
        placeholderTextColor="gray"
        value={inputUri}
        onChangeText={handleChangeUri}
        onSubmitEditing={handleSearch}
      />
      <WebView
        allowsBackForwardNavigationGestures
        source={{
          uri: currentUri,
        }}
        onError={() => {
          setCurrentUri(``);
        }}
        renderError={() => {
          <View />;
        }}
        renderLoading={() => {
          <ActivityIndicator
            style={{ position: "absolute", top: height / 2, left: width / 2 }}
            size="large"
          />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  uriContainer: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
});

export default Browser;
