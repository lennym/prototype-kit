import React from 'react';
import { Page } from 'prototype-kit';

class MyPage extends Page {

  content() {
    return <React.Fragment>
      <h1>Hello world!</h1>
      <p>You created a new page successfully!</p>
    </React.Fragment>
  }

}

export default MyPage;
