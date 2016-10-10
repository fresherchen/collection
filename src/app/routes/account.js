'use strict';

var account = require('../controllers/account');

module.exports = function(app){

  app.route('/account/qrcode').post(account.qrcode);

  app.route('/account/shorturl').post(account.shorturl);
};
