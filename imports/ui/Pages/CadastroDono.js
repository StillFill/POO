import React, { Component } from "react";
import cepPromise from "cep-promise";
import { Meteor } from "meteor/meteor";
import { FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import documentValidation from "cpf_cnpj";
import PropTypes from "prop-types";
import "../Styles/CadastroDono";

class CadastroDono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerInfo: {},
      companyInfo: {},
      companyAddress: {},
      caixaInfo: {},
      errors: []
    };
    this.handleChangeOnwerInfo = this.handleChangeOnwerInfo.bind(this);
    this.handleChangeCompanyInfo = this.handleChangeCompanyInfo.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.createCaixa = this.createCaixa.bind(this);
    this.createOwner = this.createOwner.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChangeCompanyInfo(event, type) {
    const companyInfo = this.state.companyInfo;
    companyInfo[type] = event.target.value;
    this.setState({ companyInfo });
  }

  async handleChangeAddress(event, type) {
    const companyInfo = this.state.companyInfo;
    if (type === "cep" && event.target.value.length === 8) {
      const companyAddress = await cepPromise(event.target.value);
      companyInfo.address = companyAddress;
      this.setState({ companyAddress });
      return;
    }
    const companyAddress = this.state.companyAddress;
    companyAddress[type] = event.target.value;
    companyInfo.address = companyAddress;
    this.setState({ companyAddress });
  }

  handleChangeOnwerInfo(event, type) {
    const ownerInfo = this.state.ownerInfo;
    ownerInfo[type] = event.target.value;
    this.setState({ ownerInfo });
  }

  handleChangeLogin(event, type) {
    if (type === "owner") {
      const owner = this.state.owner;
      owner.login = event.target.value;
      this.setState({ owner });
    } else {
      const caixaInfo = this.state.caixaInfo;
      caixaInfo.login = event.target.value;
      this.setState({ caixaInfo });
    }
  }

  handleChangePassword(event, type) {
    if (type === "owner") {
      const owner = this.state.owner;
      owner.password = event.target.value;
      this.setState({ owner });
    } else {
      const caixaInfo = this.state.caixaInfo;
      caixaInfo.password = event.target.value;
      this.setState({ caixaInfo });
    }
  }

  submitForm() {
    console.log(Meteor);
    const company = this.state.companyInfo;
    const owner = this.state.ownerInfo;
    const errors = [];
    if (!documentValidation.CNPJ.isValid(company.cnpj)) {
      errors.push("company_cnpj");
    }
    if (!documentValidation.CPF.isValid(owner.cpf)) {
      errors.push("owner_cpf");
    }
    console.log(errors);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    console.log("passou da validação");
    Meteor.call("insertCompany", company, (err, companyId) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(companyId);
      this.createCaixa(companyId);
      this.createOwner(companyId);
      this.setState({});
    });
  }

  createCaixa(companyId) {
    const caixa = this.state.caixaInfo;
    Meteor.call(
      "createNewUser",
      {
        email: caixa.login,
        password: caixa.password,
        companyId,
        type: "caixa"
      },
      err => {
        console.log(err);
      }
    );
  }

  createOwner(companyId) {
    const owner = this.state.ownerInfo;
    Meteor.call(
      "createNewUser",
      {
        email: owner.login,
        password: owner.password,
        companyId,
        type: "admin"
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    console.log("oi");
    return (
      <div>
        <Col xs={12} md={6} className="left-section">
          <Row>
            <div className="section-title">Informações do proprietário</div>
            <div className="register-content">
              <div>
                <Col xs={12} md={6}>
                  <ControlLabel>Nome</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeOnwerInfo(a, "name")}
                    value={this.state.name}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel>CPF</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeOnwerInfo(a, "cpf")}
                    value={this.state.cpf}
                  />
                  {this.state.errors.includes("owner_cpf") ? (
                    <p style={{ color: "red" }}>CPf invalido!</p>
                  ) : (
                    ""
                  )}
                </Col>
              </div>
            </div>
          </Row>
          <Row>
            <div className="section-title">Informações do Estabelecimento</div>
            <div className="register-content">
              <div>
                <Col xs={12} md={6}>
                  <ControlLabel>Nome do estabelecimento</ControlLabel>
                  <FormControl
                    onChange={a =>
                      this.handleChangeCompanyInfo(a, "companyName")
                    }
                    value={this.state.companyName}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel>CNPJ</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeCompanyInfo(a, "cnpj")}
                    value={this.state.cnpj}
                  />
                  {this.state.errors.includes("company_cnpj") ? (
                    <p style={{ color: "red" }}>
                      CNPJ do estabelecimento invalido!
                    </p>
                  ) : (
                    ""
                  )}
                </Col>
              </div>
            </div>
          </Row>
          <Row>
            <div className="section-title">Infomações de Endereço</div>
            <div className="register-content">
              <div>
                <Col xs={12} md={12} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Cep</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "cep")}
                    value={this.state.companyAddress.cep}
                  />
                </Col>
                <Col xs={12} md={2} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Estado</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "state")}
                    value={this.state.companyAddress.state}
                  />
                </Col>
                <Col xs={12} md={10} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Cidade</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "city")}
                    value={this.state.companyAddress.city}
                  />
                </Col>
                <Col xs={12} md={12} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Bairro</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "neighborhood")}
                    value={this.state.companyAddress.neighborhood}
                  />
                </Col>
                <Col xs={12} md={10} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Rua</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "street")}
                    value={this.state.companyAddress.street}
                  />
                </Col>
                <Col xs={12} md={2} style={{ marginBottom: "1em" }}>
                  <ControlLabel>Numero</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeAddress(a, "number")}
                    value={this.state.companyAddress.number}
                  />
                </Col>
              </div>
            </div>
          </Row>
          <Row>
            <div className="section-title">Login do Dono</div>
            <div className="register-content">
              <div>
                <Col xs={12} md={6}>
                  <ControlLabel>Login</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeOnwerInfo(a, "login")}
                    value={this.state.companyName}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel>Senha</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeOnwerInfo(a, "password")}
                    value={this.state.cnpj}
                  />
                </Col>
              </div>
            </div>
          </Row>
          <Row>
            <div className="section-title">Login do Caixa</div>
            <div className="register-content">
              <div>
                <Col xs={12} md={6}>
                  <ControlLabel>Login</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangeLogin(a, "caixa")}
                    value={this.state.companyName}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel>Senha</ControlLabel>
                  <FormControl
                    onChange={a => this.handleChangePassword(a, "caixa")}
                    value={this.state.cnpj}
                  />
                </Col>
              </div>
            </div>
          </Row>
          <Row>
            <div className="register-button-container">
              <button onClick={this.submitForm} className="register-button">
                Cadastrar
              </button>
            </div>
          </Row>
        </Col>
        <Col xs={12} md={6} className="right-section">
          <Row>
            <div className="section-title">Lista dos salões</div>
            <div className="list-content">
              {this.props.companies.map(company => (
                <div key={company._id} className="companies-row">
                  <div>{company.companyName}</div>
                  <div>{company.cnpj}</div>
                  <div>{`${company.address.neighborhood}, ${
                    company.address.street
                  }  ${company.address.number}`}</div>
                </div>
              ))}
            </div>
          </Row>
        </Col>
      </div>
    );
  }
}

export default CadastroDono;

CadastroDono.propTypes = {
  companies: PropTypes.array
};
