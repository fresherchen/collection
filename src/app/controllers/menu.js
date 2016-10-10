'use strict';

var access_token = require('./wechat').params.access_token;
var getToken = require('./wechat').getToken;
var wechat_interface = require('./wechat').wechat_interface;


// 自定义菜单创建接口
exports.createMenu = function(req,res){
  if(!req.body)
    return res.json({message: 'The body is null!'});
  var path;
  var create = function(){
    path = '/cgi-bin/menu/create?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      create();
    });
  }else{
    create();
  }
};

// 自定义菜单查询接口（menu为默认菜单，conditionalmenu为个性化菜单）
exports.getMenu = function(req,res){
  console.dir(getToken);
  var path;
  var getData = function(){
    path = '/cgi-bin/menu/get?access_token='+access_token();
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

// 自定义菜单删除接口（也会删除全部个性化菜单）
exports.deleteMenu = function(req,res){
  var path;
  var delMenu = function(){
    path = '/cgi-bin/menu/delete?access_token='+access_token();
    wechat_interface(path,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      delMenu();
    });
  }else{
    delMenu();
  }
};

// 创建个性化菜单
exports.addCondMenu = function(req,res){
  var path;
  var addMenu = function(){
    path = '/cgi-bin/menu/addconditional?access_token='+access_token();
    wechat_interface(path,'POST','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      addMenu();
    });
  }else{
    addMenu();
  }
};

// 删除个性化菜单
exports.delCondMenu = function(req,res){
  if(!req.body)
    return res.json({message: 'body is null!'});
  var path;
  var delMenu = function(){
    path = '/cgi-bin/menu/delconditional?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      delMenu();
    });
  }else{
    delMenu();
  }
};

// 获取自定义菜单配置接口
exports.getSelfMenu = function(req,res){
  var path;
  var getMenu = function(){
    path = '/cgi-bin/get_current_selfmenu_info?access_token='+access_token();
    wechat_interface(path,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getMenu();
    });
  }else{
    getMenu();
  }
};
