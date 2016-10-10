'use strict';

var datacube = require('../controllers/datacube');

module.exports = function(app){

  app.route('/datacube/usersummary').post(datacube.getUserSummary);

  app.route('/datacube/usercumulate').post(datacube.getUserCumulate);

  app.route('/datacube/articlesummary').post(datacube.getArticleSummary);

  app.route('/datacube/articletotal').post(datacube.getArticleTotal);

  app.route('/datacube/userread').post(datacube.getUserRead);

  app.route('/datacube/userreadhour').post(datacube.getUserReadHour);

  app.route('/datacube/usershare').post(datacube.getUserShare);

  app.route('/datacube/usersharehour').post(datacube.getUserShareHour);

  app.route('/datacube/upstreammsg').post(datacube.getUpstreamMsg);

  app.route('/datacube/upstreammsghour').post(datacube.getUpstreamMsgHour);

  app.route('/datacube/upstreammsgweek').post(datacube.getUpstreamMsgWeek);

  app.route('/datacube/upstreammsgmonth').post(datacube.getUpstreamMsgMonth);

  app.route('/datacube/upstreammsgdist').post(datacube.getUpstreamMsgDist);

  app.route('/datacube/upstreammsgdistweek').post(datacube.getUpstreamMsgDistWeek);

  app.route('/datacube/upstreammsgdistmonth').post(datacube.getUpstreamMsgDistMonth);

  app.route('/datacube/interfacesummary').post(datacube.getInterfaceSummary);

  app.route('/datacube/interfacesummaryhour').post(datacube.getInterfaceSummaryHour);
};
