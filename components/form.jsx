const React = require('react');

const Input = require('govuk-react-components/components/forms/input-text');
const RadioGroup = require('govuk-react-components/components/forms/radio-group');
const Select = require('govuk-react-components/components/forms/select');
const Date = require('govuk-react-components/components/forms/date');
const { Button } = require('govuk-react-components/components/button');

const CheckboxGroup = props => <RadioGroup {...props} type="checkbox" />

const Page = require('./page');

class Form extends Page {

  componentDidMount() {
    this.setState({ form: {} });
  }

  fields() {
    return []
  }

  renderField(field) {
    const Component = {
      radio: RadioGroup,
      checkbox: CheckboxGroup,
      select: Select,
      date: Date
    }[field.type] || Input;
    if (!Component) {
      return null;
    }
    return <Component { ...field } key={ field.name } onChange={e => this.update(field.name, e.target.value)} />
  }

  update(field, value) {
    const form = Object.assign({}, this.state.form, { [field]: value });
    this.setState({ form });
  }

  pageTitle() {
    return null;
  }

  submit() {
    return this.props.submit || 'Submit';
  }

  _onSubmit(e) {
    e.preventDefault();
    this.onSubmit(this.state.form);
  }

  onSubmit() {

  }

  content() {
    const fields = this.fields().map((f, i) => {
      return Object.assign({ type: 'text', name: `field-${i}` }, f);
    });
    const title = this.pageTitle();

    return <React.Fragment>
      { title && <h1>{ title }</h1> }
      <form onSubmit={e => this._onSubmit(e)}>
        {
          fields.map(field => this.renderField(field))
        }
        <Button type="submit">{ this.submit() }</Button>
      </form>
    </React.Fragment>;
  }

}

Form.Input = Input;
Form.RadioGroup = RadioGroup;
Form.CheckboxGroup = CheckboxGroup;
Form.Select = Select;
Form.Data = Date;
Form.Button = Button;

module.exports = Form;
