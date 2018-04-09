import React from 'react';
import { Page } from 'prototype-kit';

class NotFound extends Page {

  content() {
    return <React.Fragment>
      <h1>Page not found</h1>
    </React.Fragment>
  }

}

export default NotFound;
