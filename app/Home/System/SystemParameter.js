import React from "react";
import {Ajax, T, IP, Lang} from "../../";
import Layer from "../../../component/Layer/Layer";
import Validation from "../../../common/Validation/Validation"
import _ from "underscore";

const clazz = {
    inputLabel: "col-5 col-sm-2 col-form-label",
    inputDiv: "col-7 col-sm-10",
    offsetDiv: "offset-5 offset-sm-2 col-7 col-sm-10",
};

let originalData = {};
class SystemParameter extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {
                ip_auto: 0,
                ipaddr: "",
                netmask: "",
                gateway: "",
                dns_auto: 0,
                dns1: "",
                dns2: "",
                lang: Lang.getLang()
            }
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetSystemParameterInfo.w",
            isLoadingShow: false,
            onSuccess: (data) => {
                this.setState({
                    data: {
                        ip_auto: data["ip_auto"],
                        ipaddr: IP.getIPFromApiValue(data["ipaddr"]),
                        netmask: IP.getIPFromApiValue(data["netmask"]),
                        gateway: IP.getIPFromApiValue(data["gateway"]),
                        dns_auto: data["dns_auto"],
                        dns1: IP.getIPFromApiValue(data["dns1"]),
                        dns2: IP.getIPFromApiValue(data["dns2"]),
                        lang: Lang.getLang(),
                    },
                });
                originalData = $.extend(true, {}, this.state.data);
            }
        });
    };

    handleChange = (event) => {
        const {data} = this.state;
        const target = event.target;
        // target.type 比较容易区别input与checkbox
        data[target.name] = target.value;
        if (target.name === "ip_auto") {
            data.dns_auto = target.value;
        }
        this.setState({
            data,
        });

        this.setState({
            [target.name]: target.value,
        });
    };

    handleApply = () => {
        let data = $.extend(true, {}, this.state.data);

        if (_.isEqual(data, originalData)) {
            Layer.msg({
                icon: 0,
                content: T.A_Settings_Parameter_NoChange
            });
            return false;
        }

        //校验
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "ipaddr":
                case "netmask":
                case "gateway":
                case "dns1":
                case "dns2":
                    if (!Validation.isIP(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_IPAddress_FormatError
                        });
                        return;
                    }
                    data[keys[i]] = data[keys[i]];
                    break;
                default:
                    break;
            }
        }

        Ajax({
            url: "ajax/SetSystemParameterInfo.w",
            data: {

            },
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: () => window.location.reload()
                });
            }
        });
    };

    render() {
        const {collapse} = this.props;
        const {data} = this.state;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <form>
                <div className="form-group row">
                    <label className={clazz.inputLabel} htmlFor="ipDhcp">Address Mode: </label>
                    <div className={clazz.inputDiv}>
                        <select className="form-control form-control-sm"
                                name="ip_auto"
                                id="ipDhcp"
                                value={data.ip_auto}
                                onChange={this.handleChange}>
                            <option value="0">HDCP</option>
                            <option value="1">Static</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>{T.T_Network_IPAddress}: </label>
                    <div className={clazz.inputDiv}>
                        <input type="text"
                               name="ipaddr"
                               className="form-control form-control-sm"
                               value={data.ipaddr}
                               disabled={parseInt(data.ip_auto) === 0 ? null : true}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>{T.T_Network_SubnetMask}: </label>
                    <div className={clazz.inputDiv}>
                        <input type="text"
                               name="netmask"
                               className="form-control form-control-sm"
                               disabled={parseInt(data.ip_auto) === 0 ? null : true}
                               value={data.netmask}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>{T.T_Network_DefaultGateway}: </label>
                    <div className={clazz.inputDiv}>
                        <input type="text"
                               name="gateway"
                               className="form-control form-control-sm"
                               value={data.gateway}
                               disabled={parseInt(data.ip_auto) === 0 ? null : true}
                               onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className={clazz.inputLabel} htmlFor="ipDhcp">Address Mode: </label>
                    <div className={clazz.inputDiv}>
                        <select className="form-control form-control-sm"
                                name="dns_auto"
                                id="dnsDhcp"
                                value={data.dns_auto}
                                disabled={parseInt(data.ip_auto) === 0 ? null : true}
                                onChange={this.handleChange}>
                            <option value="0">Enabled</option>
                            <option value="1">Disabled</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>Primary Nameserver: </label>
                    <div className={clazz.inputDiv}>
                        <input type="text"
                               name="dns1"
                               className="form-control form-control-sm"
                               value={data.dns1}
                               disabled={parseInt(data.dns_auto) === 0 ? null : true}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>Secondary Nameserver: </label>
                    <div className={clazz.inputDiv}>
                        <input type="text"
                               name="dns2"
                               className="form-control form-control-sm"
                               value={data.dns2}
                               disabled={parseInt(data.dns_auto) === 0 ? null : true}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>{T.T_Lang}: </label>
                    <div className={clazz.inputDiv}>
                        <select className="form-control form-control-sm"
                                name="lang"
                                value={data.lang}
                                onChange={this.handleChange}>
                            <option value="zh_CN">{T.T_Lang_Chinese}</option>
                            <option value="en_US">English</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className={clazz.offsetDiv}>
                        <button type="button"
                                className="btn"
                                onClick={this.handleApply}>{T.T_Apply}</button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default SystemParameter;