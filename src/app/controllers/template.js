'use strict';

var access_token = require('./wechat').params.access_token;
var wechat_interface = require('./wechat').wechat_interface;
var getToken = require('./wechat').getToken;

exports.sendTemplate = function(req,res){
  var sendData = function(){
    var path = '/cgi-bin/message/template/send?access_token='+access_token();
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

exports.setIndustry = function(req,res){
  var sendData = function(){
    var path = '/cgi-bin/template/api_set_industry?access_token='+access_token();
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

exports.getIndustry = function(req,res){
  var sendData = function(){
    var path = '/cgi-bin/template/get_industry?access_token='+access_token();
    wechat_interface(path,'','',function(data,code){
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

exports.getTemplateId = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/template/api_add_template?access_token='+access_token();
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

exports.getTemplateList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/template/get_all_private_template?access_token='+access_token();
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

exports.delTemplate = function(req,res){
  var delData = function(){
    var path = '/cgi-bin/template/del_private_template?access_token='+access_token();
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
