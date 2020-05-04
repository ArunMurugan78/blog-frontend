import React, { Component } from "react";
import axios from "axios";
import { withAlert } from "react-alert";


import {
  SET_LIKE,
  DEL_LIKE,
  DEL_BOOKMARK,
  SET_BOOKMARK,
} from "./action/actionTypes";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import NavBar from "./layout/navbar";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { setLike, setBookmark } from "./action/actionCreators";
import { Link } from "react-router-dom";
import "./main.css";
export class Root extends Component {
  state = {
    posts: [],
    totalPages: 0,
    page: 0,
    hasPrevPage: false,
    hasNextPage: false,
  };
  likeHandler(id) {
    if (this.props.state.isAuthenticated) {
      if (
        this.props.state.user.liked.reduce((total, currentvalue) => {
          if (currentvalue.postID == id) {
            return true;
          } else return total;
        }, false)
      ) {
        this.props.toggleLike(id, DEL_LIKE);
        for (let i = 0; i < this.state.posts.length; i++) {
          if (this.state.posts[i]._id == id) {
            this.state.posts[i].likes -= 1;
            break;
          }
        }
      } else {
        this.props.toggleLike(id, SET_LIKE);
        for (let i = 0; i < this.state.posts.length; i++) {
          if (this.state.posts[i]._id == id) {
            this.state.posts[i].likes += 1;
            break;
          }
        }
      }
    }
  }
  nextPageHandler = () => {
    if(this.state.hasNextPage){
      axios
      .get("/post/all?page="+(parseInt(this.state.page)+1))
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data.docs,
          page: res.data.page,
          hasNextPage: res.data.hasNextPage,
          hasPrevPage: res.data.hasPrevPage,
          totalpages: res.data,
          totalpages: res.data.totalPages,
        });
      })
      .catch((err) => console.log(err.message));
    }
  }
  previousPageHandler = () => {
    if(this.state.hasPrevPage){
      axios
      .get("/post/all?page="+(parseInt(this.state.page)-1))
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data.docs,
          page: res.data.page,
          hasNextPage: res.data.hasNextPage,
          hasPrevPage: res.data.hasPrevPage,
          totalpages: res.data,
          totalpages: res.data.totalPages,
        });
      })
      .catch((err) => console.log(err.message));
    }
  }
  bookmarkHandler(id) {
    if (this.props.state.isAuthenticated) {
      if (
        this.props.state.user.bookmarked.reduce((total, currentvalue) => {
          if (currentvalue.postID == id) {
            return true;
          } else return total;
        }, false)
      ) {
        this.props.toggleBookmark(id, DEL_BOOKMARK);
      } else {
        this.props.toggleBookmark(id, SET_BOOKMARK);
        this.props.alert.success("Bookmarked !");
      }
    }
  }
  componentDidMount() {
    axios
      .get("/post/all")
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data.docs,
          page: res.data.page,
          hasNextPage: res.data.hasNextPage,
          hasPrevPage: res.data.hasPrevPage,
          totalpages: res.data,
          totalpages: res.data.totalPages,
        });
      })
      .catch((err) => console.log(err.message));
  }
  render() {
    return (
      <div className="backpattern">
        <NavBar theme="black" />
        <Container fluid>
        <div
          className="row justify-content-center backpattern"
          style={{ backgroundColor: "#EEEEEE" }}
        >
          {" "}
          {this.state.posts !== null
            ? this.state.posts.map((obj, i) => (
                <div
                  key={i}
                  className="col-xs-12 col-md-6 shadow-sm box m-2 p-4"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row justify-content-lg-between px-2">
                    <h1 className="px-2">
                      {" "}
                      <Link to={"/post/" + obj._id}>
                        {" "}
                        <span className="link"> {obj.title} </span>{" "}
                      </Link>{" "}
                    </h1>{" "}
               
                  </div>{" "}
                  <hr />
                  <div className="row justify-content-between px-2">
                    <div> By {obj.Author ? obj.Author : "Anonymous"} </div>{" "}
                    <div className="row">
                      <div className="row col">
                        {" "}
                        <div
                          className="col-12 text-danger"
                          onClick={() => this.likeHandler(obj._id)}
                        >
                          {" "}
                          {this.props.state.isAuthenticated ? (
                            this.props.state.user.liked.reduce(
                              (total, currentvalue) => {
                                if (currentvalue.postID == obj._id) {
                                  return true;
                                } else return total;
                              },
                              false
                            ) ? (
                              <AiFillHeart />
                            ) : (
                              <AiOutlineHeart />
                            )
                          ) : (
                            <AiOutlineHeart />
                          )}{" "}
                        </div>{" "}
                        <small className="text-muted">
                          {" "}
                          <span className="mx-2"> {obj.likes} </span>
                          Likes{" "}
                        </small>{" "}
                      </div>{" "}
                      <div className="col row">
                        <div
                          className="col-12"
                          onClick={() => this.bookmarkHandler(obj._id)}
                        >
                          {" "}
                          {this.props.state.isAuthenticated ? (
                            this.props.state.user.bookmarked.reduce(
                              (total, currentvalue) => {
                                if (currentvalue.postID == obj._id) {
                                  return true;
                                } else return total;
                              },
                              false
                            ) ? (
                              <FaBookmark />
                            ) : (
                              <BsBookmark />
                            )
                          ) : (
                            <BsBookmark />
                          )}{" "}
                        </div>{" "}
                        <small className="text-muted"> Bookmark </small>{" "}
                      </div>{" "}
                      {/* <div className="col row">
                                                                                                                                               <div className="col-12">   <AiOutlineShareAlt/></div>
                                                                                                                                               <small className="text-muted">share</small>
                                                                                                                                                  </div> */}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))
            : null}{" "}
        </div>{" "}
        <div className="row justify-content-center">
          <button disabled={!this.state.hasPrevPage} onClick={this.previousPageHandler} className="btn btn-primary m-2">{"<< Previous"}</button><button disabled={!this.state.hasNextPage} onClick={this.nextPageHandler} className="btn btn-primary m-2">Next >></button>
          </div>{" "}
          </Container>
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
export default withAlert()(connect(mapStateToProps, mapDispatchToProps)(Root));
