import React, { Component } from "react";
import {ListGroup,Container} from 'react-bootstrap'
import {AiOutlineClose} from 'react-icons/ai'
import './sidenav.css'
export class SideNav extends Component {

  render() {
    return(
        <div>
        
        <div className="row bg-dark">
    <Container className="nav shadow col-xs-12 col-md-2 " fluid>
       <ListGroup style={{width:'100%'}}>
  <ListGroup.Item  onClick={this.toggleSideNav}  style={{backgroundColor:'black',color:'white',borderRadius:0}} ><h3>Blog<span className="h4 ml-4 float-right"><AiOutlineClose/></span></h3></ListGroup.Item>
  <ListGroup.Item>Primary</ListGroup.Item>
  <ListGroup.Item >
    Secondary
  </ListGroup.Item>
  <ListGroup.Item >
    Success
  </ListGroup.Item>
  <ListGroup.Item>
    Danger
  </ListGroup.Item>
 
</ListGroup>
    </Container>
    </div>
    </div> 
    );
  }
}

export default SideNav;
