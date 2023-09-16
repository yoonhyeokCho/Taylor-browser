import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import FloatingBtn from "../components/Button/FloatingBtn";
const JIHO = () => {

    const [state, setState] = useState({
        MultiWindow: false,
    });

    useEffect(() => {
        console.log('MultiWindow On', state.MultiWindow);
    }, [state.MultiWindow]);

    
    

    return <View>
        <Text>
            JJJJ
        </Text>
        <FloatingBtn/>
    </View>
}
export default JIHO;