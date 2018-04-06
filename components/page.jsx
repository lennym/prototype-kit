const React = require('react');
const Layout = require('./layout')

class Page extends React.Component {

  title() {
    return this.props.title || 'Prototype Kit';
  }

  content() {
    return null;
  }

  render() {
    return <Layout title={this.title()} page={this.props.page}>
      { this.content() }
    </Layout>
  }
}

module.exports = Page;
