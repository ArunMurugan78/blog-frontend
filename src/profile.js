import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import "./profile.css";
import axios from "axios";
import NavBar from "./layout/navbar";
import { FaUserEdit } from "react-icons/fa";
import Post from "./posts";
export class Profiles extends Component {
  state = {
    posts: null,
    userName: null,
    no_followers: null,
    is_following: null,
    is_same: null,
  };
  toggleFollow = async () => {
    try {
      if (this.state.is_following) {
        await axios.delete("/userdata/follow/" + this.props.match.params.id);
        await axios
          .get("/userdata/profile/" + this.props.match.params.id)
          .then((res) =>
            this.setState({
              posts: res.data.posts,
              userName: res.data.userName,
              no_followers: res.data.no_followers,
              is_following: res.data.is_following,
              is_same: res.data.is_same,
            })
          )
          .catch((err) => console.log(err));
      } else {
        await axios.post("/userdata/follow/" + this.props.match.params.id);
        await axios
          .get("/userdata/profile/" + this.props.match.params.id)
          .then((res) =>
            this.setState({
              posts: res.data.posts,
              userName: res.data.userName,
              no_followers: res.data.no_followers,
              is_following: res.data.is_following,
            })
          )
          .catch((err) => console.log(err));
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    axios
      .get("/userdata/profile/" + this.props.match.params.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data.posts,
          userName: res.data.userName,
          no_followers: res.data.no_followers,
          is_following: res.data.is_following,
          is_same: res.data.is_same,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      axios
        .get("/userdata/profile/" + this.props.match.params.id)
        .then((res) => {
          console.log(res.data);
          this.setState({
            posts: res.data.posts,
            userName: res.data.userName,
            no_followers: res.data.no_followers,
            is_following: res.data.is_following,
            is_same: res.data.is_same,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: "#EEEEEE" }}>
        <NavBar theme="black" />
        <Row className="justify-content-around">
          <Col
            style={{ backgroundColor: "white" }}
            className="shadow-sm p-4 m-4 raleway rounded "
            xs={12}
            md={6}
          >
            <h1> Profile </h1>{" "}
            <div className="row">
              <div>
                <img
                  src={"/userdata/" + this.props.match.params.id + "/avatar"}
                  style={{ height: "100px", width: "100px" }}
                  className="  rounded m-2 mx-4 d-inline-block"
                />
              </div>{" "}
              <div className="my-2 mx-4">
                <h2>
                  {" "}
                  {this.state.userName}{" "}
                  {this.state.is_same ? (
                    <span className="text-info h4">
                      {" "}
                      <Link to="/update">
                        {" "}
                        <FaUserEdit />{" "}
                      </Link>{" "}
                    </span>
                  ) : null}{" "}
                </h2>{" "}
                <span className="font-weight-bold my-2">
                  {" "}
                  <span className="mx-2"> {this.state.no_followers} </span>
                  followers{" "}
                </span>{" "}
                <span>
                  {" "}
                  {!this.state.is_same ? (
                    !this.state.is_following ? (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={this.toggleFollow}
                      >
                        Follow <RiUserFollowLine />{" "}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={this.toggleFollow}
                      >
                        UnFollow <RiUserUnfollowLine />{" "}
                      </button>
                    )
                  ) : (
                    <div> </div>
                  )}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </Col>{" "}
        </Row>{" "}
        <Row className="justify-content-center sticky">
          <Col xs={12} md={6} lg={4}>
            {" "}
            {/* <h4 className="text-center raleway bg-light p-1  shadow-sm rounded-pill " style={{backgroundColor:'#393e46',color:'#EEEEEE'}}>Blogs By {this.state.userName}</h4> */}{" "}
            <h4 className="text-center raleway p-1">
              {" "}
              Blogs By {this.state.userName}{" "}
            </h4>{" "}
          </Col>
        </Row>
        <Post query={["id=" + this.props.match.params.id]} />{" "}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Profiles);
