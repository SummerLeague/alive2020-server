import React, { Component } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client/socket.io";
import _ from "underscore";


// Create Component.
const App = class extends Component {

  constructor(props) {
    super(props);

    this.setupIO = this.setupIO.bind(this);
    this.handleLivevideo = this.handleLivevideo.bind(this);

    this.state = {
      livevideos : []
    };

    this.setupIO();
  }

  setupIO() {
    const options = {
            "force new connection": true,
            "heartbeat timeout": 10
          },
          connection = io("", options);

    connection.on("livevideo", this.handleLivevideo);
  }

  handleLivevideo(livevideos) {
    let currentLivevideos = _.clone(this.state.livevideos).reverse();

    this.setState({
      livevideos : _.last(_.union(currentLivevideos, livevideos), 10).reverse()
    });
  }

  render() {
    return (
      <form method="post" encType="multipart/form-data" action="/api/v1/livevideos">
        <input type="file" name="thumbnail"/>
        <input type="submit"/>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
