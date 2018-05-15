import Config from "./Config";

function deft() {
    let i, param = null;
    for (i = 0; i < arguments.length; i++) {
        param = arguments[i];
        if (typeof param !== "undefined" && param !== null) {
            return param;
        }
    }
    return null;
}

function Ajax(options) {
    let jqXHR = null,
        requestAbortTimer = null,
        loadLayerIdx = null;

    options = deft(options, {});
    options.dataType = "json";
    options.data = deft(options.data, {});
    options.data["token"] = "NULL";
    options.data = JSON.stringify(options.data);
    options.type = deft(options.type, "GET");
    options.timeout = deft(options.timeout, 8 * 1000);
    options.isLoadingShow = deft(options.isLoadingShow, true);
    options.isCodeErrorShow = deft(options.isCodeErrorShow, true);
    options.isOtherErrorShow = deft(options.isOtherErrorShow, true);
    options.onSuccess = deft(options.onSuccess, $.noop);
    options.onError = deft(options.onError, $.noop);
    options.onComplete = deft(options.onComplete, $.noop);
    options.onLayerErrorEnter = deft(options.onLayerErrorEnter, $.noop);
    
    // 请求成功后的回调函数
    options.success = (data) => {
        let code = deft(data["code"], -1);
        let description = deft(data["description"], "error");
        if (code === 0) {
            options.onSuccess(deft(data["data"], {}));
        } else {
            if (options.isCodeErrorShow) {
                Config.showError(code, description, options.onLayerErrorEnter);
            }
            options.onError(code, description);
        }
    };

    // 请求失败时被调用的函数
    options.error = (XHR, textStatus) => {
        if (options.isOtherErrorShow) {
            Config.showError(-1, textStatus, options.onLayerErrorEnter);
        }
        options.onError(-1, textStatus);
    };

    // 请求完成后回调函数
    options.complete = function () {
        if (requestAbortTimer !== null) {
            clearTimeout(requestAbortTimer);
            requestAbortTimer = null;
        }
        if (options.isLoadingShow) {
            Config.hideLoading(loadLayerIdx);
        }
        options.onComplete();
    };

    if (requestAbortTimer !== null) {
        clearTimeout(requestAbortTimer);
        requestAbortTimer = null;
    }

    requestAbortTimer = setTimeout(function () {
        requestAbortTimer = null;
        if (jqXHR.abort && $.isFunction(jqXHR.abort)) {
            jqXHR.abort();
        }
        if (options.isOtherErrorShow) {
            Config.showError(-1, "timeout", options.onLayerErrorEnter);
        }
        options.onError(-1, "timeout");
    }, options.timeout);

    if (options.isLoadingShow) {
        loadLayerIdx = Config.showLoading();
    }
    jqXHR = $.ajax(options);
}

export default Ajax;