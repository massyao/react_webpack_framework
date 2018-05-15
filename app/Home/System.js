import React from "react";
import SystemParameter from "./System/SystemParameter";
//import Language from "./System/Language";
import Upgrade from "./System/Upgrade";
import Operation from "./System/Operation";
import {CollapseHeader, T} from "../";

class System extends React.Component {

    constructor() {
        super();
        this.state = {
            isCollapsed: [false, false, false, false],  // 初始折叠状态
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
                    {T.T_System_Settings}
                </div>
                <div className="list-group right-nav-title">
                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Parameter_Info}
                    </CollapseHeader>
                    <SystemParameter collapse={isCollapsed[n]}/>

                   {/* <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_Lang}
                    </CollapseHeader>
                    <Language collapse={isCollapsed[n]}/>*/}

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_System_Upgrade}
                    </CollapseHeader>
                    <Upgrade collapse={isCollapsed[n]}/>

                    <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={this.handleCollapse.bind(this, n)}>
                        {T.T_System_Operation}
                    </CollapseHeader>
                    <Operation collapse={isCollapsed[n]}/>
                </div>
            </div>
        </div>
    }
}

export default System;