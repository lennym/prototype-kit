const React = require('react');
const { render } = require('react-dom');
const Component = require('{{page}}').default;

render(
  <Component />,
  document.getElementById('page-container')
);
