import React, { Component } from "react";
import axios from "axios";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  SET_LIKE,
  DEL_LIKE,
  DEL_BOOKMARK,
  SET_BOOKMARK,
} from "./action/actionTypes";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";

import {
  Container,
  Dropdown,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { connect } from "react-redux";
import { setLike, setBookmark } from "./action/actionCreators";
import { Link } from "react-router-dom";
import "./main.css";

export class Post extends Component {
  state = {
    posts: [],
    totalPages: 0,
    page: 0,
    hasPrevPage: false,
    hasNextPage: false,
    confirmDelete: false,
    postIDtoDelete: null,
    isLoading: false,
    showShareModal: false,
    shareID: null,
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
    } else {
      this.props.alert.info("Sign in/ Sign Up to Like !");
      this.props.history.push("/continueWith");
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "Props to be checked :",
      nextProps,
      this.props,
      nextState,
      this.state
    );
    if (
      JSON.stringify(this.state) == JSON.stringify(nextState) &&
      JSON.stringify(this.props) == JSON.stringify(nextProps)
    ) {
      return false;
    }
    return true;
  }
  nextPageHandler = () => {
    if (this.state.hasNextPage) {
      let url = "/post/all?page=" + (parseInt(this.state.page) + 1);
      if (this.props.query) {
        url = url + "&" + this.props.query.join("&");
      }
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.setState({
            posts: res.data.docs,
            page: res.data.page,
            hasNextPage: res.data.hasNextPage,
            hasPrevPage: res.data.hasPrevPage,
            totalpages: res.data,
            totalpages: res.data.totalPages,
            isLoading: false,
          });
        })
        .catch((err) => console.log(err.message));
      this.setState({ isLoading: true });
    }
  };
  previousPageHandler = () => {
    if (this.state.hasPrevPage) {
      let url = "/post/all?page=" + (parseInt(this.state.page) - 1);
      if (this.props.query) {
        url = url + "&" + this.props.query.join("&");
      }
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.setState({
            posts: res.data.docs,
            page: res.data.page,
            hasNextPage: res.data.hasNextPage,
            hasPrevPage: res.data.hasPrevPage,
            totalpages: res.data,
            totalpages: res.data.totalPages,
            isLoading: false,
          });
        })
        .catch((err) => console.log(err.message));
      this.setState({ isLoading: true });
    }
  };
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
    else{
      this.props.alert.info("You need to Sign in /Sign up");
      this.props.history.push('/continueWith');
    }
  }
  componentDidMount() {
    let url = "/post/all";
    if (this.props.query) {
      url = url + "?" + this.props.query.join("&");
    }
    axios
      .get(url)
      .then((res) => {
        console.log("fetched data :", res.data);
        this.setState({
          posts: res.data.docs,
          page: res.data.page,
          hasNextPage: res.data.hasNextPage,
          hasPrevPage: res.data.hasPrevPage,
          totalpages: res.data,
          totalpages: res.data.totalPages,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err.message));
    this.setState({ isLoading: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps) !== JSON.stringify(this.props) &&
      prevProps.state.user
    ) {
      console.log(this.props);
      if (
        (this.props.reRenderOnBookMark ||
         JSON.stringify (prevProps.state.user.bookmarked) ===
         JSON.stringify(this.props.state.user.bookmarked) )&&
         JSON.stringify(prevProps.state.user.liked )===  JSON.stringify(this.props.state.user.liked)
      ) {
        let url = "/post/all";
        if (this.props.query) {
          url = url + "?" + this.props.query.join("&");
        }
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            this.setState({
              posts: res.data.docs,
              page: res.data.page,
              hasNextPage: res.data.hasNextPage,
              hasPrevPage: res.data.hasPrevPage,
              totalpages: res.data,
              totalpages: res.data.totalPages,
              isLoading: false,
            });
          })
          .catch((err) => console.log(err.message));
        if (!this.props.reRenderOnBookMark) {
          this.setState({ isLoading: true });
        }
      }
    }
  }
  toggleConfirmDelete = (id) =>
    this.setState({ confirmDelete: true, postIDtoDelete: id });
  deletePost = async (id) => {
    try {
      await axios.delete("/post/" + id);
      this.setState((state) => ({
        posts: state.posts.filter((obj) => obj._id != id),
        confirmDelete: false,
        postIDtoDelete: null,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="backpattern">
     
        <Modal show={this.state.confirmDelete} centered className="raleway">
          <Modal.Header>
            <Modal.Title>
              <h1> Are you Sure ? </h1>{" "}
            </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            Hope you know what you are doing.You are about to delete this blog
            post{" "}
          </Modal.Body>{" "}
          <Modal.Footer>
            <button
              className="btn btn-secondary btn-md"
              onClick={() => this.setState({ confirmDelete: false })}
            >
              Cancel{" "}
            </button>{" "}
            <button
              className="btn btn-danger btn-md"
              onClick={() => this.deletePost(this.state.postIDtoDelete)}
            >
              Delete{" "}
            </button>{" "}
          </Modal.Footer>{" "}
        </Modal>{" "}
        <Modal
          show={this.state.showShareModal}
          centered
          className="raleway"
          onHide={() => this.setState({ showShareModal: false, shareID: null })}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Share</h1>{" "}
            </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
    
            <CopyToClipboard
                text={window.location.href + "post/" + this.state.shareID}
                onCopy = {() => this.props.alert.success("Copied to Clipboard!")}
              >  
                <button className="btn">
                 
                  <MdContentCopy
                    className=" mx-2"
                    style={{ fontSize: "30px" }}
                  />
                </button>
             
              </CopyToClipboard>
         
            <a
              className="twitter-share-button mx-2"
              style={{ color: "#1DA1F2", fontSize: "30px" }}
              href={
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(
                  window.location.href + "/post/" + this.state.shareID
                )
              }
              data-size="large"
            >
              <FaTwitter />
            </a>

            <a
              href="!#"
              className="facebook-share mx-2"
              style={{ color: "#3b5998", fontSize: "30px" }}
            >
              <FaFacebook className="col-auto" />
            </a>
          </Modal.Body>{" "}
        </Modal>
        <Container fluid>
          <div
            className="row justify-content-center backpattern raleway"
            style={{ backgroundColor: "#EEEEEE" }}
          >
            {this.state.isLoading ? (
              <div>
                   <div
            style={{
              position: "fixed",
              backgroundColor: "rgba(255,255,255)",
              width: "100vw",
              height: "100vh",
              top: 0,
              left:0,
              right:0,
              bottom:0,
              zIndex: 100,
            }}
          ></div>
              <div className="d-flex justify-content-center">
                <div style={{ position: "fixed", top: "40vh", zIndex: 10000 }}>
                  <div class="lds-circle">
                    <div></div>
                  </div>
                  <br />
                  <small className="text-center ml-3">Loading....</small>
                </div>
              </div>
              </div>
            ) : this.state.posts.length != 0 ? (
              this.state.posts.map((obj, i) => (
                <div
                  key={i}
                  className="col-xs-12 col-md-6 shadow-sm box m-2 p-4"
                  style={{
                    backgroundColor: "white",
                    borderLeft: "5px solid #00adb5",
                  }}
                >
                  <div className="row justify-content-between">
                    <Link to={"/post/" + obj._id} className="col-10">
                      <div className="row justify-content-lg-between px-2">
                        <h1 className="px-2">
                          {" "}
                          <span className="link"> {obj.title} </span>{" "}
                        </h1>{" "}
                      </div>{" "}
                    </Link>{" "}
                    <Dropdown className="col-1">
                      <Dropdown.Toggle as="span" className="dropdown-toggle">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {" "}
                        {this.props.state.user &&
                        this.props.state.user.id == obj.userID ? (
                          <div>
                            <Dropdown.Item
                              onClick={() => this.toggleConfirmDelete(obj._id)}
                            >
                              Delete{" "}
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                this.props.history.push("/post/edit/" + obj._id)
                              }
                            >
                              Edit{" "}
                            </Dropdown.Item>{" "}
                          </div>
                        ) : null}
                        <Dropdown.Item
                          onClick={() =>
                            this.setState({
                              showShareModal: true,
                              shareID: obj._id,
                            })
                          }
                        >
                          Share
                        </Dropdown.Item>{" "}
                      </Dropdown.Menu>{" "}
                    </Dropdown>{" "}
                  </div>{" "}
                  <hr />
                  <div className="row justify-content-between px-2">
                    <div>
                      {" "}
                      By{" "}
                      {obj.Author ? (
                        <Link to={"/profile/" + obj.userID}>
                          {" "}
                          <span> {obj.Author} </span>{" "}
                        </Link>
                      ) : (
                        "Anonymous"
                      )}{" "}
                    </div>{" "}
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
                              <AiFillHeart style={{fontSize:'20px'}} className="hvr-pulse-grow"/>
                            ) : (
                              <AiOutlineHeart style={{fontSize:'20px'}}  className="hvr-pulse-grow" />
                            )
                          ) : (
                            <AiOutlineHeart style={{fontSize:'20px'}}  className="hvr-pulse-grow" />
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
                              <FaBookmark style={{fontSize:'20px'}}  />
                            ) : (
                              <BsBookmark style={{fontSize:'20px'}} />
                            )
                          ) : (
                            <BsBookmark style={{fontSize:'20px'}} />
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
            ) : (
              <h1>Oops !, Nothing Here</h1>
            )}
          </div>{" "}
          {!this.state.isLoading ? (
            <div className="row justify-content-center">
              <button
                disabled={!this.state.hasPrevPage}
                onClick={this.previousPageHandler}
                className="btn btn-custom m-2"
              >
                {" "}
                {"<< Previous"}{" "}
              </button>{" "}
              <button
                disabled={!this.state.hasNextPage}
                onClick={this.nextPageHandler}
                className="btn btn-custom m-2"
              >
                Next >>
              </button>{" "}
            </div>
          ) : null}
        </Container>{" "}
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
  withAlert()(connect(mapStateToProps, mapDispatchToProps)(Post))
);
