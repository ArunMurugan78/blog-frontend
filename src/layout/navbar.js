import React, { Component } from "react";
import { MdNotifications, MdAccountCircle } from "react-icons/md";
import {RiAddLine} from 'react-icons/ri';
import {BsCodeSlash,BsNewspaper} from 'react-icons/bs';
import {IoIosPaper} from 'react-icons/io'
import {
  Navbar,
  Nav,
  FormControl,
  Form,
  Button,

} from "react-bootstrap";
import { connect } from "react-redux";
import { ListGroup, Container } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "./sidenav.css";
import { Link } from "react-router-dom";
import "./navbar.css";
export class NavBar extends Component {
  state = {
    showSideNav: false,
  };
  toggleSideNav = () => {
    this.setState((state) => ({ showSideNav: !state.showSideNav }));
  };
  render() {
    let backg = "#00adb5";
    let foreg = "#222831";
    let prop = { fixed: "top" };
    if (this.props.theme === "black") {
      foreg = "#00adb5";
      backg = "#222831";
      prop = {
        fixed: "static",
      };
    }

    // borderBottom:'5px solid #00adb5'
    return (
      <div>
         
        <Navbar
        expanded={true}
          collapseOnSelect
          expand="md"
          style={{ backgroundColor: backg}}
          variant="dark"
          id="navbar"
          {...prop}
        >
          {/* <Navbar.Toggle aria-controls="menu" /> */}
         
            <Link to="/home">
            <Navbar.Brand href="#home" className="mr-auto  order-md-0">
            <BsCodeSlash  style={{ fontSize: "27px", color: "white" }}
            className="my-auto mx-3"/>
         
            Blog
             
          </Navbar.Brand>

            </Link>
          
          <div className="order-sm-2">
           
            <Link to="/">
         <BsNewspaper
            style={{ fontSize: "27px", color: "white" }}
            className="my-auto mx-3"/></Link>
         <Link to="/post/new">
         <RiAddLine
            style={{ fontSize: "27px", color: "white" }}
            className="my-auto mx-3"/></Link>
            <MdNotifications
              style={{ fontSize: "27px", color: "white" }}
              className="my-auto mx-3"
            />
            <MdAccountCircle
              onClick={this.toggleSideNav}
              style={{ fontSize: "27px", color: "white" }}
              className="my-auto mx-3"
            />
         
          </div>
          <Navbar.Collapse id="menu">
            <Form inline className="ml-md-4 ml-3 order-sm-1 my-4 my-sm-0">
              <FormControl
                type="text"
                placeholder="Search Blogs..."
                className="mr-sm-2"
              />
              <Button variant="outline-light" className="my-2">
                Search
              </Button>
            </Form>
            <Nav>
              {/* <Nav.Link href="#home">Home</Nav.Link>
               */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.showSideNav ? (
          <div>
            <div className="row">
              <div
                className="col-12"
                style={{
                  height: "100%",
                  position: "fixed",
                  zIndex:1000,
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
                onClick={this.toggleSideNav}
              ></div>
              <Container
                className="nav shadow col-xs-12 col-sm-6 col-md-3 animated faster slideInRight"
                style={{ backgroundColor: "#393e46" }}
                fluid
              >

                
                <ListGroup style={{ width: "100%" }}>
                  <ListGroup.Item
                  
                    style={{
                      backgroundColor: "#00adb5",
                      color: "white",
                      borderRadius: 0,
                    }}
                  >
                    <h3>
                      {this.props.state.isAuthenticated ? (
                        <span className="h5">
                          {this.props.state.user.username}
                        </span>
                      ) : (
                        <span className="h5">
                          {" "}
                          <MdAccountCircle
                            style={{ fontSize: "35px", color: "white" }}
                            className="my-auto mx-2"
                          />
                        </span>
                      )}
                      <span className="h4 ml-4 float-right"   onClick={this.toggleSideNav}>
                        <AiOutlineClose />
                      </span>
                    </h3>
                  </ListGroup.Item>
                  {this.props.state.isAuthenticated ? (
                    <div>
                       <Link to={"/profile/" + this.props.state.user.id}>
                      <ListGroup.Item className='sidelink'>
                       
                          Profile
                       
                      </ListGroup.Item>
                      </Link>
                      <a href="/logout">
                      <ListGroup.Item
                      
                        className='sidelink'
                      >
                        Logout
                      </ListGroup.Item>
                      </a>
                      <Link to={"/bookmarked"}>
                      <ListGroup.Item className='sidelink'>
                       
                          Bookmarked Blogs
                       
                      </ListGroup.Item>
                      </Link>
                      <Link to={"/post/new"}>
                      <ListGroup.Item className='sidelink'>
                       
                         New Post
                       
                      </ListGroup.Item>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link to="/continueWith">
                        <ListGroup.Item className='sidelink'>
                          Sign Up
                        </ListGroup.Item>
                      </Link>
                      <Link to="/continueWith">
                        <ListGroup.Item className='sidelink'>
                          Log in
                        </ListGroup.Item>
                      </Link>
                    </div>
                  )}
                </ListGroup>
              </Container>
            </div>
          </div>
        ) : null}
      
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(NavBar);
