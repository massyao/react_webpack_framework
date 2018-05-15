import React from "react";
import {Ajax} from "../../";
import T from "../../../common/Lang/T"
import Layer from "../../../component/Layer/Layer";

class Upgrade extends React.Component {

    constructor() {
        super();
        this.state = {
            fileName: "",
        };
    }

    componentDidMount() {

    }

    handleUpFileName(event) {
        let e = event.target;
        this.setState({
            fileName: e.value
        });
    }

    handleCheckFile(event) {
        let that = this;
        if (this.state.fileName === "") {
            Layer.alert({
                icon: 0,
                content: T.A_Please_Select_File,
            });
            event.preventDefault();
            return false;
        }

        that.upgradeComplete = () => {
            /*Layer.alert({
             icon: 2,
             content: T.A_File_Upgrade_Failed,
             });*/
        };

        that.upgradeProgressBar = Layer.progress({
            content: T.A_Uploading_File,
            total: 60,
            onComplete: () => {
                that.upgradeComplete();
            }
        });

        that.upgradeProgressBar.start();

        return true;
    }

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        return <div className="card-body">
            <iframe name="aaa" style={{display: "none"}}></iframe>
            <form action="ajax/SystemUpgrade.w"
                  method="POST"
                  target="aaa"
                  encType="multipart/form-data"
                  onSubmit={this.handleCheckFile.bind(this)}>

                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputFile" name="file"
                               onChange={this.handleUpFileName.bind(this)}/>
                        <label className="custom-file-label" htmlFor="inputFile">{this.state.fileName}</label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn" type="submit">{T.T_System_Upgrade}</button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default Upgrade;