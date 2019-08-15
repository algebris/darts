const requireAll = require('require-all');

module.exports = server => requireAll({
  dirname: __dirname,
  recursive: true,
  filter: /^(.+)\.controller\.js$/,
  resolve: Controller => server.route(Controller)
});
