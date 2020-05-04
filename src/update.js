import React, { Component } from "react";
import NavBar from "./layout/navbar";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import axios from "axios";
import { withAlert } from "react-alert";
import { Row, Col, Form, Button } from "react-bootstrap";
export class UpdateUser extends Component {
  state = {
    userName: null,
    img: null,
  };
  changeHandler = (event) => {
    this.setState({ userName: event.target.value });
  };
  componentDidMount() {
    if (this.props.state.isAuthenticated) {
      this.setState({ userName: this.props.state.user.username });
    }
  }
  submitHandler = async (event) => {
    event.preventDefault();
    if (this.state.userName.length < 4) {
      this.props.alert.show("User Name Should be atleast 4 characters Long");
    } else {
      await axios.patch("/update/user", { userName: this.state.userName });
      this.props.alert.success("Profile Updated Successfully !");
    }
  };
  componentWillMount(){
    if(this.props.location.search=="?image=InvalidFormat"){
      this.props.alert.error("Please Upload a Image")
    }
  }

  render() {
    if(this.state.userName===null){
      if (this.props.state.isAuthenticated) {
        this.setState({ userName: this.props.state.user.username });
      }
    }
    return (
      <div>
        <NavBar theme="black" />
        <Container fluid style={{ backgroundColor: "#EEEEEE" }}>
          <Row className="justify-content-around">
            <Col
              style={{ backgroundColor: "white" }}
              className="shadow-sm p-4 m-4 raleway rounded "
              xs={12}
              md={6}
            >
              <h1> Edit Profile </h1>{" "}
              <Form>
                <Form.Group controlId="UsernameUpdate">
                  <Form.Label> User Name </Form.Label>{" "}
                  <Form.Row>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Enter new username"
                        value={this.state.userName}
                        onChange={(e) => this.changeHandler(e)}
                      />{" "}
                    </Col>{" "}
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={this.submitHandler}
                      >
                        Save UserName{" "}
                      </Button>{" "}
                    </Col>{" "}
                  </Form.Row>{" "}
                </Form.Group>{" "}
                {/* <Form.Group controlId="FileUpdate">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" onChange={e => this.setState({img:e.target.value})} placeholder="Browse Files" />
                  
                  </Form.Group> */}{" "}
              </Form>{" "}
              <hr />
              <Form
                action="/update/avatar"
                method="post"
                enctype="multipart/form-data"
              >
                <Form.Label> Profile Picture </Form.Label>{" "}
                <Form.Row className="align-items-end">
                  <Col>
                    <Form.Control
                      type="file"
                      placeholder="Browse"
                      name="avatar"
                    />
                  </Col>{" "}
                  <Col>
                    <Button type="submit"> Update </Button>{" "}
                  </Col>{" "}
                </Form.Row>{" "}
              </Form>{" "}
            </Col>{" "}
          </Row>{" "}
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

export default withAlert()(connect(mapStateToProps)(UpdateUser));
