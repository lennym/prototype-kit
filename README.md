# prototype-kit

A toolkit for rapid prototyping of govuk themed services in react.

## Prerequisites

Using the toolkit requires at least version 8 of node. You can install it [https://nodejs.org/](here).

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
npx prototype-kit run
```

This will start your prototype running at [http://localhost:3000](http://localhost:3000). Open that page in a browser to see your prototype.
