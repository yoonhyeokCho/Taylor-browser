import { Fragment } from "react";
import OverlayLoading from "../Loading/OverlayLoading";
import CustomPopup from "../Popup/CustomPopup";
import AppStateHandler from "../AppState/AppStateHandler";
import FloatingBtn from "../Button/FloatingBtn";

const ModuleProvider = () => {
    return <Fragment>
        <OverlayLoading />
        <CustomPopup />
        <FloatingBtn />
        <AppStateHandler />
    </Fragment>
}
export default ModuleProvider;
