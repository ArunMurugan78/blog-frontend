import React from "react";
import { useEffect } from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import {SideNav} from './layout/sidenav';
import Home from "./home";
import LoginOptions from "./login-options";
import UpdateUser from "./update";
import Profiles from "./profile";
import { getUser } from "./action/actionCreators";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePost from "./createPost";
import Root from "./main";
import DetailView from "./detailview";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: "top center",
  timeout: 3000,
  offset: "80px",
};

function App() {
  useEffect(async () => {
    await store.dispatch(getUser());
    console.log("Fetched The User");
  }, []);
  return (
 
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <Provider store={store}>
          
            <Switch>
              <Route component={LoginOptions} path="/continueWith" />
              <Route component={Home} path="/home" />
              <Route component={CreatePost} path="/post/new" />
              <Route component={DetailView} path="/post/:id" />
              <Route component={Profiles} path="/profile/:id" />
              <Route component={UpdateUser} path="/update" />
              <Route component={Root} path="/" />
            </Switch>{" "}
          </Provider>{" "}
        </AlertProvider>{" "}
      </BrowserRouter>
 
  );
}

export default App;
