import React from 'react';
import { Page } from 'prototype-kit';

class ErrorPage extends Page {

  content() {
    return <React.Fragment>
      <h1>There was a problem serving this page</h1>
      <p>{ this.props.error.message }</p>
    </React.Fragment>
  }

}

export default ErrorPage;
