import React from "react";
import {CollapseHeader, T, Ajax} from "../";
import RecordGeneralSettings from "./RecordSettings/RecordGeneralSettings";
import Layer from "../../component/Layer/Layer";
import _ from "underscore";

let originalData = {};
class RecordSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                input: 0,//输入信号
                output: "N/A",//输出信号
                recordmode: 0//recordmode
            },
            isCollapsed: [false, true]  // 初始折叠状态
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetRecordSettings.w",
            onSuccess: (data) => {
                this.setState({
                    data
                });
                originalData = $.extend(true, {}, this.state.data);
            }
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
        //校验
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "output":
                    data[keys[i]] = data[keys[i]];
                    break;
                default:
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
            }
        }


        //发送数据
        Ajax({
            url: "ajax/SetRecordSettings.w",
            data: data,
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: this.initEntry,
                });
            }
        });
    };

    handleCollapse = (index) => {
        const {isCollapsed} = this.state;
        isCollapsed[index] = !isCollapsed[index];
        this.setState({
            isCollapsed: isCollapsed,
        });
    };

    render() {

        const {isCollapsed} = this.state;
        let n = -1;

        return <div className="container" >
            <div className="list-group" >
                <div className="list-group-item list-group-item-action">
                    {T.T_Record} {T.T_Settings}
                </div>
                <div className="list-group right-nav-title">
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)} >
                        {T.T_General} {T.T_Settings}
                    </CollapseHeader>
                    <RecordGeneralSettings collapse={isCollapsed[n]} data={this.state.data}/>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group row">
                    <div className="offset-5 offset-sm-3 col-7 col-sm-9">
                        <button className="btn" type="button" onClick={this.handleApply}>
                            {T.T_Apply}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default RecordSettings;