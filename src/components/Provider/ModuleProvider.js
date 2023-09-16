import { Fragment } from "react";
import OverlayLoading from "../Loading/OverlayLoading";
import CustomPopup from "../Popup/CustomPopup";
import AppStateHandler from "../AppState/AppStateHandler";

const ModuleProvider = () => {
    return <Fragment>
        <OverlayLoading />
        <CustomPopup />
        <AppStateHandler />
    </Fragment>
}
export default ModuleProvider;
