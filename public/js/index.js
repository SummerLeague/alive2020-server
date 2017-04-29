// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import io from "socket.io-client/socket.io";
// import _ from "underscore";


// // Create Component.
// const App = class extends Component {

//   constructor(props) {
//     super(props);

//     this.setupIO = this.setupIO.bind(this);
//     this.handleLivePhotos = this.handleLivePhotos.bind(this);
//     this.readyLastLivePhoto = this.readyLastLivePhoto.bind(this);

//     this.state = {
//       livePhotos : [],
//       imageStatus: "loading"
//     };

//     this.setupIO();
//   }

//   setupIO() {
//     const options = {
//             "force new connection": true,
//             "heartbeat timeout": 10
//           },
//           connection = io("", options);

//     connection.on("livePhotos", this.handleLivePhotos);
//   }

//   handleImageLoadReady() {
//     this.setState({ imageStatus : "loaded" });
//   }

//   handleImageLoadError() {
//     this.setState({ imageStatus : "error" });
//   }

//   handleLivePhotos(livePhotos) {
//     let currentLivePhotos = _.clone(this.state.livePhotos).reverse();

//     this.setState({
//       imageStatus : "loading",
//       livePhotos : _.last(_.union(currentLivePhotos, livePhotos), 10).reverse()
//     }, () => {
//       this.readyLastLivePhoto();
//     });

//   }

//   readyLastLivePhoto() {
//     if (this.state.livePhotos.length) {
//       const lastLivePhoto = this.state.livePhotos[this.state.livePhotos.length - 1],
//             tmpImage = new Image();

//       tmpImage.onload = this.handleImageLoadReady.bind(this);
//       tmpImage.onerror = this.handleImageLoadError.bind(this);
//       tmpImage.src = lastLivePhoto.path;
//     }
//   }

//   render() {

//     return (
//       <div>
//         { this.state.imageStatus == "loaded" &&
//           <img src={ this.state.livePhotos[0].path }/>
//         }
//       </div>
//     );
//   }
// }


// ReactDOM.render(<App />, document.querySelector(".container"));
