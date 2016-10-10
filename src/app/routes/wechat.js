'use strict';

/**
 * Module dependencies.
 */
var
// checkToken = require('../../app/controllers/checkToken'),
  multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  wechat = require('../controllers/wechat.js');

module.exports = function(app){

  app.route('/').get(wechat.index);

  app.use('/wechat',wechat.wechatMiddleware);

  app.route('/token').get(wechat.getAccessToken);
};
