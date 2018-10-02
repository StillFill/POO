import React, { Component } from "react";
import PropTypes from "prop-types";
import userOptions, { adminOptions } from "../../modules/user-options";

class UserOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };
  }

  render() {
    let options = userOptions;
    const user = Meteor.user();
    if (user && user.type === "admin") {
      options = adminOptions;
    }
    const isMobile = screen.width <= 768;
    if (!user && isMobile) {
      options = this.props.loginOptions;
    }
    return (
      <div className="user-options">
        <div
          className="options-click"
          onClick={() =>
            this.setState({ showOptions: !this.state.showOptions })
          }
        >
          <i className="fa fa-bars" />
        </div>
        {this.state.showOptions ? (
          <div className="options-container">
            {options.map(item => (
              <div
                className="option-row"
                onClick={item.action ? () => item.action() : null}
              >
                <div>{item.icon ? <i className={item.icon} /> : null}</div>
                <div>{item.label || null}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

UserOptions.propTypes = {
  loginOptions: PropTypes.array
};

UserOptions.defaultProps = {};

export default UserOptions;
