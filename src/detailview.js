import React, { Component } from "react";
import NavBar from "./layout/navbar";
import axios from "axios";
import $ from "jquery";
import Prism from "prismjs";
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
  Prism.highlightAll();
  $("img").addClass("img-fluid");
}
  render() {
    return (
      <div>
        <NavBar theme="black" />
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
