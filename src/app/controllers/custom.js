'use strict';

var access_token = require('./wechat').params.access_token,
  getToken = require('./wechat').getToken,
  wechat_interface = require('./wechat').wechat_interface;

// 客服接口之发消息（文本、图片、语音、视频、音乐、图文、卡券等）
exports.sendCustomMessage = function(req,res){
  var sendMessage = function(){
    var path = '/cgi-bin/message/custom/send?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      sendMessage();
    });
  }else{
    sendMessage();
  }
};



// 客服管理之获取客服基本信息
exports.getKfList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/customservice/getkflist?access_token='+access_token();
    wechat_interface(path,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之获取在线客服信息
exports.getOnlineKfList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/customservice/getonlinekflist?access_token='+access_token();
    wechat_interface(path,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之添加客服账号
exports.addKfAccount = function(req,res){
  var getData = function(){
    var path = '/customservice/kfaccount/add?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之邀请绑定客服账号
exports.inviteWorker = function(req,res){
  var getData = function(){
    var path = '/customservice/kfaccount/inviteworker?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之设置客服信息
exports.updateCustom = function(req,res){
  var getData = function(){
    var path = '/customservice/kfaccount/update?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之上传客服头像 FORM表单形式
exports.uploadHeadImg = function(req,res){
  var kf_account = req.body.kf_account;
  var getData = function(){
    var path = '/customservice/kfaccount/uploadheadimg?access_token='+access_token()+'&kf_account='+kf_account;
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};

// 客服管理之删除客服账号
exports.delKfAccount = function(req,res){
  var getData = function(){
    var path = '/customservice/kfaccount/del?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getData();
    });
  }else{
    getData();
  }
};
