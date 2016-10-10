'use strict';

var user = require('../controllers/user');

module.exports = function(app){

  app.route('/tags')
  .get(user.getTag)
  .post(user.createTag)
  .put(user.updateTag)
  .delete(user.delTag);

  app.route('/users/tag').post(user.getUserByTag);

  app.route('/tags/idlist')
  .post(user.getTagList);

  app.route('/tags/user')
  .post(user.taggingToUsers)
  .put(user.untaggingToUsers);

  app.route('/users/remark')
  .post(user.updateRemark);

  app.route('/users/info')
  .get(user.getUserInfo)
  .post(user.getUserInfoBatch);

  app.route('/users/list').get(user.getUserList);

  app.route('/tags/getblack').post(user.getBlackList);

  app.route('/tags/black')
  .post(user.blackList)
  .put(user.unblackList);
};
