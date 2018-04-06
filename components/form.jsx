const React = require('react');

const Input = require('govuk-react-components/components/forms/input-text');
const RadioGroup = require('govuk-react-components/components/forms/radio-group');
const Select = require('govuk-react-components/components/forms/select');
const Date = require('govuk-react-components/components/forms/date');
const { Button } = require('govuk-react-components/components/button');

const Page = require('./page');

class Form extends Page {

  fields() {
    return []
  }

  renderField(field) {
    const Component = {
      text: Input,
      radio: RadioGroup,
      select: Select,
      date: Date
    }[field.type];
    if (!Component) {
      return null;
    }
    return <Component { ...field } key={ field.name } />
  }

  submit() {
    return this.props.submit || 'Submit';
  }

  _onSubmit(e) {
    e.preventDefault();
    this.onSubmit();
  }

  onSubmit() {

  }

  content() {
    const fields = this.fields().map((f, i) => {
      return Object.assign({ type: 'text', name: `field-${i}` }, f);
    });
    return <React.Fragment>
      <form onSubmit={(e) => this._onSubmit(e)}>
        {
          fields.map(field => this.renderField(field))
        }
        <Button type="submit">{ this.submit() }</Button>
      </form>
    </React.Fragment>;
  }

}

module.exports = Form;
