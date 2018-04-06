const sass = require('npm-sass');
const path = require('path');
const fs = require('fs');

module.exports = dir => {

  return (req, res, next) => {
    const file = req.url.replace(/^\//, '').replace(/.css$/, '.scss');
    const input = path.resolve(dir, file);

    const send = css => res.type('text/css').send(css);

    fs.readFile(input, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.status(404);
          return res.send(`Not found: ${input}`);
        }
        return next(err);
      }
      sass(input, (err, result) => {
        if (err) {
          return next(err);
        }
        send(result.css);
      });
    });
  };

};
