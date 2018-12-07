import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";

export const doLogin = ({ login, password }, callback) => {
  Meteor.loginWithPassword(login, password, (error, result) => {
    if (error) {
      if (callback) callback(error);
      Bert.alert("Login ou senha invalidos", "danger");
    } else {
      const user = Meteor.user();
      if (callback) callback(null);
      Bert.alert(`Bem vindo ${user.name}`, "success");
      const loggedOutCart = JSON.parse(localStorage.getItem("userCart"));
      Meteor.call("createCart", { ...loggedOutCart, user_id: user._id });
      localStorage.removeItem("userCart");
    }
  });
};
