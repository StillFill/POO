import { Meteor } from "meteor/meteor";

const sendTo = route => {
  window.location.pathname = route;
};

const userOptions = [
  {
    label: "Meus cursos",
    icon: "fa fa-book",
    action: () => sendTo("/meus-cursos")
  },
  { label: "Sair", icon: "fa fa-sign-out-alt", action: Meteor.logout }
];

export const adminOptions = [
  {
    label: "Cursos",
    icon: "fa fa-cog",
    action: () => sendTo("/registrar-curso")
  },
  { label: "Sair", icon: "fa fa-sign-out-alt", action: Meteor.logout }
];

export default userOptions;
