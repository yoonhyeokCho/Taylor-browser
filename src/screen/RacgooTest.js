import { View } from "react-native";
import Browser from "../components/Browser/Browser";
import RenderSafeAreaView from "../components/Layout/RenderSafeAreaView";
const RacgooTest = () => {
    return <RenderSafeAreaView>
        <View style={{flex: 1}} >
            <Browser />
        </View>
    </RenderSafeAreaView>
}
export default RacgooTest;