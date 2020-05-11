import React, { Component } from "react";
import NavBar from "./layout/navbar";
import axios from "axios";
import {FcSearch} from 'react-icons/fc'
import Post from "./posts";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export class Search extends Component {
  state = {
    result: [],
    isLoading:false
  };
  componentDidMount() {
    axios
      .get("/post/search/" + this.props.match.params.pname)
      .then((res) => this.setState({ result: res.data ,  isLoading:false}))
      .catch((e) => {console.log(e.message);this.setState({  isLoading:false})});
      this.setState({isLoading:true})
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
        axios
        .get("/post/search/" + this.props.match.params.pname)
        .then((res) => this.setState({ result: res.data,  isLoading:false }))
        .catch((e) => {console.log(e.message);this.setState({  isLoading:false})});
        this.setState({isLoading:true})
      }
     
  }
  render() {
    return (
      <div>
        <NavBar theme="black" />
        {this.state.isLoading ? (
          <div className="container-fluid">
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
        ) : null}
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
                <FcSearch /> Search Results for "{this.props.match.params.pname}"{" "}
              </h1>{" "}
            </div>
       {this.state.result.length!=0 ?<Post query = {this.state.result.map(obj => "pid="+obj.item._id)}/>:<h1 className="raleway text-center" style={{backgroundColor:'#EEEEEE'}}>Oops ! , No Results</h1>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default withRouter(connect(mapStateToProps)(Search));
