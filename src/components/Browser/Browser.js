import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import WebView from "react-native-webview";
import { createRef, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { systemAtom } from "../../recoil/recoil";
import scripts from "../../modules/extension/scripts";
const Browser = ({ width = "100%", height = "100%" }) => {
  const system = useRecoilValue(systemAtom);
  const webViewRef = useRef(null);
  const [inputUri, setInputUri] = useState("");
  const [currentUri, setCurrentUri] = useState("https://google.com");
  const [extensionString, setExtensionString] = useState("");
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

  useEffect(() => {
    setExtensionString(
      system.extensionStates
        .filter((extension) => extension.active)
        .reduce((acc, cur) => {
          let result = acc;
          if (scripts[cur.name]) {
            result += scripts[cur.name];
          }
          return result;
        }, "") + "  true"
    );
  }, [system.extensionStates]);

  useEffect(() => {
    reloadWebView();
    console.log(extensionString);
  }, [extensionString]);

  const reloadWebView = () => {
    // WebView 리로드
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
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
        ref={webViewRef}
        injectedJavaScript={extensionString}
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
