
import { setRecoil } from "recoil-nexus";
import { requestSetUserItem } from "../../recoil/recoil";

const requestUpdateUser = (userItemObject) => {
    setRecoil(requestSetUserItem,userItemObject);
}
export default requestUpdateUser;