import React, { Component } from "react";
import axios from "axios";


class New extends Component {

  handleSubmit(e) {
    e.preventDefault();

    axios.post("/api/v1/users", {
      username : e.target.username.value,
      password : e.target.password.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>
          New Account
        </h1>
        <form method="post" onSubmit={ this.handleSubmit }>
          <input type="text" name="username"/>
          <input type="password" name="password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}


export default New;
