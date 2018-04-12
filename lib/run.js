#! /usr/bin/env node

const cp = require('child_process');
const path = require('path');
const chokidar = require('chokidar');
const { throttle } = require('lodash');

const App = require('./server');
const Compiler = require('./compile-js');

require('babel-register')({
  ignore: false,
  extensions: ['.jsx'],
  cache: true,
  presets: ['es2015', 'react']
});

module.exports = (rootDir, args) => {

  const PORT = process.env.PORT || 3000;

  let server;

  const shouldRestart = file => {
    if (file.includes('/pages/components/')) {
      return restart(file, { compile: true });
    }
    switch (path.extname(file)) {
      case '.jsx':
        return Compiler(rootDir, file)
          .then(restart(file));
      case '.js':
      case '.json':
      case '.csv':
        return restart(file);
    }
  };

  const restart = throttle((file, { compile }) => {
    console.log(`File change detected: ${file}`);
    console.log('Restarting server...');
    if (server) {
      server.close(() => {
        start({ compile });
      });
    }
  }, 1000);

  const start = ({ compile }) => {
    return Promise.resolve()
      .then(() => {
        if (compile) {
          return Compiler(rootDir);
        }
      })
      .then(() => {
        return App(rootDir);
      })
      .then(app => {
        return new Promise((resolve, reject) => {
          server = app.listen(PORT, (err) => {
            return err ? reject(err) : resolve();
          });
        });
      })
      .then(() => {
        console.log(`Prototype running at: http://localhost:${server.address().port}`);
      })
      .catch(e => {
        if (e.message.includes('EADDRESSINUSE')) {
          console.log('Could not bind server to port, trying again...')
          return setTimeout(() => start({ compile }), 500);
        }
        throw e;
      });
  };

  start({ compile: true })
    .then(() => {
      if (args.watch) {
        const watcher = chokidar.watch(rootDir, {
          ignored: ['.DS_Store', /node_modules/, /.git/, /assets\/js/],
          ignoreInitial: true
        });

        watcher.on('change', shouldRestart);
        watcher.on('add', shouldRestart);
        watcher.on('unlink', shouldRestart);
      }
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });

};
