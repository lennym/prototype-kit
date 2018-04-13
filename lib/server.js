const path = require('path');
const express = require('express');
const views = require('express-react-views');
const { assets } = require('govuk-react-components');

const compile = require('./compile-css');
const data = require('./data');

const toolkitDir = path.dirname(require.resolve('govuk_frontend_toolkit/package.json'));
const imagesDir = path.resolve(toolkitDir, './images');

module.exports = dir => {
  const app = express();

  app.set('view engine', 'jsx');
  app.set('views', [path.resolve(dir, './pages'), path.resolve(__dirname, '../views')]);
  app.engine('jsx', views.createEngine({ transformViews: false }));

  app.use(assets());
  app.use('/assets/css', compile(path.resolve(dir, './assets/css')));
  app.use('/assets', express.static(path.resolve(dir, './assets')));
  app.use('/govuk/images', express.static(imagesDir));

  app.get('/favicon.ico', (req, res) => {
    res.send('');
  });

  app.use((req, res, next) => {
    try {
      Object.assign(res.locals, require(path.resolve(dir, './prototype.settings')));
    } catch (e) {}
    next();
  });

  app.use(data(dir));

  app.get('/:page?', (req, res, next) => {
    const page = req.params.page || 'index';
    res.render(page, { page, query: req.query });
  });

  app.use((error, req, res, next) => {
    if (error.message.match(/^Failed to lookup view/) && error.view) {
      res.status(404)
      return res.render('not-found');
    }
    res.status(500);
    res.render('error', { error });
  });

  return Promise.resolve(app);
};
