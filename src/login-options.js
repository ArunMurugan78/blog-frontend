import React from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook, GrTwitter } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import NavBar from "./layout/navbar";

function LoginOptions() {
  return (
    <div>
         <NavBar theme="black"/>
      <div
        className="d-flex justify-content-around align-items-center mt-4"
        style={{ position: "fixed", height: "70vh", width: "100%" }}
      >
        <div style={{ width: "400px" }} className="shadow p-4">
          <h4 className="text-center mb-3"> Countinue With </h4> <hr />
          <Button size="lg" block variant="light" href="/auth/google">
            <FcGoogle /> Google{" "}
          </Button>{" "}
          <Button size="lg" block variant="primary" href="/auth/facebook">
            <GrFacebook /> Facebook{" "}
          </Button>{" "}
          {/* <Button size="lg" block variant="info">
                        <GrTwitter /> Twitter
                      </Button> */}{" "}
          <Button
            size="lg"
            block
            style={{ backgroundColor: "purple" }}
            href="/auth/github"
          >
            <FaGithub /> Github{" "}
          </Button>{" "}
          {/* <Button size="lg" block variant="outline-success">
                    <AiOutlineMail /> Email
                  </Button> */}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default LoginOptions;
