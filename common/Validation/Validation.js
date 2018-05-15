class Validation {
    static range = {
        Frequency: [48000, 999000],
        RFLevel: [0, 108],
        SymbolRate: [0, 999000],
        Volume: [0, 100],
        AudioDelay: [-2000, 2000],
        VideoRate: [600, 20000],
        GOPSize: [6, 63],
        PID: [32, 8191],
        UsefulPID: [32, 8190],
        OtherPID: [0, 8191],
        OrgNetID: [0, 65535],
        TSID: [0, 65535],
        ServiceID: [0, 65535],
        IPPort: [0, 65535],
        TTL: [1, 255],
        IPRate: [0, 500],
        VLAN: [1, 4094],
        IGMPInterval: [30, 255],
        FECL: [1, 20],
        FECD: [4, 20],
        Brightness: [0, 255],
        Contrast: [0, 255],
        Saturation: [0, 255],
        Chrominance: [-180, 180],
        ServiceName: [1, 31],
        ProviderName: [1, 31],
        OSDX: [0, 1920],
        OSDY: [0, 1080],
        OSDW: [2, 1920],//width
        OSDH: [2, 1080],//height
        shelterX: [0, 1920],
        shelterY: [0, 1080],
        shelterW: [2, 1920],//width
        shelterH: [2, 1080],//height
    };
    //可以配置指定参数的范围
    static setRange = (name, min, max) => {
        Validation.range[name][0] = min;
        Validation.range[name][1] = max;
    };

    static checkRange = (name, value) => {
        let o = Validation.range[name];
        return value >= o[0] && value <= o[1];
    };

    static checkNumberRange = (value, min, max) => {
        return Validation.isInteger(value) && (value >= min && value <= max);
    };

    /********************************************
     *         modulator                         *
     ********************************************/
        //频率
    static isFrequency = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("Frequency", value);
    };

    //RFLevel
    static isRFLevel = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("RFLevel", value);
    };

    //符号率
    static isSymbolRate = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("SymbolRate", value);
    };

    //任意两个通道的频率差不能小于指定带宽
    static isFrequencyConflict = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                let bandwidth = Math.max(arr[i].bandwidth, arr[j].bandwidth);
                if (Math.abs(arr[i].frequency - arr[j].frequency) < bandwidth) {
                    return {
                        0: arr[i],
                        1: arr[j],
                        bandwidth,
                    };
                }
            }
        }

        return false;
    };

    /********************************************
     *         encoder,transcoder                *
     ********************************************/
        //音量
    static isVolume = (value) => {
        return Validation.isFloatNumber(value) && Validation.checkRange("Volume", value);
    };

    //音量延时
    static isDelay = (value) => {
        return Validation.isFloatNumber(value) && Validation.checkRange("AudioDelay", value);
    };

    //获取字节长度
    static getByteLen = (val) => {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) { //全角
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    };

    //节目名
    static isProgramName = (value) => {
        value = value + '';
        let len = Validation.getByteLen(value);
        return len >= V.range.ServiceName[0] && len <= V.range.ServiceName[1];
    };

    //提供商名
    static isProviderName = (value) => {
        value = value + '';
        let len = Validation.getByteLen(value);
        return len >= V.range.ProviderName[0] && len <= V.range.ProviderName[1];
    };

    //视频码率
    static isVideoRate = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("VideoRate", value);
    };

    //视频最大码率
    static isVideoMaxRate = (value, VideoRate) => {
        return Validation.isInteger(value) && value >= (1.5 * VideoRate) && value <= (2 * VideoRate);
    };

    //视频最小码率
    static isVideoMinRate = (value, VideoRate) => {
        return Validation.isInteger(value) && value >= 0 && value <= (0.75 * VideoRate);
    };

    //GOP大小
    static isGOPSize = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("GOPSize", value);
    };

    //PID
    static isPID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("PID", value);
    };

    //Useful PID, 不能设置空包8191的PID
    static isUsefulPID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("UsefulPID", value);
    };

    static isOtherPID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("OtherPID", value);
    };

    //PID冲突
    static isPIDConfict = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i].pid === arr[j].pid) {
                    return {
                        0: arr[i],
                        1: arr[j]
                    };
                }
            }
        }

        return false;
    };

    //OrgNetID
    static isOrgNetID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("OrgNetID", value);
    };

    //TSID
    static isTSID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("TSID", value);
    };

    //业务ID
    static isServiceID = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("ServiceID", value);
    };

    static isBrightness(value) {
        return Validation.isInteger(value) && Validation.checkRange("Brightness", value);
    };

    static isContrast(value) {
        return Validation.isInteger(value) && Validation.checkRange("Contrast", value);
    };

    static isSaturation(value) {
        return Validation.isInteger(value) && Validation.checkRange("Saturation", value);
    };

    static isChrominance(value) {
        return Validation.isInteger(value) && Validation.checkRange("Chrominance", value);
    };

    /********************************************
     *         TSIP                             *
     ********************************************/
        //IP端口
    static isIPPort = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("IPPort", value);
    };

    //time to live
    static isTTL = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("TTL", value);
    };

    //IP输出码率
    static isIPRate = (value) => {
        return Validation.isFloatNumber(value) && Validation.checkRange("IPRate", value);
    };

    //VLAN
    static isVLAN = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("VLAN", value);
    };

    //IGMP发送间隔
    static isIGMPInterval = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("IGMPInterval", value);
    };

    static isFECL = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("FECL", value);
    };

    static isFECD = (value) => {
        return Validation.isInteger(value) && Validation.checkRange("FECD", value);
    };

    //单播地址
    static isUnicastIP = (value) => {//单播地址
        let reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        let str = value.replace(/^\s+|\s+$/g, '');
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            if (224 <= RegExp.$1 && RegExp.$1 <= 239) {
                return false;
            }
            if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255 && RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                return true;
            }
        }
        return false;
    };

    //MAC地址
    static isMAC = (value) => {
        let reg_name = /^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/;
        return reg_name.test(value);
    };

    //任意两个打开的IP通道，它们的ip和port不能完全相同
    static isIPAndPortAvailable = (list) => {
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {
                if ((list[i].port === list[j].port) && (list[i].ip === list[j].ip)) {
                    return false;
                }
            }
        }
        return true;
    };

    //IP地址
    static isIP = (strIP) => {
        if (typeof strIP === "undefined") {
            return false;
        }
        let strip = strIP + '';
        let reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        let str = strip.replace(/^\s+|\s+$/g, '');
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            return (RegExp.$1 <= 255 && RegExp.$2 <= 255 && RegExp.$1 >= 0 && RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4 >= 0);
        } else {
            return false;
        }
    };

    /**
     * [isEqualIPAddress 判断两个IP地址是否在同一个网段]
     * @param  {[String]}  addr1 [地址一]
     * @param  {[String]}  addr2 [地址二]
     * @param  {[String]}  mask  [子网掩码]
     * @return {Boolean}         [true or false]
     */
    static isEqualIPAddress = (addr1, addr2, mask) => {
        if (!addr1 || !addr2 || !mask) {
            console.log("各参数不能为空");
            return false;
        }
        let res1 = [], res2 = [];
        let arr1 = addr1["split"](".");
        let arr2 = addr2["split"](".");
        let maskArr = mask["split"](".");

        for (let i = 0, len = arr1.length; i < len; i += 1) {
            res1.push(parseInt(arr1[i]) & parseInt(maskArr[i]));
            res2.push(parseInt(arr2[i]) & parseInt(maskArr[i]));
        }

        if (res1.join(".") === res2.join(".")) {
            console.log("在同一个网段");
            return true;
        } else {
            console.log("不在同一个网段");
            return false;
        }
    };

    static isUserName = (value) => {
        //用户名正则，4到16位（字母，数字，下划线，减号）
        let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        //输出 true
        return uPattern.test(value);
    };

    static isPassword = (value) => {
        //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        //输出 true
        return pPattern.test(value);
    };

    //整数
    static isInteger = (value) => {
        if (typeof value === "undefined") {
            return false;
        }
        let strNum = value + '';
        let reSpaceCheck = /^-*\d+$/;
        let str = strNum.replace(/^\s+|\s+$/g, '');
        return reSpaceCheck.test(str);
    };
    //浮点型
    static isFloatNumber = (strNumber) => {
        if (typeof strNumber === "undefined") {
            return false;
        }
        let strNum = strNumber + '';
        let reSpaceCheck = /^-*\d+(\.\d+)?$/;
        let str = strNum.replace(/^\s+|\s+$/g, '');
        return reSpaceCheck.test(str);
    };
}

const V = Validation;

export default Validation;