import React from "react";
import T from "../../../common/Lang/T"

class InputSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
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
        const optsArr = [
            {val: 1, text: "HDMI"},
        ];

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <label className="col-5 col-sm-3 col-form-label">{T.T_Encode_Video}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={data["video_input"]}
                                onChange={this.handleChange.bind(this, "video_input")}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-5 col-sm-3 col-form-label">{T.T_Encode_Audio}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={data["audio_input"]}
                                onChange={this.handleChange.bind(this, "audio_input")}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default InputSettings;