import React from "react";
import { useEffect } from "react";
import Bookmarked from "./bookmarked";
import "./App.css";
import Notifications from "./notifications";
import store from "./store";
import { Provider } from "react-redux";
import EditPost from "./editPost";
import Home from "./home";
import LoginOptions from "./login-options";
import UpdateUser from "./update";
import Profiles from "./profile";
import Search from "./search";
import { getUser } from "./action/actionCreators";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePost from "./createPost";
import Root from "./main";
import DetailView from "./detailview";
import { Provider as AlertProvider } from "react-alert";
import NotFound from './notfound'
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
            <Route component={LoginOptions} path="/continueWith" exact/>
            <Route component={Home} path="/home" exact />
            <Route component={Notifications} path="/notifications" exact/>
            <Route component={CreatePost} path="/post/new" exact/>
            <Route component={EditPost} path="/post/edit/:id" exact/>
            <Route component={Search} path="/search/:pname" exact/>
            <Route component={DetailView} path="/post/:id" exact/>

            <Route component={Profiles} path="/profile/:id" exact/>
            <Route component={Bookmarked} path="/bookmarked"exact />
            <Route component={UpdateUser} path="/update" exact/>
            <Route component={Root} path="/" exact/>
            <Route component={NotFound} />
          </Switch>{" "}
        </Provider>{" "}
      </AlertProvider>{" "}
    </BrowserRouter>
  );
}

export default App;
