import React, { Component } from "react";
import { MdNotifications, MdAccountCircle } from "react-icons/md";
import {
  Navbar,
  Nav,
  FormControl,
  Form,
  Button,
  Dropdown,
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
          collapseOnSelect
          expand="sm"
          style={{ backgroundColor: backg }}
          variant="dark"
          id="navbar"
          {...prop}
        >
          <Navbar.Toggle aria-controls="menu" />
          <Navbar.Brand href="#home" className="mr-auto order-md-0">
            Blog
          </Navbar.Brand>

          <div className="order-md-2">
            <MdNotifications
              style={{ fontSize: "35px", color: "white" }}
              className="my-auto mx-2"
            />
            <MdAccountCircle
              onClick={this.toggleSideNav}
              style={{ fontSize: "35px", color: "white" }}
              className="my-auto mx-2"
            />
            {/* <Dropdown as="span" drop="left" >
      <Dropdown.Toggle style={{backgroundColor:backg,border:'none'}} id="profileIcon">
      <MdAccountCircle   style={{fontSize:'35px',color:'white'}}  className="my-auto mx-2"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {this.props.state.isAuthenticated?(
          <div>
          <Dropdown.Item href={"/profile/"+this.props.state.user.id}>
          Profile({this.props.state.user.username})
        </Dropdown.Item>

        <Dropdown.Item>
        Account Settings
      </Dropdown.Item>
      <Dropdown.Item href="/logout">
           Logout
         </Dropdown.Item>
      </div>
        ):(
          <div>
           <Dropdown.Item >
          <Link to="/continueWith" className="link">Sign Up</Link>
         </Dropdown.Item>
           <Dropdown.Item>
           <Link to="/continueWith" className="link">Login</Link>
         </Dropdown.Item>
        
         </div>
        )}
        
        <Dropdown.Item>
          About
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
          </div>
          <Navbar.Collapse id="menu">
            <Form inline className="ml-md-4 order-md-1 my-4 my-md-0">
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
                  zIndex:'1000',
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
                      <ListGroup.Item className='sidelink'>
                        Bookmarked Posts
                      </ListGroup.Item>
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
