import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, IndexRoute } from "react-router";
import { Tracker } from "meteor/tracker";
import Login from "./Pages/Login";
import Vendas from "./Containers/Vendas";
import CadastroDono from "./Containers/CadastroDono";
import NavBar from "./Components/NavBar";
import Produtos from "./Containers/Produtos";
import Relatorio from "./Containers/Relatorio";

const routes = (
  <div>
    <NavBar history={createBrowserHistory()} />
    <Route name="login" path="/login" component={Login} />
    <Route name="vendas" path="/vendas" component={Vendas} />
    <Route name="relatorio" path="/relatorio" component={Relatorio} />
    <Route name="produtos" path="/produtos" component={Produtos} />
    <Route
      name="CadastrarDono"
      path="/cadastro-dono"
      component={CadastroDono}
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
