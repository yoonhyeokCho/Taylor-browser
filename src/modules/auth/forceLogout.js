import {Restart} from 'fiction-expo-restart';
import AsyncStorage from "@react-native-async-storage/async-storage";

const forceLogout = () => {
    AsyncStorage.clear();
    Restart();
}
export default forceLogout;
