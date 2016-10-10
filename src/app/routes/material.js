'use strict';

var multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  material = require('../controllers/material');
module.exports = function(app){

  app.route('/media').post(multipartMiddleware,material.upload);

  app.route('/media/img').post(multipartMiddleware,material.uploadImg);

  // 此方法在消息管理的群发里有，素材管理里没有，需要验证它与addnewsmaterial 的区别
  app.route('/media/news').post(material.uploadnews);

  app.route('/materials/news')
  .post(material.addNewsMaterial)
  .put(material.updateNewsMaterial);

  app.route('/materials/getNews')
  .post(material.getNewsMaterial);

  app.route('/materials')
  .get(material.getMaterialCount)
  .post(multipartMiddleware,material.addMaterial)
  .delete(material.delMaterial);

  app.route('/materials/batch')
  .post(material.getMaterialBatch);
};
