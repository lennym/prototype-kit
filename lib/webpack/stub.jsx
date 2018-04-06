const React = require('react');

class Stub extends React.Component {

  content() {
    return null;
  }

  render() {
    return <div>{ this.content() }</div>;
  }

};

module.exports = Stub;
