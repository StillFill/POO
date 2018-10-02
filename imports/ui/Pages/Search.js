import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Styles/Home";
import "../Styles/Class";
import NavBar from "../Components/NavBar";
import HomeContainer from "../Containers/Home";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buyClass(classId) {
    const user = Meteor.user();
    Meteor.call("buyClass", { user_id: user._id, classId });
  }

  render() {
    return (
      <HomeContainer
        searchParam={this.props.location.pathname.split("/pesquisa/")[1]}
      />
    );
  }
}

Search.propTypes = {
  classes: PropTypes.array,
  params: PropTypes.object
};

export default Search;
