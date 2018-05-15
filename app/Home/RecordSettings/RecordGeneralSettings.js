import React from "react";
import T from "../../../common/Lang/T";

class RecordGeneralSettings extends React.Component {
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
        const showItem = (name, value) => {
            let sTitle = "";
            let type = "input";
            let optsArr = [];
            switch (name) {
                case "input":
                    sTitle = T.T_Input;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "HDMI"},
                        {val: 1, text: "YPbPr"},
                        {val: 2, text: "AV"},
                        {val: 3, text: "Auto"},
                    ];
                    break;
                case "recordmode":
                    sTitle = T.T_Record_Mode;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "Loop"},
                        {val: 1, text: "Size"},
                        {val: 2, text: "Time"},
                    ];
                    break;
                case "output":
                    sTitle = T.T_Output;
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
                    <label className="col-5 col-sm-3 col-form-label">{sTitle}:</label>
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

export default RecordGeneralSettings;