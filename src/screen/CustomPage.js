import { ScrollView, View } from "react-native";
import DaumNews from "../components/Custom/DaumNews";
import GoogleSearch from "../components/Custom/GoogleSearch";
import DaumSearch from "../components/Custom/DaumSearch";
import NaverSearch from "../components/Custom/NaverSearch";
import CustomWebview from "../components/Custom/CustomWebview";


const CustomPage = () => {
    return <View style={{flex: 1, backgroundColor: "yellow"}} >
        <ScrollView bounces={false} >
            <CustomWebview uri={"https://m.naver.com/"} cssType={"class"} targetCss={".sch"} height={52} />
            <CustomWebview uri={"https://m.daum.net/"} cssType={"class"} targetCss={".d_sch"} height={48} />
            <CustomWebview uri={"https://www.google.com/"} cssType={"class"} targetCss={".Gwkg9c"} height={60} />
            <CustomWebview uri={"https://www.amazon.com/"} cssType={"class"} targetCss={".nav-searchbar-wrapper"} height={50} />
            <CustomWebview uri={"https://m.youtube.com/"} cssType={"class"} targetCss={"#"} height={48} />
            <CustomWebview uri={"https://sellkey.sellerbox.io/"} cssType={""} targetCss={".mobileHomeFormWrap"} height={60} />
            <CustomWebview uri={"https://upbit.com/coin_list"} cssType={"class"} targetCss={".marketB"} height={290} scrollEnabled={true} />
            <CustomWebview uri={"https://m.comic.naver.com/webtoon/weekday"} cssType={"class"} targetCss={"rand"} height={290} scrollEnabled={true} />
            {/* <CustomWebview uri={"https://shopping.naver.com/home"} cssType={"class"} targetCss={"shoppingHomeResponsive_module__N_oCS"} height={300} scrollEnabled={true} /> */}
        </ScrollView>
        {/* <DaumNews /> */}
        

        
        
    </View>
}
export default CustomPage;