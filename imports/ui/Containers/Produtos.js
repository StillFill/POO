import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Produtos from "../Pages/Produtos";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  console.log(Meteor);
  Meteor.call("getAllProducts", (err, products) => {
    console.log(err);
    console.log(products);
    onData(null, {
      products
    });
  });
};
const ProdutosContainer = compose(dataLoader)(Produtos);
export default ProdutosContainer;
