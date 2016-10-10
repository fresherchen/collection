'use strict';

var menu = require('../controllers/menu');

module.exports = function(app){

  app.route('/menus')
  .get(menu.getMenu)
  .post(menu.createMenu)
  .delete(menu.deleteMenu);

  app.route('/menus/cond')
  .post(menu.addCondMenu)
  .delete(menu.delCondMenu);

  app.route('/menus/self').get(menu.getSelfMenu);
};
