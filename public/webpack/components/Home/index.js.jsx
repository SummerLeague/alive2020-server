import React, { Component } from 'react';

import Account from "../Account";


class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          Home
        </h1>
        { true &&
          <Account forNewAccount={ true }/>
        }
      </div>
    );
  }
}


export default Home;
