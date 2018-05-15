import React from "react";
import {T, Ajax, Lang} from "../../";
import Layer from "../../../component/Layer/Layer";
import _ from "underscore";

const clazz = {
    inputLabel: "col-5 col-sm-2 col-form-label",
    inputDiv: "col-5 col-sm-10",
    offsetDiv: "offset-5 offset-sm-2 col-5 col-sm-10",
};

let originalLang = {};
class Language extends React.Component {

    constructor() {
        super();
        this.state = {
            lang: Lang.getLang(),
        };
        originalLang = this.state.lang;
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    };

    handleApply = () => {
        if (_.isEqual(this.state.lang, originalLang)) {
            Layer.msg({
                icon: 0,
                content: T.A_Settings_Parameter_NoChange
            });
            return false;
        }

        Ajax({
            url: "ajax/SetLang.w",
            data: {
                lang: this.state.lang,
            },
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: () => window.location.reload(),
                });
            }
        })
    };

    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <form>
                <div className="form-group row">
                    <label className={clazz.inputLabel}>{T.T_Lang}: </label>
                    <div className={clazz.inputDiv}>
                        <select className="form-control"
                                name="lang"
                                value={this.state.lang}
                                onChange={this.handleChange}>
                            <option value="zh_CN">{T.T_Lang_Chinese}</option>
                            <option value="en_US">English</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className={clazz.offsetDiv}>
                        <button type="button" className="btn" onClick={this.handleApply}>{T.T_Apply}</button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default Language;