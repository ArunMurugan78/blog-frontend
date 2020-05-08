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
    description:""
  };
  changeHandler = (event) => {
    this.setState({ userName: event.target.value });
  };
  componentDidMount() {
    if (this.props.state.isAuthenticated) {
      this.setState({ userName: this.props.state.user.username,description:this.props.state.user.description });
    }
  }
  changeHandlerDesc = (event)=>{
    if(this.state.description.split(' ').length>60){
      this.props.alert.error("Max words allowed is 60");
    }
    else if(this.state.description.length>200){
      this.props.alert.error("Max Characters allowed is 20");
    }
    else
  {  this.setState({ description: event.target.value });}
  }
  submitHandler = async (event) => {
    event.preventDefault();
    if (this.state.userName.length < 4) {
      this.props.alert.show("User Name Should be atleast 4 characters Long");
    } else {
      await axios.patch("/update/user", { userName: this.state.userName,description:this.state.description });
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
                
                      <Form.Control
                        type="text"
                        placeholder="Enter new username"
                        value={this.state.userName}
                        onChange={(e) => this.changeHandler(e)}
                      />{" "}
           
               
                </Form.Group>
                <hr/>
                <Form.Group >
                  <Form.Label> Say Something About You </Form.Label>{" "}
                
                      <Form.Control
                        type="text"
                        value={this.state.description}
                        as="textarea"
                        onChange={(e) => this.changeHandlerDesc(e)}
                      />{" "}
                      <Form.Text><small className="text-muted">*will be shown at your profile page</small></Form.Text>
              
                  
                </Form.Group>
                <Button variant="success" type="submit" block onClick={this.submitHandler}>Update Profile</Button>
                {" "}
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
