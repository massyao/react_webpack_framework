import React from "react";
import {T} from "../../";
import Validation from "../../../common/Validation/Validation"

class OutputSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("IPPort", 1, 65535);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            data: newProps.data
        });
    }

    handleChange = (name, event) => {
        let {data} = this.state;
        if (event.target.type === "checkbox") {
            data[name] = event.target.checked;
        } else {
            data[name] = event.target.value;
        }

        this.setState({
            data
        });
    };

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        const {data} = this.state;
        const showItem = (name, value) => {
            if ((name !== "rtmp_enable") && (!data["rtmp_enable"])) {
                return "";
            }

            let sTitle = "";
            let type = "input";
            let optsArr = [];
            switch (name) {
                case "rtmp_enable":
                    sTitle = T.T_RTMP_Enable;
                    type = "checkbox";
                    break;
                case "rtmp_serverip":
                    sTitle = T.T_RTMP_Serverip;
                    break;
                case "rtmp_serverport":
                    sTitle = T.T_RTMP_Serverport;
                    break;
                case "rtmp_appname":
                    sTitle = T.T_RTMP_Appname;
                    break;
                case "rtmp_streamname":
                    sTitle = T.T_RTMP_Streamname;
                    break;
                case "rtmp_username":
                    sTitle = T.T_RTMP_Username;
                    break;
                case "rtmp_password":
                    sTitle = T.T_RTMP_Password;
                    break;
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className="form-control form-control-sm" value={value}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else if (type === "select") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={value}
                                onChange={this.handleChange.bind(this, name)}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>

                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="checkbox" style={{"marginTop": "14px"}} defaultChecked={value}
                               onClick={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            }

        };

        return <div className="card-body">
            <form>
                {
                    Object.keys(data).map(function (key) {
                        return showItem(key, data[key]);
                    })
                }
            </form>
        </div>
    }
}


export default OutputSettings;