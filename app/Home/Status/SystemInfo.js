import React from "react";
import T from "../../../common/Lang/T"

class OutputStatus extends React.Component {
    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        let data = this.props["data"];

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_System_Software_Version}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext"
                               value={data["software_version"]}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-5 col-form-label">{T.T_System_Hardware_Version}: </label>
                    <div className="col-7">
                        <input type="text" readOnly className="form-control-plaintext"
                               value={data["hardware_version"]}/>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default OutputStatus;