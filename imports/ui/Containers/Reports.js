import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Reports from "../Pages/Reports";
import { Classes } from "../../api/classes/classes";
import { Carts } from "../../api/carts/carts";

const headers = [
  { label: "Usuário", value: "user" },
  { label: "Carrinho criado em", value: "created_at" },
  { label: "Pago em", value: "paid_at" },
  { label: "Preço", value: "total_price" }
];

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  if (!user) return onData(null, { closedCarts: [], headers: [] });
  if (Meteor.subscribe("getAllPaidCarts").ready()) {
    let closedCarts = Carts.find().fetch();
    const usersIds = closedCarts.map(a => a.user_id);
    Meteor.call("getUsers", { usersIds }, (err, users) => {
      if (!err) return onData(null, { closedCarts, headers, users });
    });
  }
};
const ReportsContainer = compose(dataLoader)(Reports);

export default ReportsContainer;
