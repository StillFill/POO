import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Relatorio from "../Pages/Relatorio";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  console.log(Meteor);
  Meteor.call("getAllProducts", (err, products) => {
    Meteor.call("getAllSales", (err, sales) => {
      onData(null, {
        sales,
        products
      });
    });
  });
};
const ProdutosContainer = compose(dataLoader)(Relatorio);
export default ProdutosContainer;
