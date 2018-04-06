const React = require('react');
const GovUK = require('govuk-react-components/components/layout');
const PhaseBanner = require('govuk-react-components/components/phase-banner');

class Page extends React.Component {

  title() {
    return this.props.title || 'Prototype Kit';
  }

  content() {
    return null;
  }

  render() {
    return <GovUK
      propositionHeader={this.title()}
      title={this.title()}
      stylesheets={['/govuk/elements.css', '/assets/css/default.css', `/assets/css/${this.props.page}.css`]}
    >
      <main className="main" id="content">
        <PhaseBanner phase="prototype" />
        <div id="page-container">
          { this.content() }
        </div>
      </main>
    </GovUK>
  }
}

module.exports = Page;
