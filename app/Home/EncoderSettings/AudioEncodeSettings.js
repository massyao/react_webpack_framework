import React from "react";
import T from "../../../common/Lang/T"
import Validation from "../../../common/Validation/Validation"

class AudioEncodeSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("Volume", -12, 12);
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
            switch (name) {
                case "audio_encodetype":
                    sTitle = T.T_Encode_Audio_Type;
                    type = "select";
                    optsArr = [
                        {val: 5, text: "AAC"},
                    ];
                    break;
                case "audio_samplerate":
                    sTitle = T.T_Encode_Audio_Sampling_Bitrate + "(KHz)";
                    type = "select";
                    optsArr = [
                        {val: 1, text: "44.1"},
                    ];
                    break;
                case "audio_volume":
                    sTitle = T.T_Encode_Volume + "(dB)";
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


export default AudioEncodeSettings;