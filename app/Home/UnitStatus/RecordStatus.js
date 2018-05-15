import React from "react";
import {Ajax} from "../../";
import T from "../../../common/Lang/T"

class RecordStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: props.data['record_flag']
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            flag: newProps.data['record_flag']
        });
    }

    handleApply = () => {
        this.setState({
            flag: !(this.state.flag)
        });

        Ajax({
            url: "ajax/ToggleRecord.w",
            data: {
                "record_flag": this.state.flag
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
                                {this.state.flag ? " Start Recording" : " Stop Recording"}
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
                    <label className="col-3 col-form-label">{T.T_Output} {T.T_File}: </label>
                    <input type="text" readOnly className="col-3 form-control-plaintext" value={data["output_file"]}/>
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

export default RecordStatus;