import React from "react";
import {Ajax, CollapseHeader, T} from "../";
import LiveStatus from "./UnitStatus/LiveStatus";
import RecordStatus from "./UnitStatus/RecordStatus";
import Balloons from "../../img/balloons.jpg";
import getUUID from "../../common/Util/getUUID";

class UnitStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            nuitstatus: {
                "live_status": {
                    "input_status": "N/A",//输入状态
                    "output_status": "N/A",//输出状态
                    "input": "N/A",//输入信号
                    "output": "N/A",//输出信号
                    "input_resolution": "",//输入分辨率
                    "output_resoultion": "",//输出分辨率
                    "live_stream_flag": 0 //live stream status
                },
                "record_status": {
                    "input_status": "N/A",//输入状态
                    "output_status": "N/A",//输出状态
                    "input": "N/A",//输入信号
                    "output_file": "N/A",//输出文件
                    "input_resolution": "",//输入分辨率
                    "output_resoultion": "",//输出分辨率
                    "record_flag": 0 //record status
                }
            },
            isCollapsed: [true, true],  // 初始折叠状态
        };
    }

    componentDidMount() {
        Ajax({
            url: "ajax/GetUnitStatus.w",
            onSuccess: (data) => {
                this.setState({
                    nuitstatus: data
                });
            }
        });
    }

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
        let data = this.state["nuitstatus"];

        return <div className="container">
            <div className="list-group">
                <div className="list-group-item list-group-item-action">
                    Status Init
                </div>
                <div className="list-group right-nav-title">
                    <div className="card-body">
                        <img src={Balloons + "?picture=" + getUUID()} alt="Balloons" title="Picture Precview"/>
                    </div>
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Live_Stream}
                    </CollapseHeader>
                    <LiveStatus collapse={isCollapsed[n]} data={data["live_status"]}/>
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Record_Stream}
                    </CollapseHeader>
                    <RecordStatus collapse={isCollapsed[n]} data={data["record_status"]}/>
                </div>
            </div>
        </div>
    }
}

export default UnitStatus;