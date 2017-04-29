import React, { Component } from 'react';


class Show extends Component {
  render() {
    return (
      <div>
        <h1>
          { this.props.routeParams.username }
        </h1>
      </div>
    );
  }
}


export default Show;
