'use strict';

var access_token = require('./wechat').params.access_token;
var wechat_interface = require('./wechat').wechat_interface;
var getToken = require('./wechat').getToken;

// 根据标签进行群发（图文，文本，语音，图片，视频，卡券）
exports.sendMassMessageByTag = function(req,res){
  var sendData = function(){
    var path = '/cgi-bin/message/mass/sendall?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      sendData();
    });
  }else{
    sendData();
  }
};

// 根据OpenID列表群发（图文，文本，语音，图片，视频，卡券）
exports.sendMassMessageByOpenID = function(params,callback){
  var sendMessage = function(){
  console.dir('3333333333333333333333');
    var path = '/cgi-bin/message/mass/send?access_token='+access_token();
    wechat_interface(path,'POST',params,function(data,code){
  console.dir('444444444444444444444');
      callback(data);
    });
  };
  if(!access_token()){
    getToken(function(token){
      sendMessage();
    });
  }else{
    sendMessage();
  }
};
// exports.sendMassMessageByOpenID = function(req,res){
//   var sendMessage = function(){
//     var path = '/cgi-bin/message/mass/send?access_token='+access_token();
//     wechat_interface(path,'POST',req.body,function(data,code){
//       res.json(JSON.parse(data));
//     });
//   };
//   if(!access_token()){
//     getToken(function(token){
//       sendMessage();
//     });
//   }else{
//     sendMessage();
//   }
// };

// 预览接口（图文，文本，语音，图片，视频，卡券）
exports.previewMassMessage = function(req,res){
  var previewData = function(){
    var path = '/cgi-bin/message/mass/preview?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      previewData();
    });
  }else{
    previewData();
  }
};

// 查询群发消息发送状态
exports.getMassMessageState = function(req,res){
  var getState = function(){
    var path = '/cgi-bin/message/mass/get?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getState();
    });
  }else{
    getState();
  }
};

// 删除群发
exports.delMessMessage = function(req,res){
  var delData = function(){
    var path = '/cgi-bin/message/mass/delete?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      delData();
    });
  }else{
    delData();
  }
};
