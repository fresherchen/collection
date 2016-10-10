'use strict';

var access_token = require('./wechat').params.access_token,
  getToken = require('./wechat').getToken,
  wechat_interface = require('./wechat').wechat_interface;

// 数据统计>用户分析之获取用户增减数据
exports.getUserSummary = function(req,res){
  var getUser = function(){
    var path = '/datacube/getusersummary?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getUser();
    });
  }else{
    getUser();
  }
};

// 数据统计>用户分析之获取累积用户数据
exports.getUserCumulate = function(req,res){
  var getUser = function(){
    var path = '/datacube/getusercumulate?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getUser();
    });
  }else{
    getUser();
  }
};

// 数据统计>图文分析之获取图文群发每日数据
exports.getArticleSummary = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getarticlesummary?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>图文分析之获取图文群发总数据
exports.getArticleTotal = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getarticletotal?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>图文分析之获取图文统计数据
exports.getUserRead = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getuserread?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>图文分析之获取图文统计分时数据
exports.getUserReadHour = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getuserreadhour?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>图文分析之获取图文分享转发数据
exports.getUserShare = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getusershare?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>图文分析之获取图文分享转发分时数据
exports.getUserShareHour = function(req,res){
  var getArticle = function(){
    var path = '/datacube/getusersharehour?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getArticle();
    });
  }else{
    getArticle();
  }
};

// 数据统计>消息分析之获取消息发送概况数据
exports.getUpstreamMsg = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsg?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送分时数据
exports.getUpstreamMsgHour = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsghour?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送周数据
exports.getUpstreamMsgWeek = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsgweek?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送月数据
exports.getUpstreamMsgMonth = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsgmonth?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送分布数据
exports.getUpstreamMsgDist = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsgdist?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送分布周数据
exports.getUpstreamMsgDistWeek = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsgdistweek?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>消息分析之获取消息发送分布月数据
exports.getUpstreamMsgDistMonth = function(req,res){
  var getMsg = function(){
    var path = '/datacube/getupstreammsgdistmonth?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMsg();
    });
  }else{
    getMsg();
  }
};

// 数据统计>接口分析之获取接口分析数据
exports.getInterfaceSummary = function(req,res){
  var getInterface = function(){
    var path = '/datacube/getinterfacesummary?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getInterface();
    });
  }else{
    getInterface();
  }
};
// 数据统计>接口分析之获取接口分析分时数据
exports.getInterfaceSummaryHour = function(req,res){
  var getInterface = function(){
    var path = '/datacube/getinterfacesummaryhour?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getInterface();
    });
  }else{
    getInterface();
  }
};
