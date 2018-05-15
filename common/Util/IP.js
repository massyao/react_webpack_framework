function getIPFromApiValue(value){
    let str = [];
    str[0] = String((value >>> 24) >>> 0) + '.';
    str[1] = String(((value << 8) >>> 24) >>> 0) + '.';
    str[2] = String((value << 16) >>> 24) + '.';
    str[3] = String((value << 24) >>> 24);
    return str[0] + str[1] + str[2] + str[3];
}

function getApiValueFromIP(IP){
    let value = [];
    IP = IP.split('.');
    value[0] = Number(IP[0]) * 256 * 256 * 256;
    value[1] = Number(IP[1]) * 256 * 256;
    value[2] = Number(IP[2]) * 256;
    value[3] = Number(IP[3]);
    return value[0] + value[1] + value[2] + value[3];
}

const IP = {
    getIPFromApiValue,
    getApiValueFromIP,
};

export default IP;