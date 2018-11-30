import { Meteor } from "meteor/meteor";
import { Carts } from "../../imports/api/carts/carts";
import { Boleto } from "node-boleto";

if (Meteor.isServer) {
  Meteor.methods({
    addToCart({ user_id, classId }) {
      const existantCart = Carts.findOne({ user_id, status: "open" });
      if (existantCart)
        Carts.update(
          { _id: existantCart._id },
          { $push: { classes: classId } }
        );
      else
        Carts.insert({
          created_at: new Date(),
          user_id,
          classes: [classId],
          status: "open"
        });
    },

    getUserCart(user_id) {
      return Carts.find({ user_id, status: "open" }).fetch()[0];
    },

    createBoleto({ value }) {
      let Boleto = require("node-boleto").Boleto;

      let boleto = new Boleto({
        banco: "santander", // nome do banco dentro da pasta 'banks'
        data_emissao: new Date(),
        data_vencimento: new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
        valor: value, // R$ 15,00 (valor em centavos)
        nosso_numero: "1234567",
        numero_documento: "123123",
        cedente: "Pagar.me Pagamentos S/A",
        cedente_cnpj: "18727053000174", // sem pontos e traços
        agencia: "3978",
        codigo_cedente: "6404154", // PSK (código da carteira)
        carteira: "102"
      });

      let a;
      boleto.renderHTML(html => {
        a = html;
      });
      return a;
    },

    payCart({ cartId, total, protocolo }) {
      Carts.update(
        { _id: cartId },
        {
          $set: {
            status: "paid",
            paid_at: new Date(),
            total_price: total,
            protocolo: protocolo.toUpperCase()
          }
        }
      );
      return protocolo;
    }
  });
}
