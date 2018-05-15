import React from "react";
import {Route, withRouter} from "react-router-dom";
import {Ajax, Lang} from "./";

import Home from "./Home";
import Login from "./Login";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isInit: false,
        };
    }

    componentDidMount() {
        Ajax({
            url: "ajax/GetHomeInfo.w",
            onSuccess: (data) => {
                Lang.setLang(data["lang"]);
                this.setState({
                    isInit: true,
                });
            },
        });
    }

    render() {
        const {isInit} = this.state;
        return isInit ? <Home/> : <Route path="/login" component={Login}/>;
    }
}

export default withRouter(App);