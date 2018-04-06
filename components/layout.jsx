const React = require('react');
const GovUK = require('govuk-react-components/components/layout');
const PhaseBanner = require('govuk-react-components/components/phase-banner');

class Layout extends React.Component {

  title() {
    return this.props.title || 'Prototype Kit';
  }

  render() {
    return <GovUK
      propositionHeader={this.props.title}
      title={this.props.title}
      stylesheets={['/govuk/elements.css', '/assets/css/default.css', `/assets/css/${this.props.page}.css`]}
    >
      <main className="main" id="content">
        <PhaseBanner phase="prototype" />
        <div id="page-container">
          { this.props.children }
        </div>
        <script src={`/assets/js/${this.props.page}.js`}></script>
      </main>
    </GovUK>
  }
}

module.exports = Layout;
