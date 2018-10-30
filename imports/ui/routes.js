import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, IndexRoute } from "react-router";
import Grid from "react-bootstrap/lib/Grid";
import { Tracker } from "meteor/tracker";
import NavBar from "./Components/NavBar";
import Home from "./Containers/Home";
import UserClasses from "./Containers/UserClasses";
import RegisterClass from "./Containers/RegisterClass";
import Search from "./Pages/Search";
import Cart from "./Containers/Cart";
import Reports from "./Containers/Reports";

const routes = (
  <Grid fluid style={{ height: "100vh" }}>
    <NavBar history={createBrowserHistory()} />
    <Route name="Home" path="/home" component={Home} />
    <Route name="Cursos" path="/cursos" component={Search}>
      <Route name="Cursos" path="/cursos/:searchParam" component={Search} />
    </Route>
    <Route name="Minha conta" path="/meus-cursos" component={UserClasses} />
    <Route name="Carrinho" path="/carrinho" component={Cart} />
    <Route name="Relatório" path="/relatorio" component={Reports} />
    <Route
      name="Registrar curso"
      path="/registrar-curso"
      component={RegisterClass}
    />
  </Grid>
);

Meteor.startup(() => {
  Tracker.autorun(() => {
    render(
      <Router history={createBrowserHistory()}>{routes}</Router>,
      document.getElementById("react-root")
    );
  });
});
