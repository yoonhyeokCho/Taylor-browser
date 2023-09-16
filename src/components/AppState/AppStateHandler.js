import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import requestUpdateSystem from "../../actions/system/requestUpdateSystem";

const AppStateHandler = () => {
    const appState = useRef(AppState.currentState);
    useEffect(()=>{
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
              appState.current.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
                requestUpdateSystem({appState: "forground"});
            }else{
                requestUpdateSystem({appState: "background"});
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    },[]);

    return null;
}
export default AppStateHandler;