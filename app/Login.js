import React from "react";
import {withRouter} from "react-router-dom";

class Login extends React.Component {

    handleLogin = () => {
        const {history} = this.props;
        history.push("/home");
    };

    render() {
        return <div>
            <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Login</button>
        </div>
    }
}

export default withRouter(Login);