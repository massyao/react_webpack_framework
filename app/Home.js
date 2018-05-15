import React from "react";
import {Route, NavLink} from "react-router-dom";
import Status from "./Home/Status";
import EncoderSetting from "./Home/EncoderSetting";
import System from "./Home/System";
import UnitStatus from "./Home/UnitStatus";
import LiveSreamSettings from "./Home/LiveSreamSettings";
import RecordSettings from "./Home/RecordSettings";
import {HeaderLogo, T} from "./";

class Home extends React.Component {
    state = {
        isShowLeftNav: false
    };
    toggleLeftNav = () => {
        this.setState({
            isShowLeftNav: !this.state.isShowLeftNav
        });
    };

    render() {
        return <div className="home">
            <nav className="navbar navbar-expand-sm navbar-dark">
                <span
                    className={this.state.isShowLeftNav ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-align-justify"}
                    onClick={this.toggleLeftNav}/>
                <a className="navbar-brand product-name" href="javascript:void(0)">
                    NB200-E
                </a>
                <a className="navbar-brand" href="javascript:void(0)">
                    <img src={HeaderLogo} height="30" className="d-inline-block align-top" alt="Logo"/>
                </a>
            </nav>
            <div className={this.state.isShowLeftNav ? "over" : "hidden"} onClick={this.toggleLeftNav}/>
            <div className={this.state.isShowLeftNav ? "leftNav" : "leftNav hide"}>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/unitstatus">
                            {T.T_Status} {T.T_Init}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/livestreamsettings">
                            {T.T_Broadcast}{T.T_Live_Stream} {T.T_Settings}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/record_settings">
                            {T.T_Record} {T.T_Settings}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/system">
                            {T.T_System_Settings}
                        </NavLink>
                    </li>

                   {/* <li className="list-group-item">
                        <NavLink exact className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/">
                            {T.T_Status}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/setting">
                            {T.T_Encoder_Settings}
                        </NavLink>
                    </li>*/}

                </ul>
            </div>
            <br/>
            <Route exact path="/" component={Status}/>
            <Route path="/setting" component={EncoderSetting}/>
            <Route path="/system" component={System}/>
            <Route path="/unitstatus" component={UnitStatus}/>
            <Route path="/livestreamsettings" component={LiveSreamSettings}/>
            <Route path="/record_settings" component={RecordSettings}/>
        </div>
    }
}

export default Home;