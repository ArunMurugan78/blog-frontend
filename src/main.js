import React, { Component } from "react";
import Post from "./posts";
import {Link} from 'react-router-dom'
import NavBar from "./layout/navbar";
import "./main.css";
export class Root extends Component {
  render() {
    return (
      <div>
        <NavBar theme="black" />
        <Post />
        {/* <Link to="/post/new">
        <div style={{backgroundColor:'#00adb5',position:'fixed',top:'100px',right:'100px'}} className="p-2 shadow m-2 rounded-circle d-none d-md-block createPost">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 0 24 24"
          width="30"
          className="rounded-circle"
        >
          <path d="M0 0h24v24H0V0z" fill="#00adb5" />
          <path fill="white"d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
        </div>
        </Link> */}
     
      </div>
      
    );
  }
}

export default Root;
