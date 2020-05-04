import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";
import NavBar from "./layout/navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class CreatePost extends React.Component {
  state = {
    id: null,
    content: "",
   
    title: null,

    errMsg: null,
  };
  componentDidMount() {
    console.log("auth", this.props.state);
  }
  componentDidUpdate() {
    if (this.props.state.isAuthenticated === false) {
       this.props.history.push("/continueWith");
    }
  }
  handleEditorChange = (content, editor) => {
    this.setState({ content: content, errMsg: null });
    console.log(this.props);
  };
  SubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.title && this.state.content ) {
      console.log("[Posting the Post]", this.state.content);
      axios
        .post("/post/new", this.state)
        .then((res) => {
          console.log(res.data);
          this.setState({ id: res.data.id });
        })
        .catch((err) => console.log(err.message));
    } else{
        let arr = [];
     
        if(!this.state.content){
          arr.push("Content")
        }
        if(!this.state.title){
          arr.push("Title");
        }
        this.setState({errMsg:arr.join(' , ')+" should not be empty"})
    }
  };

  render() {
    console.log("props", this.props);
    return (
      <div>
        {this.state.id ? <Redirect to={"/post/" + this.state.id} /> : null}
        <NavBar theme="black" fixed={null} />{" "}
        <Container className="p-4">
          
          {this.state.errMsg ? (
            <Alert
              variant="danger"
              onClose={() => this.setState({ errMsg: null })}
              dismissible
            >
              <Alert.Heading> Oh snap!You got an error! </Alert.Heading>
              <p> {this.state.errMsg} </p>
            </Alert>
          ) : null}
          <Form onSubmit={this.SubmitHandler}>
            <Form.Group controlId="title">
              <Form.Label> Title </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Title"
                required
                onBlur={(e) => this.setState({ title: e.target.value })}
              />
              </Form.Group>
            
            <Editor
              apiKey="zqmpq244uf6a2hgzsvh69ao3vneet2snobiqvjddfod8m614"
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
            />
            <Button size="lg" onClick={this.SubmitHandler}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(CreatePost);
