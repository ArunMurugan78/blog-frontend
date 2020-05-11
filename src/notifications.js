import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import NavBar from './layout/navbar';
import {Redirect} from 'react-router-dom'
import {GrNotification} from 'react-icons/gr'
export class Notifications extends Component {
  render() {
    return (
      <div>
          <NavBar theme="black" />
        <div
          className="row justify-content-center"
          style={{ backgroundColor: "#EEEEEE" }}
        >
          <h2
            className="col-xs-12 col-md-6 shadow-sm raleway m-2 p-4"
            style={{
              backgroundColor: "white",
              borderLeft: "5px solid black",
            }}
          >
           <GrNotification/> Notifications
          </h2>{" "}
        </div>
        {this.props.state.isAuthenticated
          ? this.props.state.user.notifications.map((obj) => {
              return (
                <div
                  className="row justify-content-center"
                  style={{ backgroundColor: "#EEEEEE" }}
                >
                  <h4
                    className="col-xs-12 col-md-6 shadow-sm raleway m-2 p-4"
                    style={{
                      backgroundColor: "white",
                      borderLeft: "5px solid purple",
                    }}
                  >
                    {obj.action.type
                      ? obj.action.type == "FOLLOW"
                    ?<div> <Link to={"/profile/"+obj.userID}>{obj.userName }</Link> started Following you</div>
                        : obj.action.type == "LIKE"
                        ?<div> <Link to={"/profile/"+obj.userID}>{obj.userName }</Link> liked your <Link to={"/post/"+obj.action.postID}>Blog</Link></div>
                        : obj.action.type == "NEW_POST"
                        ? <div><Link to={"/profile/"+obj.userID}>{obj.userName }</Link>  posted a <Link to={"/post/"+obj.action.postID}>new Blog</Link></div>
                        : null
                      : obj.action}
                  </h4>{" "}
                </div>
              );
            })
          :<Redirect to="/continueWith"/> }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(Notifications);
