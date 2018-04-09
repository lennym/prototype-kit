const React = require('react');
const { render } = require('react-dom');
const Component = require('{{page}}').default;

render(
  <Component { ...window.INITIAL_STATE }/>,
  document.getElementById('page-container')
);
