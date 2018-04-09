# prototype-kit

A toolkit for rapid prototyping of govuk themed services in react.

## Prerequisites

Using the toolkit requires at least version 8 of node. You can install it [here](https://nodejs.org/).

## Getting started

Create a folder for your prototype

Inside that folder, run the following command:

```
npx prototype-kit init
```

This will install all of the code you need to run the prototype kit.

You should now see you have a directory named `pages` in your folder.

Create a file inside that folder and name it `index.jsx`, then give it the following content:

```jsx
import React from 'react';
import { Page } from 'prototype-kit';

class Index extends Page {

  content() {
    return <h1>Hello World!!</h1>
  }

}

export default Index;
```

Now run the following command to start your prototype:

```
npx prototype-kit run --watch
```

This will start your prototype running at [http://localhost:3000](http://localhost:3000). Open that page in a browser to see your prototype.

Any changes you make will be automatically compiled, so there's no need to do anything except refresh the page in the browser when you make changes.

## Adding pages

Any `.jsx` files you create in your `pages` directory will be automatically served, with the file names mapped to urls. So if you create a new file `my-page.jsx` then it will be visible at `http://localhost:3000/my-page`.

Any content returns by the `content` method of your page component will be rendered into the page.

Pages are react components, and can include any other local or third party components as required.

## Custom CSS

The prototype kit uses sass to compile css files. You can create sass files in your `assets/css` directory and they will be automatically compiled and included in pages as follows:

* All pages will load `assets/css/default.scss`
* Pages will also attempt to load page-specific css from `assets/css/<page>.scss`

You can also include all of the govuk frontend toolkit, and govuk elements by adding the following line to the top of your css files.

```
@import "prototype-kit";
```

## Static assets

Any files in your `assets` directory will be available to be served as static files.

## Forms

You can create form pages by creating a page that extends the `Form` base component as follows:

```jsx
import React from 'react';
import { Form } from 'prototype-kit';

class FormPage extends Form {

  pageTitle() {
    return 'Form Page';
  }

  button() {
    return 'Submit form';
  }

  fields() {
    return [
      { label: 'A text field' },
      { label: 'Another text field' }
    ];
  }

}

export default FormPage;
```

## Data

You can load mock data into your prototypes by adding CSV or JSON files to a `data` directory in your prototype.

This data will then be parsed and exposed into your prototype as a `data` prop, with sub-objects corresponding to the file names.

For example, if you add `data/user.json` to your project with the following content:

```json
{
  "name": "Joe Bloggs",
  "dob": "1990-01-01"
}
```

Then you can use the data in your page as follows:

```jsx
import React from 'react';
import { Page } from 'prototype-kit';

class Index extends Page {

  content() {
    const user = this.props.data.user;
    return <h1>User { user.name } was born on { user.dob }.</h1>
  }

}

export default Index;
```

## Components

[Documentation for built-in components](./components.md)
