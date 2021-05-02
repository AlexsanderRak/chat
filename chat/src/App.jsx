import React from "react";

import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import ChatsClass from "./page/Chats";
import Client from "./page/Client";
import Login from "./page/Login";
import Users from "./page/Users";
import KnowledgeBase from "./page/KnowledgeBase";
import Menu from "./components/Menu";



const requireLogin = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (to.meta.auth) {
    if (user?._id && user?.role < 13) {
      next();
    }
    if (user?.role < 13) {
      next.redirect('/login');
    }
    next.redirect('/client');
  } else {
    next();
  }
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <GuardProvider
          guards={[requireLogin]}
          // loading={Loading}
          // error={NotFound}
        >
          <Switch>
            <GuardedRoute exact path="/chats" component={ChatsClass} meta={{ auth: true }} />
            <GuardedRoute exact path="/users" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/users/create" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/users/edite" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/knowledgeBase" component={KnowledgeBase} meta={{ auth: true }} />
            <Route exact path="/login" component={Login} />
            <Route path="/client" component={Client} />

            <Redirect from="/" to="/client" />
          </Switch>
        </GuardProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
