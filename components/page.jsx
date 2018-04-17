const React = require('react');
const Layout = require('./layout')

const Breadcrumb = require('./breadcrumb');

class Page extends React.Component {

  title() {
    return this.props.title || 'Prototype Kit';
  }

  redirect(url) {
    location.href = url;
  }

  content() {
    return null;
  }

  breadcrumb() {
    return null;
  }

  render() {
    return <Layout {...this.props} title={this.title()} pagetitle={this.props.title} page={this.props.page}>
      <Breadcrumb crumbs={ this.breadcrumb() }/>
      { this.content() }
    </Layout>
  }
}

module.exports = Page;
