import React from "react";
import InputSettings from "./EncoderSettings/InputSettings";
import VideoEncodeSettings from "./EncoderSettings/VideoEncodeSettings";
import AudioEncodeSettings from "./EncoderSettings/AudioEncodeSettings";
import OutputSettings from "./EncoderSettings/OutputSettings";
import {CollapseHeader, T} from "../";

class EncoderSetting extends React.Component {
    constructor() {
        super();
        this.state = {
            isCollapsed: [false, true, true, true, true],  // 初始折叠状态
        };
    }


    handleCollapse = (index) => {
        const {isCollapsed} = this.state;
        isCollapsed[index] = !isCollapsed[index];
        this.setState({
            isCollapsed: isCollapsed,
        });
    };

    render() {

        const {isCollapsed} = this.state;
        let n = -1;

        return <div className="container">
            <div className="list-group">
                <div className="list-group-item list-group-item-action">
                    Encoder Settings
                </div>
                <div className="list-group right-nav-title">
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Input}
                    </CollapseHeader>
                    <InputSettings collapse={isCollapsed[n]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Output}
                    </CollapseHeader>
                    <OutputSettings collapse={isCollapsed[n]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Encode_Video}
                    </CollapseHeader>
                    <VideoEncodeSettings collapse={isCollapsed[n]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Encode_Audio}
                    </CollapseHeader>
                    <AudioEncodeSettings collapse={isCollapsed[n]}/>
                </div>
            </div>
        </div>
    }
}

export default EncoderSetting;
