import React from "react";
import {CollapseHeader, T, Ajax, IP} from "../";
import LiveStreamGeneralSettings from "./LiveSreamSettings/LiveStreamGeneralSettings";
import AudioEncodeSettings from "./EncoderSettings/AudioEncodeSettings";
import VideoEncodeSettings from "./EncoderSettings/VideoEncodeSettings";
import InputSettings from "./EncoderSettings/InputSettings";
import OutputSettings from "./EncoderSettings/OutputSettings";
import _ from "underscore";
import Layer from "../../component/Layer/Layer";
import Validation from "../../common/Validation/Validation"

let originalData = {};
class LiveSreamSettings extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {
                input: 0,//输入信号
                output: 0,//输出信号
                url: "N/A",//url
                stream_name: "N/A",//name
                presets: 0, //presets

                /*AudioEncodeSettings*/
                audio_encodetype: 0,//音频编码模式
                audio_samplerate: 0,//音频采样率，单位 KHz
                audio_volume: 0,//音频音量，单位 dB

                /*InputSettings*/
                video_input: 0,
                audio_input: 0,

                /*OutputSettings*/
                rtmp_enable: "",//启用 RTMP 输出
                rtmp_serverip: "",//RTMP 服务器地址
                rtmp_serverport: "",//RTMP 服务器端口
                // rtmp_appname:"",//RTMP 上传目录名
                rtmp_streamname: "",//RTMP 上传节点
                rtmp_username: "",//RTMP 上传用户名
                rtmp_password: "",//RTMP 上传密码

                /*VideoEncodeSettings*/
                video_encodetype: 0,//视频编码模式
                video_profile: 0,//视频类别
                video_resolution: "",//视频分辨率
                framerate: 0,//帧率，单位 FPS
                video_bitrate: 0,//视频码率，单位 kbps
                video_bitratemode: 0,//码率模式
                video_minbitrate: 0,//最小视频码率，单位 kbps
                video_maxbitrate: 0,//最大视频码率，单位 kbps

            },
            isCollapsed: [false, true, true, true, true, true]  // 初始折叠状态
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetLiveStreamSettings.w",
            onSuccess: (data) => {
                data["rtmp_serverip"] = IP.getIPFromApiValue(data["rtmp_serverip"]);
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
                case "url":
                case "streamname":
                case "audio_encodetype":
                case "audio_input":
                case "audio_samplerate":
                case "rtmp_streamname":
                case "rtmp_appname":
                case "rtmp_password":
                case "rtmp_username":
                case "video_bitratemode":
                case "video_encodetype":
                case "video_input":
                case "video_profile":
                    data[keys[i]] = data[keys[i]];
                    break;
                case "video_bitrate":
                    if (!Validation.isVideoRate(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Bitrate_Err(...Validation["range"].VideoRate)
                        });
                        return;
                    }
                    data[keys[i]] = data[keys[i]];
                    break;
                case "framerate":
                    if (!Validation.checkNumberRange(data[keys[i]], 5, 60)) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Frame_Err(5, 60)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "video_minbitrate":
                    if (!Validation.isVideoMinRate(data[keys[i]], this.state.data['video_bitrate'])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Min_Bitrate_Err(0, 0.75 * this.state.data['video_bitrate'])
                        });
                        return;
                    }
                    data[keys[i]] = data[keys[i]];
                    break;
                case "video_maxbitrate":
                    if (!Validation.isVideoMaxRate(data[keys[i]], this.state.data['video_bitrate'])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Max_Bitrate_Err(1.5 * this.state.data['video_bitrate'], 2.0 * this.state.data['video_bitrate'])
                        });
                        return;
                    }
                    data[keys[i]] = data[keys[i]];
                    break;
                case "rtmp_serverport":
                    if (!Validation.isIPPort(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_RTMP_Serverport_Err(...Validation["range"].IPPort)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "rtmp_serverip":
                    if (!Validation.isIP(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_IPAddress_FormatError
                        });
                        return;
                    }
                    data[keys[i]] = IP.getApiValueFromIP(data[keys[i]]);
                    break;
                default:
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
            }
        }
        //发送数据
        Ajax({
            url: "ajax/SetLiveStreamSettings.w",
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

        return <div className="container">
            <div className="list-group">
                <div className="list-group-item list-group-item-action">
                    {T.T_Broadcast}{T.T_Live_Stream} {T.T_Settings}
                </div>
                <div className="list-group right-nav-title">
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_General} {T.T_Settings}
                    </CollapseHeader>
                    <LiveStreamGeneralSettings collapse={isCollapsed[n]} data={this.state.data}/>

                </div>
                <div className="list-group right-nav-title">
                    <div className="list-group-item list-group-item-action">
                        {T.T_Advanced} {T.T_Settings}
                    </div>
                    <div className="list-group right-nav-title">
                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                            {T.T_Input}
                        </CollapseHeader>
                        <InputSettings collapse={isCollapsed[n]} data={this.state.data}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                            {T.T_Output}
                        </CollapseHeader>
                        <OutputSettings collapse={isCollapsed[n]} data={this.state.data}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                            {T.T_Encode_Video}
                        </CollapseHeader>
                        <VideoEncodeSettings collapse={isCollapsed[n]} data={this.state.data}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                            {T.T_Encode_Audio}
                        </CollapseHeader>
                        <AudioEncodeSettings collapse={isCollapsed[n]} data={this.state.data}/>
                    </div>
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

export default LiveSreamSettings;