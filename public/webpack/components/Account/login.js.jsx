import React, { Component } from 'react';
import axios from "axios";
import { bindAll } from "underscore";


class Login extends Component {

  constructor(props) {
    super(props);

    bindAll(
      this,
      "handleInputChange",
      "handleSubmit"
    );

    this.state = {
      username : "",
      password : ""
    };
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post("/api/v1/login", {
      username : this.state.username,
      password : this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
  }

  render() {
    return (
      <div>
        <h1>
          Log in
        </h1>
        <form method="post" onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={ this.state.username }
            onChange={this.handleInputChange} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={ this.state.password }
            onChange={this.handleInputChange} />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}


export default Login;
