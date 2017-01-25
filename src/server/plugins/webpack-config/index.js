import Webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import Path from 'path';
import Process from 'process';
import WebpackDevMiddleware from 'webpack-dev-middleware';

exports.register = function(server, options, next) {
  const webpackConfigPath = Path.resolve(Path.join(Process.cwd(), options));
  const config = require(webpackConfigPath).default;
  const compiler = Webpack(config);
  compiler.apply(new DashboardPlugin());

  const devMiddleware = WebpackDevMiddleware(compiler, {
    publicPath: '/static/compiled/'
  });
  server.ext('onRequest', (request, reply) => {
    devMiddleware(request.raw.req, request.raw.res, (err) => {
      if (err) {
        return reply(err);
      }
      reply.continue();
    });
  });

  server.expose('compiler', compiler);
  next();
};

exports.register.attributes = {
  name: 'WebpackConfig',
  version: '1.0.0',
  dependencies: 'inert'
};
