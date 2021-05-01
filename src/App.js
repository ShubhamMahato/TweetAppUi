import React from "react";
import "./App.css";
import Home from "./container/HomePage/home";
import Order from "./components/Order/Order";
import SignupComponent from "./components/Registration/registration";
import ValidateOtp from "./components/ValidateOtp/ValidateOtp";
import LoginComponent from "./components/Login/Login";
import AuthenticatedRoute from "./service/AuthenticatedRoutes";
import { BrowserRouter } from "react-router-dom";
import LoggedHome from "./container/HomePage/LoggedHome";
import MyTweets from "./components/MyTweets/MyTweets";

import { Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PostTweet from "./components/PostTweet/PostTweet";
import EditTweet from "./components/EditTweet/EditTweet";
import ReplyTweet from "./components/ReplyTweet/ReplyTweet";
function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthenticatedRoute exact path="/order">
          <Order />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/replyTweeht">
          <ReplyTweet />
        </AuthenticatedRoute>
        <AuthenticatedRoute
          path="/replyTweet"
          render={(props) => <ReplyTweet {...props} />}
        />
        <AuthenticatedRoute exact path="/myTweets">
          <MyTweets />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/loggedin">
          <LoggedHome />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/postTweet">
          <PostTweet />
        </AuthenticatedRoute>

        <AuthenticatedRoute
          path="/editPost"
          render={(props) => <EditTweet {...props} />}
        />
        <Route exact path="/register">
          <SignupComponent />
        </Route>
        <Route exact path="/Login">
          <LoginComponent />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route
          exact
          path="/validate"
          render={(props) => <ValidateOtp {...props} />}
        ></Route>

        <Route exact path="/">
          <Home />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
