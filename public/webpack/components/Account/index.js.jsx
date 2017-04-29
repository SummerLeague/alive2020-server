import React, { Component } from "react";

import Login from "./login";
import New from "./new";


class Account extends Component {

  constructor(props) {
    super(props);

    this.toggleAction = this.toggleAction.bind(this);

    this.state = {
      forNewAccount : props.forNewAccount || props.route.path == "/account/new"
    }
  }

  currentActionView() {
    const forNewAccount = this.state.forNewAccount;

    return forNewAccount ? <New/> : <Login/>;
  }

  toggleAction(e) {
    e.preventDefault();

    this.setState((previousState, currentProps) => {
      return { forNewAccount : !previousState.forNewAccount };
    });
  }

  toggleActionView() {
    let innerContent = null,
        actionContent = {
          text : "Need an account?",
          linkText : "Sign up"
        };

    if (this.state.forNewAccount) {
      actionContent.text = "Have an account?";
      actionContent.linkText = "Log in";
    }

    return (
      <span>
        { actionContent.text }
        <a href="#" onClick={ this.toggleAction }>
          { actionContent.linkText }
        </a>
      </span>
    );
  }

  render() {
    return (
      <div>
        <div>
          { this.currentActionView() }
        </div>
        <div>
          { this.toggleActionView() }
        </div>
      </div>
    );
  }
}


export default Account;
