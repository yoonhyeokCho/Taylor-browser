import { DeviceEventEmitter } from "react-native";

/**
 * Popup 모달 띄우기
 * @param {string} title 제목
 * @param {string} description 내용
 * @param {"cancel" | "confirm" | "both"} type 타입
 * @param {VoidFunction} action 확인 액션
*/
const requestPopupClose = () => {
    DeviceEventEmitter.emit("popup",{
        type: "close"
    });
}
export default requestPopupClose;