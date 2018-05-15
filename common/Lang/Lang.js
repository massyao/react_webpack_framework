import T from "./T";
import zh_CN from './zh_CN';
import en_US from './en_US';
import 'core-js/fn/object/assign'

let curLang = "zh_CN";
const langLib = {
    zh_CN,
    en_US,
};
Object.assign(T, langLib[curLang]);

const Lang = {
    setLang(lang) {
        curLang = lang;
        Object.assign(T, langLib[curLang]);
    },
    getLang() {
        return curLang;
    }
};

export default Lang;