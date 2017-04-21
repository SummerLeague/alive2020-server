import React, { Component } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client/socket.io";
import _ from "underscore";


// Create Component.
const App = class extends Component {

  constructor(props) {
    super(props);

    this.setupIO = this.setupIO.bind(this);
    this.handleLivePhotos = this.handleLivePhotos.bind(this);

    this.state = {
      livePhotos : []
    };

    this.setupIO();
  }

  setupIO() {
    const options = {
            "force new connection": true,
            "heartbeat timeout": 10
          },
          connection = io("", options);

    connection.on("livePhotos", this.handleLivePhotos);
  }

  handleLivePhotos(livePhotos) {
    let currentLivePhotos = _.clone(this.state.livePhotos).reverse();

    console.log(livePhotos);

    this.setState({
      livePhotos : _.last(_.union(currentLivePhotos, livePhotos), 10).reverse()
    });
  }

  render() {
    return (
      <form method="post" encType="multipart/form-data" action="/api/v1/live_photos">
        <input type="file" name="thumbnail"/>
        <input type="submit"/>
      </form>

    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
