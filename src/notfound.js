import React, { Component } from "react";
import NavBar from "./layout/navbar";
export class NotFound extends Component {
  render() {
    return (
    <div className="text-center" style={{ fontFamily: "'Raleway', sans-serif",backgroundColor:'white'}}>
        <NavBar theme="black"/>
        <div style={{position:'fixed',top:'40vh',width:'100vw'}}>
        <div className="display-1">
            404
        </div>
        <h1>Oops ! , Page Not Found</h1>
        </div>
    </div>);
  }
}

export default NotFound;
