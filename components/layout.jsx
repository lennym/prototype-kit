const React = require('react');
const GovUK = require('govuk-react-components/components/layout');
const PhaseBanner = require('govuk-react-components/components/phase-banner');

class Layout extends React.Component {

  render() {
    const titleLink = this.props.titleLink || '/';
    return <GovUK
      propositionHeader={this.props.title}
      propositionHeaderLink={typeof this.props.title === 'string' ? titleLink : null}
      title={this.props.pagetitle}
      stylesheets={['/govuk/elements.css', '/assets/css/default.css', `/assets/css/${this.props.page}.css`]}
    >
      <main className="main" id="content">
        <PhaseBanner phase="prototype" />
        <div id="page-container">
          { this.props.children }
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE=${JSON.stringify(this.props)}`}} />
        <script src={`/assets/js/${this.props.page}.js`}></script>
      </main>
    </GovUK>
  }
}

module.exports = Layout;
