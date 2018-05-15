import React from "react";
import {Ajax, T} from "../../";
import Layer from "../../../component/Layer/Layer";

class Operation extends React.Component {

    handleReboot = () => {
        Layer.confirm({
            content: T.C_Reboot_This_Module,
            onEnter: () => {
                Ajax({
                    url: "ajax/SystemReboot.w",
                    onSuccess: () => {
                    }
                });
            }
        })
    };

    handleDefault = () => {
        Layer.confirm({
            content: T.C_System_Restore_Factory_Settings,
            onEnter: () => {
                Ajax({
                    url: "ajax/SystemDefault.w",
                    onSuccess: () => {
                    }
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
            <div className="form-group row">
                <button type="button" className="btn ml-5" onClick={this.handleReboot}>
                    {T.T_System_Reboot}
                </button>
                <button type="button" className="btn ml-5"
                        onClick={this.handleDefault}>
                    {T.T_System_Factory_Settings}
                </button>
            </div>
        </div>
    }
}

export default Operation;