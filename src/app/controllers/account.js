'use strict';

var access_token = require('./wechat').params.access_token;
var wechat_interface = require('./wechat').wechat_interface;
var getToken = require('./wechat').getToken;

exports.qrcode = function(req,res){
  var sendData = function(){
    var path = '/cgi-bin/qrcode/create?access_token='+access_token();
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

exports.shorturl = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/shorturl?access_token='+access_token();
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
