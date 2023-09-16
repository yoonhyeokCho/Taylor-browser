import { setRecoil } from "recoil-nexus";
import { requestSetSystemItem } from "../../recoil/recoil";

const requestUpdateSystem = (systemItemObject) => {
    setRecoil(requestSetSystemItem,systemItemObject);
}
export default requestUpdateSystem;