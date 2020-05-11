import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Container, Alert ,Spinner} from "react-bootstrap";
import axios from "axios";
import NavBar from "./layout/navbar";

import { connect } from "react-redux";
class EditPost extends React.Component {
  state = {
    content: "",
    isLoading: false,
    title: null,

    errMsg: null,
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get("/post/server/" + this.props.match.params.id)
      .then((res) =>
        this.setState({ content: res.data.content, title: res.data.title })
      )
      .catch((err) => console.log(err.message));
  }

  handleEditorChange = (content, editor) => {
    this.setState({ content: content, errMsg: null });
    console.log(this.props);
  };
  SubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.title && this.state.content) {
      console.log("[Posting the Post]", this.state.content);
      axios
        .patch("/post/" + this.props.match.params.id, this.state)
        .then(() => {
          console.log("Successfully updated the post !", this.props);
          this.props.history.push("/post/" + this.props.match.params.id);
        })
        .catch((err) => console.log(err.message));
      this.setState({ isLoading: true });
    } else {
      let arr = [];

      if (!this.state.content) {
        arr.push("Content");
      }
      if (!this.state.title) {
        arr.push("Title");
      }
      this.setState({ errMsg: arr.join(" , ") + " should not be empty" });
    }
  };

  render() {
    console.log("props", this.props);
    return (
      <div>
        <NavBar theme="black" fixed={null} />{" "}
        <Container className="p-4">
          {" "}
          {this.state.errMsg ? (
            <Alert
              variant="danger"
              onClose={() => this.setState({ errMsg: null })}
              dismissible
            >
              <Alert.Heading> Oh snap!You got an error! </Alert.Heading>{" "}
              <p> {this.state.errMsg} </p>{" "}
            </Alert>
          ) : null}{" "}
          <Form onSubmit={this.SubmitHandler}>
            <Form.Group controlId="title">
              <Form.Label> Title </Form.Label>{" "}
              <Form.Control
                type="text"
                placeholder="Enter a Title"
                required
                onChange={(e) => this.setState({ title: e.target.value })}
                value={this.state.title}
              />{" "}
            </Form.Group>
            <Editor
              apiKey="zqmpq244uf6a2hgzsvh69ao3vneet2snobiqvjddfod8m614"
              value={this.state.content}
              init={{
                height: 500,
                menubar: "file edit view insert format tools table help",
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                ],
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              }}
              onEditorChange={this.handleEditorChange}
            />{" "}
            <Button
              size="lg"
              onClick={this.SubmitHandler}
              disabled={this.state.isLoading}
            >
              {this.state.isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </Form>{" "}
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
export default connect(mapStateToProps)(EditPost);
