import Layer from "../../component/Layer/Layer";
import T from "../Lang/T";

const Config = {
    showLoading: function () {
        return Layer.load();
    },
    hideLoading: function (loadLayerIdx) {
        Layer.close(loadLayerIdx);
    },
    showError: function (code, description, onEnter) {
        Layer.alert({
            icon: 2,
            title: T.A_Error + '[' + code + ']',
            content: description,
            onEnter: onEnter,
        });
    }
};

export default Config;