import { StyleSheet, View } from "react-native";
import { Fragment } from "react";
import CustomWebview from "../components/Custom/CustomWebview";

const getCustomPageList = () => {
    const styles = StyleSheet.create({
        divider: {
            width: "100%",
            height: 20,
            backgroundColor: "black"
        }
    });
    return ({
        "naver": <CustomWebview uri={"https://m.naver.com/"} cssType={"class"} targetCss={".sch"} height={52} />,
        "daum": <CustomWebview uri={"https://m.daum.net/"} cssType={"class"} targetCss={".d_sch"} height={48} />,
        "google": <CustomWebview uri={"https://www.google.com/"} cssType={"class"} targetCss={".Gwkg9c"} height={60} />,
        "amazon": <CustomWebview uri={"https://www.amazon.com/"} cssType={"class"} targetCss={".nav-searchbar-wrapper"} height={50} />,
        "youtube": <CustomWebview uri={"https://m.youtube.com/"} cssType={"class"} targetCss={"#"} height={48} />,
        "sellkey": <CustomWebview uri={"https://sellkey.sellerbox.io/"} cssType={""} targetCss={".mobileHomeFormWrap"} height={60} />,
        "upbit": <Fragment>
            <View style={styles.divider} />
            <CustomWebview uri={"https://upbit.com/coin_list"} cssType={"class"} targetCss={".marketB"} height={290} scrollEnabled={true} />
        </Fragment>,
        "webtoon": <Fragment>
            <View style={styles.divider} />
            <CustomWebview uri={"https://m.comic.naver.com/webtoon/weekday"} cssType={"class"} targetCss={"rand"} height={290} scrollEnabled={true} />
        </Fragment>    
    });
}


export default getCustomPageList;
