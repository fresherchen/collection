'use strict';

var custom = require('../controllers/custom');

module.exports = function(app){

  app.route('/custom/message').post(custom.sendCustomMessage);

  app.route('/custom/online').get(custom.getOnlineKfList);

  app.route('/custom')
  .get(custom.getKfList)
  .post(custom.addKfAccount)
  .put(custom.updateCustom)
  .delete(custom.delKfAccount);

  app.route('/custom/kf').post(custom.inviteWorker);

  app.route('/custom/img').post(custom.uploadHeadImg);
};
