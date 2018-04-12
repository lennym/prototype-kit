# Components

## Page

This is the basic component that your pages should extend.

It renders content into govuk template, and provides some helper functions.

It should, as a minimum, implement a `content` method that will return the page content.

#### Example:

```jsx
import React from 'react';
import { Page } from 'prototype-kit';

class Home extends Page {

  content() {
    return <div>
      <h1>Home page</h1>
      <p><a href="/places">Schedule of Premises</a></p>
    </div>
  }

}

export default Home;
```

### Helpers

The page component includes the following helper functions:

* `redirect(url)` - allows a page to redirect to another url - this is partcularly useful when processing form submissions.

## Forms

### Form page

A form page is a special case of a `Page` component that renders a set of input elements according to configuration provided.

The input configuration should be returned by a `fields` method.

####Example:

```jsx
import React from 'react';
import { Form } from 'prototype-kit';

class Login extends Form {

  fields() {
    return [
      { label: 'Username' },
      { type: 'password', label: 'Password' }
    ]
  }

}

export default Login;
```

This renders a simple, two-field login form.

#### Advanced example

This shows some of the additional ways a form can be configured by implementing custom methods:

```jsx
import React from 'react';
import { Form } from 'prototype-kit';

class Login extends Form {

  // redirect to another page on form submission
  onSubmit(values) {
    this.redirect('/home');
  }

  // set the value of the `h1` on the page
  pageTitle() {
    return 'Log in';
  }

  // override the default submit button text
  submit() {
    return 'Log in';
  }

  fields() {
    return [
      { name: 'username', label: 'Username' },
      { name: 'password', type: 'password', label: 'Password' }
    ]
  }

}

export default Login;
```

The configuration returned by the `fields` function can include any of the options defined for input elements below. The default input type is `text`, but the `type` can be also be set to any of `select`, `radio`, `checkbox`, `date`.

### Input elements

You can use input elements directly in a page. These implement the govuk elements standard UI.

These all take a common set of configuration options:

* `label` - the value of the field label
* `value` - the default value of the field
* `onChange` - callback when the user edits the value
* `hint` - optional hint text
* `error` - optional error message

### Input

Renders a basic text input.

```jsx
import React from 'react';
import { Page, Form } from 'prototype-kit';

class InputField extends Page {

  content() {
    return <div>
      <h1>Form example</h1>
      <Form.Input label="Field label" />
      <Form.Input label="A field with an error" error="There was an error in this field" />
      <Form.Input type="email" label="An email type" />
    </div>
  }

}

export default InputField;
```

### Select

Renders a drop-down box with the options provided.

```jsx
import React from 'react';
import { Page, Form } from 'prototype-kit';

class SelectField extends Page {

  content() {
    return <div>
      <h1>Form example</h1>
      <Form.Select label="Pick a number" options={['Select...', 'One', 'Two', 'Three']} />
    </div>
  }

}

export default SelectField;
```

### RadioGroup

Renders a radio button group with the options provided.

```jsx
import React from 'react';
import { Page, Form } from 'prototype-kit';

class RadioField extends Page {

  content() {
    return <div>
      <h1>Form example</h1>
      <Form.RadioGroup label="Pick a number" options={['One', 'Two', 'Three']} />
    </div>
  }

}

export default RadioField;
```

### CheckboxGroup

Renders a checkbox group with the options provided.

```jsx
import React from 'react';
import { Page, Form } from 'prototype-kit';

class CheckboxField extends Page {

  content() {
    return <div>
      <h1>Form example</h1>
      <Form.CheckboxGroup label="Pick some numbers" options={['One', 'Two', 'Three']} />
    </div>
  }

}

export default CheckboxField;
```

### Date

Renders a date input.

```jsx
import React from 'react';
import { Page, Form } from 'prototype-kit';

class DateField extends Page {

  content() {
    return <div>
      <h1>Form example</h1>
      <Form.Date label="Date of birth" />
    </div>
  }

}

export default DateField;
```

## Table

Renders a dataset in an html table.

For example, if you have CSV data in `./data/places.csv`, this will render that data into a table.

```jsx
import React from 'react';
import { Page, Table } from 'prototype-kit';

class DataTable extends Page {

  content() {
    return <div>
      <Table dataset={ this.props.data.places } />
    </div>
  }

}

export default DataTable;
```

By default the table will include any key which exists on every row in your dataset as the columns (even if the row does not have a value for that key).

This can be overridden by passing a `columns` option.

```jsx
import React from 'react';
import { Page, Table } from 'prototype-kit';

class DataTable extends Page {

  content() {
    return <div>
      <Table dataset={ this.props.data.places } columns={ ['name', 'location'] } />
    </div>
  }

}

export default DataTable;
```

The `columns` option can also be used to define custom labels for your column headings

```jsx
import React from 'react';
import { Page, Table } from 'prototype-kit';

class DataTable extends Page {

  content() {
    return <div>
      <Table
        dataset={ this.props.data.places }
        columns={ { name: 'Name of the place', description: 'Description of location' } }
        />
    </div>
  }

}

export default DataTable;
```



