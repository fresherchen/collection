'use strict';

var multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  schedule = require('../controllers/schedule');


module.exports = function(app){
  // schedule to run on right time
  app.route('/schedules')
  .get(schedule.list)
  .post(multipartMiddleware, schedule.save);

  app.route('/schedules/:scheduleId')
  .get(schedule.read)
  .put(schedule.update)
  .delete(schedule.delete);

  app.param('scheduleId',schedule.getScheduleById);
};
