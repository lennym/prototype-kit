const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.resolve(__dirname, './template.jsx');

module.exports = (pages, out) => pages.map(page => {
  page = page.replace(/.jsx$/, '');
  const name = path.basename(page);
  return {
    entry: {
      [name]: path.resolve(__dirname, './template.jsx')
    },
    output: {
      path: out
    },
    target: 'web',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: path.resolve(__dirname, TEMPLATE_PATH),
          loader: 'string-replace-loader',
          options: {
            search: '{{page}}',
            replace: page
          }
        }
      ]
    }
  }
});
