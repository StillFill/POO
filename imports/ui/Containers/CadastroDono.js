import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import CadastroDono from "../Pages/CadastroDono";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  console.log(Meteor);
  Meteor.call("getAllCompanies", (err, companies) => {
    console.log(err);
    console.log(companies);
    onData(null, {
      companies
    });
  });
};
const CadastroDonoContainer = compose(dataLoader)(CadastroDono);
export default CadastroDonoContainer;
