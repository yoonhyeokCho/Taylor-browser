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
  const [stateUrl,setStateUrl] = useState("");
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

  


  useEffect(()=>{
    setTimeout(()=>{
      webViewRef.current.injectJavaScript(`
    function removeElementsExcept(target,type) {
      let excludedElements = document.querySelectorAll((type === "id" ? "#" : ".") + target);
      let parentComponent = excludedElements[0].parentElement;
      if (parentComponent) {
        let childComponents = parentComponent.children;
        for (let i = childComponents.length - 1; i >= 0; i--) {
          let child = childComponents[i];
          if(type==="id"){
            if (child.id !== target) {
              parentComponent.removeChild(child);
            }
          }else{
            if (!child.classList.contains(target)) {
              parentComponent.removeChild(child);
            }
          }
        }
      }
      let result = parentComponent.innerHTML;
      if (excludedElements.length === 0) {
        console.error('No elements matched the provided selector.');
        return;
      }
      let parentElement = document.body;
      let childElements = Array.from(parentElement.children);
      childElements.forEach(function (child) {
        if (!excludedElements[0] || !excludedElements[0].contains(child)) {
          parentElement.removeChild(child);
        }
      });
      parentElement.innerHTML = result;
    };
    removeElementsExcept("sch","class");
    true
    `)
    },120);
  },[stateUrl]);

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
        onNavigationStateChange={(e)=>{
          setStateUrl(e.url);
        }}
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
