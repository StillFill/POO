import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Styles/Home";
import "../Styles/Class";
import NavBar from "../Components/NavBar";
import { SearchContainer } from "../Containers/Home";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SearchContainer
        searchParam={window.location.pathname.split("/cursos/")[1]}
      />
    );
  }
}

Search.propTypes = {
  classes: PropTypes.array,
  params: PropTypes.object
};

export default Search;
