'use strict';

var message = require('../controllers/message');

module.exports = function(app){

  //据查，测试号，分组群发【图文消息】暂无权限
  app.route('/messages/tag').post(message.sendMassMessageByTag);

  app.route('/messages/openid').post(message.sendMassMessageByOpenID);

  app.route('/messages/preview').post(message.previewMassMessage);

  app.route('/messages')
  .post(message.getMassMessageState)
  .delete(message.delMessMessage);
};
