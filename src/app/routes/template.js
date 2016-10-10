'use strict';

var template = require('../controllers/template');

module.exports = function(app){

  app.route('/message/template').post(template.sendTemplate);

  app.route('/template/industry')
  .get(template.getIndustry)
  .post(template.setIndustry);

  app.route('/template/id')
  .post(template.getTemplateId);

  app.route('/template')
  .post(template.getTemplateList)
  .delete(template.delTemplate);
};
