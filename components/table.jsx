const React = require('react');
const { intersection, sortBy } = require('lodash');

class Table extends React.Component {

  getColumns() {
    if (this.props.columns) {
      return Array.isArray(this.props.columns) ? this.props.columns : Object.keys(this.props.columns);
    }
    const columns = this.props.dataset.map(row => Object.keys(row));
    return intersection.apply(null, columns);
  }

  getHeading(key) {
    if (this.props.columns && this.props.columns[key]) {
      return this.props.columns[key];
    }
    return key;
  }

  format(key, value, item) {
    if (this.props.formatter) {
      return this.props.formatter(key, value, item);
    }
    return value;
  }

  render() {
    const columns = this.getColumns();
    let dataset = this.props.dataset;
    if (this.props.sort) {
      dataset = sortBy(dataset, this.props.sort);
    }
    return <table>
      <thead>
        <tr>
          { columns.map(c => <th>{ this.getHeading(c) }</th>) }
        </tr>
      </thead>
      <tbody>
        {
          dataset.map(row => (
            <tr>
              { columns.map(c => <td>{ this.format(c, row[c], row) }</td>) }
            </tr>
          ))
        }
      </tbody>
    </table>

  }

}

module.exports = Table;
