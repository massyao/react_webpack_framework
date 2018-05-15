import React from "react";
import T from "../../../common/Lang/T";
import {Ajax} from "../../";
import Layer from "../../../component/Layer/Layer";
import _ from "underscore";

let originalData = {};
class RecordAdvancedSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                url: "N/A",//url
                stream_name: "N/A" //name
            }
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetRecordAdvanceSettings.w",
            onSuccess: (data) => {
                this.setState({
                    data
                });
                originalData = $.extend(true, {}, this.state.data);
            }
        });
    };

    handleChange = (name, event) => {
        let {data} = this.state;
        data[name] = event.target.value;

        this.setState({
            data
        });
    };

    handleApply = () => {
        let data = $.extend(true, {}, this.state.data);

        if (_.isEqual(originalData, data)) {
            Layer.msg({
                icon: 0,
                content: T.A_Settings_Parameter_NoChange
            });
            return false;
        }

        //发送数据
        Ajax({
            url: "ajax/SetRecordAdvanceSettings.w",
            data: data,
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: this.initEntry,
                });
            }
        });
    };
    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        const {data} = this.state;
        const showItem = (name, value) => {
            let sTitle = "";
            let type = "input";
            let optsArr = [];
            switch (name) {
                case "url":
                    sTitle = "URL";
                    break;
                case "streamname":
                    sTitle = T.T_StreamName;
                    break;
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className="form-control" value={value}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control" value={value}
                                onChange={this.handleChange.bind(this, name)}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt.val} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>

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
                <div className="form-group row">
                    <div className="offset-5 offset-sm-3 col-7 col-sm-9">
                        <button className="btn" type="button" onClick={this.handleApply}>
                            {T.T_Apply}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default RecordAdvancedSettings;