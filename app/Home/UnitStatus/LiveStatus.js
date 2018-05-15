import React from "react";
import {Ajax} from "../../";
import T from "../../../common/Lang/T";

class LiveStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: props.data['live_stream_flag']
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            flag: newProps.data['live_stream_flag']
        });
    }

    handleApply = () => {
        this.setState({
            flag: !(this.state.flag)
        });

        Ajax({
            url: "ajax/ToggleLive.w",
            data: {
                "live_stream_flag": this.state.flag
            },
            onSuccess: () => {
            }
        });
    };

    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        let data = this.props["data"];
        let inputStatusClass = (data.input_status === "good" ? " input-status" : " output-status");
        let outputStatusClass = (data.output_status === "good" ? " input-status" : " output-status");

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <div className="offset-5 offset-sm-5 col-7 col-sm-9">
                        <button type="button"
                                className={ this.state.flag ? "btn btn-success btn-xs" : "btn btn-stop btn-xs"}
                                onClick={this.handleApply}>
                            <span className={this.state.flag ? "glyphicon glyphicon-play" : "glyphicon glyphicon-stop"}>
                                {this.state.flag ? T.T_Start_Live_Stream : T.T_Stop_Live_Stream}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-3 col-form-label">{T.T_Input} {T.T_Status}: </label>
                    <input type="text" readOnly className={"col-3 form-control-plaintext" + inputStatusClass}
                           value={data["input_status"]}/>
                    <label className="col-3 col-form-label">{T.T_Output} {T.T_Status}: </label>
                    <input type="text" readOnly className={"col-3 form-control-plaintext" + outputStatusClass}
                           value={data["output_status"]}/>
                </div>
                <div className="form-group row">
                    <label className="col-3 col-form-label">{T.T_Input}: </label>
                    <input type="text" readOnly className="col-3 form-control-plaintext" value={data["input"]}/>
                    <label className="col-3 col-form-label">{T.T_Output}: </label>
                    <input type="text" readOnly className="col-3 form-control-plaintext" value={data["output"]}/>
                </div>
                <div className="form-group row">
                    <label className="col-3 col-form-label">{T.T_Input} {T.T_Resolution}: </label>
                    <input type="text" readOnly className="col-3 form-control-plaintext"
                           value={data["input_resolution"]}/>
                    <label className="col-3 col-form-label">{T.T_Output} {T.T_Resolution}: </label>
                    <input type="text" readOnly className="col-3 form-control-plaintext"
                           value={data["output_resoultion"]}/>
                </div>
            </form>
        </div>
    }
}

export default LiveStatus;