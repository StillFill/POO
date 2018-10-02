import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, IndexRoute } from "react-router";
import { Tracker } from "meteor/tracker";
import NavBar from "./Components/NavBar";
import Home from "./Containers/Home";
import UserClasses from "./Containers/UserClasses";
import RegisterClass from "./Containers/RegisterClass";
import Search from "./Pages/Search";
import Cart from "./Containers/Cart";

const routes = (
  <div style={{ height: "100vh" }}>
    <NavBar history={createBrowserHistory()} />
    <Route name="Home" path="/home" component={Home} />
    <Route name="Pesquisa" path="/pesquisa" component={Search}>
      <Route name="Pesquisa" path="/pesquisa/:searchParam" component={Home} />
    </Route>
    <Route name="Minha conta" path="/meus-cursos" component={UserClasses} />
    <Route name="Carrinho" path="/carrinho" component={Cart} />
    <Route
      name="Registrar curso"
      path="/registrar-curso"
      component={RegisterClass}
    />
  </div>
);

Meteor.startup(() => {
  Tracker.autorun(() => {
    render(
      <Router history={createBrowserHistory()}>{routes}</Router>,
      document.getElementById("react-root")
    );
  });
});
