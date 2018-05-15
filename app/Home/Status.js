import React from "react";
import InputStatus from "./Status/InputStatus";
import OutputStatus from "./Status/OutputStatus";
import SystemInfo from "./Status/SystemInfo";
import {Ajax, CollapseHeader, T} from "../";


class Status extends React.Component {
    constructor() {
        super();
        this.state = {
            status: {
                "input_status": {
                    "video_input": "N/A",//视频输入
                    "video_resolution": "N/A",//视频分辨率
                    "audio_input": "N/A",//音频输入
                    "audio_samplerate": "N/A"//音频采样率，单位 KHz
                },
                "output_status": {
                    "video_resolution": "N/A",//视频分辨率
                    "video_bitrate": "N/A",//视频码率，单位 kbps
                    "audio_samplerate": "N/A"//音频采样率，单位 KHz
                },
                "system_info": {
                    "software_version": "N/A",//软件版本号
                    "hardware_version": "N/A"//硬件版本号
                }
            },
            isCollapsed: [false, true, true],  // 初始折叠状态
        };
    }

    componentDidMount() {
        Ajax({
            url: "ajax/GetStatus.w",
            onSuccess: (data) => {
                this.setState({
                    status: data
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
        let data = this.state["status"];
        return <div className="container">
            <div className="list-group">
                <div className="list-group-item list-group-item-action">
                    Status
                </div>
                <div className="list-group right-nav-title">
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Input}
                    </CollapseHeader>
                    <InputStatus collapse={isCollapsed[n]} data={data["input_status"]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Output}
                    </CollapseHeader>
                    <OutputStatus collapse={isCollapsed[n]} data={data["output_status"]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_System}
                    </CollapseHeader>
                    <SystemInfo collapse={isCollapsed[n]} data={data["system_info"]}/>
                </div>
            </div>
        </div>
    }
}

export default Status;