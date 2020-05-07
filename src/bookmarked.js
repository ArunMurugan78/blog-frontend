import React, { Component } from "react";
import Post from "./posts";
import NavBar from "./layout/navbar";
import { RiBookMarkLine } from "react-icons/ri";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export class Bookmarked extends Component {
  render() {
    return (
      <div>
        <NavBar theme="black" />
        {this.props.state.user ? (
          <div>
            <div
              className="row justify-content-center"
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <h1
                className="col-xs-12 col-md-6 shadow-sm raleway m-2 p-4"
                style={{
                  backgroundColor: "white",
                  borderLeft: "5px solid #393e46",
                }}
              >
                <RiBookMarkLine /> Bookmarked Blogs{" "}
              </h1>{" "}
            </div>{" "}
            {this.props.state &&
            this.props.state.user.bookmarked.length == 0 ? (
              <h2
                className="raleway text-center pt-4"
                style={{ backgroundColor: "#EEEEEE" }}
              >
                {" "}
                You will see the blogs you bookmarked Here!{" "}
              </h2>
            ) : (
              <Post
                reRenderOnBookMark = {true}
                query={this.props.state.user.bookmarked.map(
                  (obj) => "pid=" + obj.postID
                )}
              />
            )}{" "}
          </div>
        ) : (
          <h1> You need to Login! </h1>
        )}{" "}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default withRouter(connect(mapStateToProps)(Bookmarked));
