const path = require('path');
const fs = require('fs');
const util = require('util');
const webpack = require('webpack');
const glob = require('glob');
const mkdir = require('mkdirp');

const config = require('./webpack/config');

const list = cwd => {
  return new Promise((resolve, reject) => {
    glob('**/*.jsx', { cwd }, (err, list) => {
      return err ? reject(err) : resolve(list.map(f => path.resolve(cwd, f)));
    });
  });
}

module.exports = dir => {

  const outputPath = path.resolve(dir, './assets/js');
  return util.promisify(mkdir)(outputPath)
    .then(() => {
      return list(path.resolve(dir, './pages'))
    })
    .then(list => {
      const compiler = webpack(config(list, outputPath));
      return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          if (stats.hasErrors()) {
            console.log(stats.toString());
            return reject(new Error());
          }
          resolve();
        });
      });
    });
};
