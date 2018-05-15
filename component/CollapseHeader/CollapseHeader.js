import React from "react";

class CollapseHeader extends React.Component {
    render() {
        const {collapse, handleCollapse, children} = this.props;
        const glyphicon = "glyphicon " + (collapse ? "glyphicon-chevron-down" : "glyphicon-chevron-up");
        return <a className="list-group-item list-group-item-action "
                  href="javascript:void(0)"
                  onClick={handleCollapse}>
            {children}
            <button type="button" className="btn btn-link btn-sm">
                <span className={glyphicon} aria-hidden={true}/>
            </button>
        </a>
    }
}

export default CollapseHeader;