const path = require('path');
const fs = require('fs');
const csv = require('csv-parse');

const listFiles = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files.filter(f => path.extname(f).match(/\.(csv|json)/)).map(f => path.resolve(dir, f)));
    });
  });
}

const readFile = file => {
  if (path.extname(file) === '.csv') {
    return parseCsv(file);
  } else if (path.extname(file) === '.json') {
    return Promise.resolve(require(file));
  }
}

const parseCsv = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }
      csv(data, { columns: true }, (err, rows) => {
        return err ? reject(err) : resolve(rows);
      });
    });
  });
}

module.exports = dir => {

  const loadData = listFiles(path.resolve(dir, './data'))
    .then(files => {
      return files.reduce((p, file) => {
        return p
          .then(dict => {
            return readFile(file)
              .then(data => {
                const name = path.basename(file).split('.')[0];
                dict[name] = data;
                return dict;
              });
          });
      }, Promise.resolve({}));
    })
    .catch(e => {
      throw e
    });

  return (req, res, next) => {
    loadData
      .then(data => {
        console.log(data);
        res.locals.data = data;
      })
      .then(() => next())
      .catch(next)
  }

}