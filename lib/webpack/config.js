const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.resolve(__dirname, './template.jsx');

const PAGE_PATH = path.resolve(__dirname, '../../components/page');
const STUB_PATH = path.resolve(__dirname, './stub');

class StubResolver {

  apply(resolver) {
    resolver.plugin('described-resolve', (request, callback) => {
      if (request.module) {
        return callback();
      }
      const target = path.resolve(request.path, request.request);
      if (target === PAGE_PATH) {
        return resolver.doResolve('resolve', Object.assign({}, request, { request: STUB_PATH }), `Aliased ${PAGE_PATH} to ${STUB_PATH}`, callback);
      }
      callback();
    });
  }

}


module.exports = (page, out) => {
  page = page.replace(/.jsx$/, '');
  const name = path.basename(page);
  return {
    entry: {
      [name]: path.resolve(__dirname, './template.jsx')
    },
    output: {
      path: out
    },
    mode: 'development',
    target: 'web',
    resolve: {
      extensions: ['.js', '.jsx'],
      plugins: [
        new StubResolver()
      ]
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
};
