import React from "react";
import T from "../../../common/Lang/T"

class InputStatus extends React.Component {

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        let data = this.props["data"];

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_Encode_Video}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext" value={data["video_input"]}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_Encode_Video_Resolution}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext"
                               value={data["video_resolution"]}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_Encode_Audio}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext" value={data["audio_input"]}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_Encode_Audio_Sampling_Bitrate}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext"
                               value={data["audio_samplerate"]}/>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default InputStatus;