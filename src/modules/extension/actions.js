import { getRootNavigation } from "../../navigations/navigations";

const actions = {
    "chatGPT": ()=>{
        getRootNavigation().navigate("GPT", {})
    }
};
export default actions;