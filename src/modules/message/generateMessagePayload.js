import { getRecoil } from "recoil-nexus";
import { userAtom } from "../../recoil/recoil";
const generateMessagePayload = (payload) => {
    let { token } = getRecoil(userAtom);
    return {
        token: token,
        ...payload
    }
}
export default generateMessagePayload;