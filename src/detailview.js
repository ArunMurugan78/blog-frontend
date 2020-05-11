import React, { Component } from "react";
import NavBar from "./layout/navbar";

import $ from "jquery";
import "./detailView.css";
import Prism from "prismjs";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import "./prism.css";
import { Container, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { withAlert } from "react-alert";

import {
  SET_LIKE,
  DEL_LIKE,
  DEL_BOOKMARK,
  SET_BOOKMARK,
} from "./action/actionTypes";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";

import { connect } from "react-redux";
import { setLike, setBookmark } from "./action/actionCreators";
import { Link } from "react-router-dom";
export class DetailView extends Component {
  state = {
    post: null,
    errMsg: null,
    isLoading: false,
    is_liked: false,
    is_bookmarked: false,
  };
  likeHandler = (id) => {
    if (this.props.state.isAuthenticated) {
      if (this.state.is_liked) {
        this.props.toggleLike(id, DEL_LIKE);
        this.setState({ is_liked: false });
      } else {
        this.props.toggleLike(id, SET_LIKE);
        this.setState({ is_liked: true });
      }
    } else {
      this.props.alert.info("Sign in/ Sign Up to Like !");
      this.props.history.push("/continueWith");
    }
  };
  bookmarkHandler(id) {
    if (this.props.state.isAuthenticated) {
      if (this.state.is_bookmarked) {
        this.props.toggleBookmark(id, DEL_BOOKMARK);
        this.setState({ is_bookmarked: false });
      } else {
        this.props.toggleBookmark(id, SET_BOOKMARK);
        this.setState({ is_bookmarked: true });
        this.props.alert.success("Bookmarked !");
      }
    }
  }
  componentDidMount() {
    let is_liked = false;
    if (this.props.state.isAuthenticated) {
      if (
        this.props.state.user.liked.reduce((total, currentvalue) => {
          if (currentvalue.postID == this.props.match.params.id) {
            return true;
          } else return total;
        }, false)
      ) {
        is_liked = true;
      } else {
        is_liked = false;
      }
      if (
        this.props.state.user.bookmarked.reduce((total, currentvalue) => {
          if (currentvalue.postID == this.props.match.params.id) {
            return true;
          } else return total;
        }, false)
      ) {
        this.setState({ is_bookmarked: true });
      } else {
        this.setState({ is_bookmarked: false });
      }
    }
    console.log(this.props);
    axios
      .get("/post/server/" + this.props.match.params.id)
      .then((res) => this.setState({ post: res.data, isLoading: false }))
      .catch((err) => this.setState({ errMsg: err.message, isLoading: false }));
    this.setState({ isLoading: true, is_liked: is_liked });
    $("img").addClass("img-fluid");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(window.location.href);
    Prism.highlightAll();
    $("img").addClass("img-fluid");
    var getWindowOptions = function () {
      var width = 500;
      var height = 450;
      var left = window.innerWidth / 2 - width / 2;
      var top = window.innerHeight / 2 - height / 2;

      return [
        "resizable,scrollbars,status",
        "height=" + height,
        "width=" + width,
        "left=" + left,
        "top=" + top,
      ].join();
    };
    var fbBtn = document.querySelector(".facebook-share");
    var title = encodeURIComponent("Hey everyone, come & see how good I look!");
    var shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      window.location.href +
      "&title=" +
      title;
    fbBtn.href = shareUrl; // 1

    fbBtn.addEventListener("click", function (e) {
      e.preventDefault();

      var win = window.open(shareUrl, "ShareOnFb", getWindowOptions());
      win.opener = null; // 2
    });
    if (
      JSON.stringify(prevProps) != JSON.stringify(this.props) ||
      JSON.stringify(prevState) != JSON.stringify(this.state)
    ) {
      let is_liked = false,
        is_bookmarked = false;
      if (this.props.state.isAuthenticated) {
        if (
          this.props.state.user.liked.reduce((total, currentvalue) => {
            if (currentvalue.postID == this.props.match.params.id) {
              return true;
            } else return total;
          }, false)
        ) {
          is_liked = true;
        } else {
          is_liked = false;
        }

        if (
          this.props.state.user.bookmarked.reduce((total, currentvalue) => {
            if (currentvalue.postID == this.props.match.params.id) {
              return true;
            } else return total;
          }, false)
        ) {
          is_bookmarked = true;
        } else {
          is_bookmarked = false;
        }
      }
      this.setState({ is_liked, is_bookmarked });
    }
  }
  render() {
    return (
      <div>
        <NavBar theme="black" />
        {this.state.isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner
              animation="border"
              style={{
                position: "fixed",
                top: "40vh",
                height: "100px",
                width: "100px",
              }}
            />
          </div>
        ) : null}
        <div>
          <div
            style={{
              position: "fixed",
             left:'30px',
              top: "40vh",
              width: "50px",
            }}
            className="row justify-content-center d-none d-md-block"
          >
            {!this.state.isLoading ? (
              <div
                className="text-danger col-12  row justify-content-center bg-light py-2"
                style={{marginLeft:0}}
                onClick={() => this.likeHandler(this.props.match.params.id)}
              >
                {this.props.state.isAuthenticated ? (
                  this.state.is_liked ? (
                    <AiFillHeart
                      style={{ fontSize: "27px" }}
                      className="my-2 hvr-pulse-grow"
                    />
                  ) : (
                    <AiOutlineHeart
                      style={{ fontSize: "27px" }}
                      className="my-2 hvr-pulse-grow"
                    />
                  )
                ) : null}
              </div>
            ) : null}
        

            {!this.state.isLoading ? (
              <div className="col-12 row justify-content-center  bg-light py-2"
              style={{marginLeft:0}}
                onClick={() => this.bookmarkHandler(this.props.match.params.id)}
                
              >
                {this.props.state.isAuthenticated ? (
                  this.state.is_bookmarked ? (
                    <FaBookmark style={{ fontSize: "20px" }} className="my-2 hvr-pulse-grow" />
                  ) : (
                    <BsBookmark style={{ fontSize: "20px" }} className="my-2 hvr-pulse-grow" />
                  )
                ) : null}
              </div>
            ) : null}
           <div className="col-12">
           <a
              class="twitter-share-button  row justify-content-center bg-light py-2 d-block"
             
              href={
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(window.location.href)
              }
              data-size="large"
              style={{ color: "#3b5998", fontSize: "30px" }}
            >
              <FaTwitter className="col-auto hvr-buzz"  style={{ color: "#1DA1F2", fontSize: "30px" }}/>
            </a>
           </div>
           
         <div className="col-12">
            <a
              href="!#"
              className="facebook-share  row justify-content-center py-2 bg-light hvr-buzz d-block"
              style={{ color: "#3b5998", fontSize: "30px" }}
            >
              <FaFacebook className="col-auto"  style={{ color: "#3b5998", fontSize: "30px" }}/>
            </a>
            </div>
          </div>
          
          <Container className="p-4" style={{ marginTop: "60px" }}>
            {this.state.post !== null
              ? ReactHtmlParser(this.state.post.content)
              : null}
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLike: (id, type) => dispatch(setLike(id, type)),
    toggleBookmark: (id, type) => dispatch(setBookmark(id, type)),
  };
};
export default withRouter(
  withAlert()(connect(mapStateToProps, mapDispatchToProps)(DetailView))
);
