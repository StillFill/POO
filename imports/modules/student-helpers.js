import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";

export const doLogin = ({ login, password }, callback) => {
  console.log(login, password);
  Meteor.loginWithPassword(login, password, (error, result) => {
    if (error) {
      callback(error);
      Bert.alert("Login ou senha invalidos", "warning");
    } else {
      const user = Meteor.user();
      callback(null);
      Bert.alert(`Bem vindo ${user.name}`, "success");
    }
  });
};
