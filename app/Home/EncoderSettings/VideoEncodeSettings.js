import React from "react";
import T from "../../../common/Lang/T"
import Validation from "../../../common/Validation/Validation"

class VideoEncodeSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("VideoRate", 16, 12000);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            data: newProps.data
        });
    }

    handleChange = (name, event) => {
        let {data} = this.state;
        data[name] = event.target.value;

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
            let sTitle = "";
            let type = "input";
            let optsArr = [];
            let attr = {};

            switch (name) {
                case "video_encodetype":
                    sTitle = T.T_Encode_Video_Type;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "H264"},
                    ];
                    break;
                case "video_profile":
                    sTitle = T.T_Encode_Profile;
                    type = "select";
                    optsArr = [
                        {val: 2, text: "High"},
                            {val: 1, text: "Main"},
                        {val: 0, text: "Baseline"},
                    ];
                    break;
                case "video_resolution":
                    sTitle = T.T_Encode_Video_Resolution;
                    type = "select";
                    optsArr = [
                        {val: "1920x1080", text: "1920x1080"},
                        {val: "1680x1200", text: "1680x1200"},
                        {val: "1600x900", text: "1600x900"},
                        {val: "1440x1050", text: "1440x1050"},
                        {val: "1440x900", text: "1440x900"},
                        {val: "1360x768", text: "1360x768"},
                        {val: "1280x720", text: "1280x720"},
                        {val: "1280x800", text: "1280x800"},
                        {val: "1280x768", text: "1280x768"},
                        {val: "1024x768", text: "1024x768"},
                        {val: "1024x576", text: "1024x576"},
                        {val: "960x540", text: "960x540"},
                        {val: "850x480", text: "850x480"},
                        {val: "800x600", text: "800x600"},
                        {val: "720x576", text: "720x576"},
                        {val: "720x540", text: "720x540"},
                        {val: "720x480", text: "720x480"},
                        {val: "720x404", text: "720x404"},
                        {val: "704x576", text: "704x576"},
                        {val: "640x480", text: "640x480"},
                        {val: "640x360", text: "640x360"},
                        {val: "480x270", text: "480x270"},
                        {val: "auto", text: T.T_Settings_Automatic},
                    ];
                    break;
                case "framerate":
                    sTitle = T.T_Encode_VideoFrameRate + "(FPS)";
                    break;
                case "video_bitrate":
                    sTitle = T.T_Encode_Video_Bitrate + "(kbps)";
                    break;
                case "video_bitratemode":
                    sTitle = T.T_Encode_Video_Mode;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "CBR"},
                        {val: 1, text: "VBR"},
                    ];
                    break;
                case "video_minbitrate":
                    sTitle = T.T_Encode_Video_Min_Bitrate + "(kbps)";
                    attr["disabled"] = (parseInt(data["video_bitratemode"]) === 0);
                    break;
                case "video_maxbitrate":
                    sTitle = T.T_Encode_Video_Max_Bitrate + "(kbps)";
                    attr["disabled"] = (parseInt(data["video_bitratemode"]) === 0);
                    break;
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className="form-control form-control-sm" value={value} {...attr}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={value}
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
            </form>
        </div>
    }
}


export default VideoEncodeSettings;