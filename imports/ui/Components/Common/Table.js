import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Table.css";

class Table extends Component {
  render() {
    const { tableData, tableHeaders, noDataMessage } = this.props;
    return (
      <div className="common-table">
        <div className="table-header">
          {tableHeaders.map(header => (
            <div
              style={header.style ? header.style : {}}
              className="table-header-cell"
            >
              {header.label}
            </div>
          ))}
        </div>
        <div className="table-body">
          {tableData.map((data, index) => (
            <div
              className="table-row"
              onClick={() => this.props.onRowClick(data)}
            >
              {Object.keys(data).map((d, index) => {
                const header = tableHeaders[index];
                if (!header) return null;
                return (
                  <div
                    className="table-row-cell"
                    style={header.style ? header.style : {}}
                  >
                    {data[header.value]}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  tableData: PropTypes.array,
  tableHeaders: PropTypes.array,
  onRowClick: PropTypes.func
};

Table.defaultProps = {
  tableData: [],
  tableHeaders: []
};

export default Table;
