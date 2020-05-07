import React, { Component } from "react";
import NavBar from "./layout/navbar";
import axios from "axios";
import $ from "jquery";
import './detailView.css';
import Prism from "prismjs";
import {FaFacebook,FaTwitter} from 'react-icons/fa'
import "./prism.css";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
export class DetailView extends Component {
  state = {
    post: null,
    errMsg: null,
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("/post/server/" + this.props.match.params.id)
      .then((res) => this.setState({ post: res.data }))
      .catch((err) => this.setState({ errMsg: err.message }));
    $("img").addClass("img-fluid");
   
  }
componentDidUpdate(){
  console.log(window.location.href)
  Prism.highlightAll();
  $("img").addClass("img-fluid");
  var getWindowOptions = function() {
    var width = 500;
    var height = 450;
    var left = (window.innerWidth / 2) - (width / 2);
    var top = (window.innerHeight / 2) - (height / 2);
  
    return [
      'resizable,scrollbars,status',
      'height=' + height,
      'width=' + width,
      'left=' + left,
      'top=' + top,
    ].join();
  };
  var fbBtn = document.querySelector('.facebook-share');
var title = encodeURIComponent('Hey everyone, come & see how good I look!');
var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '&title=' + title;
fbBtn.href = shareUrl; // 1

fbBtn.addEventListener('click', function(e) {
  e.preventDefault();
  var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
  win.opener = null; // 2
});
}
  render() {
    return (
      <div>
        <NavBar theme="black" />
        <div style={{position:'fixed',left:'20px',top:'40vh',width:'100px'}} className="row justify-content-center d-none d-md-block">
          <span className="text-muted col-12" style={{fontFamily: "'Raleway', sans-serif"}}>share</span>
   
        <a class="twitter-share-button col-12 row justify-content-center my-2" style={{color:'#1DA1F2',fontSize:"30px"}}
  href={"https://twitter.com/intent/tweet?text="+encodeURIComponent(window.location.href)}
  data-size="large">
<FaTwitter  className="col-auto hvr-buzz"/></a>

<a href="!#" className="facebook-share col-12 row justify-content-center my-2  hvr-buzz" style={{color:'#3b5998',fontSize:"30px"}} ><FaFacebook className="col-auto"/></a>
        </div>
        <Container className="p-4" style={{ marginTop: "60px" }}>
  
          {this.state.post !== null
            ? ReactHtmlParser(this.state.post.content)
            : null}
        </Container>
      </div>
    );
  }
}

export default withRouter(DetailView);
