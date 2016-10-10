'use strict';

var access_token = require('./wechat').params.access_token;
var getToken = require('./wechat').getToken;
var wechat_interface = require('./wechat').wechat_interface;
var querystring = require('querystring');

// 用户管理>标签管理之创建标签
exports.createTag = function(req,res){
  var path;
  if(!req.body.tag)
    return res.json({message: 'The tag is null!'});
  console.dir(access_token());
  console.dir('access_token');
  var create = function(){
    path = '/cgi-bin/tags/create?access_token='+access_token();
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

// 用户管理>标签管理之获取公众号已创建的标签
exports.getTag = function(req,res){
  var path;
  var getData = function(){
    path = '/cgi-bin/tags/get?access_token='+access_token();
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

// 用户管理>标签管理之编辑标签
exports.updateTag = function(req,res){
  if(!req.body.tag)
    return res.json({message: 'The tag is null!'});
  var path;
  var update = function(){
    path = '/cgi-bin/tags/update?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      update();
    });
  }else{
    update();
  }
};

// 用户管理>标签管理之删除标签
exports.delTag = function(req,res){
  if(!req.body.tag)
    return res.json({message: 'The tag is null!'});
  var path;
  var delData = function(){
    path = '/cgi-bin/tags/delete?access_token='+access_token();
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

// 用户管理>标签管理之获取标签下粉丝列表（原API请求方式误标为get方法）
exports.getUserByTag = function(req,res){
  var path;
  if(!req.body.tagid)
    return res.json({message: 'The tagid is null!'});
  var getData = function(){
    path = '/cgi-bin/user/tag/get?access_token='+access_token();
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

// 用户管理之批量为用户打标签
exports.taggingToUsers = function(req,res){
  var path;
  if(!req.body.tagid)
    return res.json({message: 'The tagid is null!'});
  if(!req.body.openid_list)
    return res.json({message: 'The openid_list is null!'});
  var addTag = function(){
    path = '/cgi-bin/tags/members/batchtagging?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      addTag();
    });
  }else{
    addTag();
  }
};

// 用户管理之批量为用户取消标签
exports.untaggingToUsers = function(req,res){
  var path;
  if(!req.body.tagid)
    return res.json({message: 'The tagid is null!'});
  if(!req.body.openid_list)
    return res.json({message: 'The openid_list is null!'});
  var addTag = function(){
    path = '/cgi-bin/tags/members/batchuntagging?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      addTag();
    });
  }else{
    addTag();
  }
};

// 用户管理之获取用户身上的标签list
exports.getTagList = function(req,res){
  var path;
  if(!req.body.openid)
    return res.json({message: 'The openid is null!'});
  var getTags = function(){
    path = '/cgi-bin/tags/getidlist?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      getTags();
    });
  }else{
    getTags();
  }
};

// 用户管理之设置用户备注名
exports.updateRemark = function(req,res){
  var path;
  if(!req.body.openid)
    return res.json({message: 'The openid is null!'});
  if(!req.body.remark)
    return res.json({message: 'The remark is null!'});
  var remark = function(){
    path = '/cgi-bin/user/info/updateremark?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(){
      remark();
    });
  }else{
    remark();
  }
};

exports.backupUserList = function(req,res){
  // this method will be rewrite if needed
};

// 用户管理之获取用户基本信息
exports.getUserInfo = function(req,res){
  var searchCon = {};
  searchCon.lang = req.query.lang? req.query.lang:'zh_CN';
  if(!req.query.openid)
    return res.json({message: 'null openid'});
  searchCon.openid = req.query.openid;
  var path;
  var getData = function(){
    searchCon.access_token = access_token();
    path = '/cgi-bin/user/info?'+querystring.stringify(searchCon);
    wechat_interface(path,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(access_token()){
    getData();
  }else{
    getToken(function(token){
      getData();
    });
  }
};

// 用户管理之批量获取用户基本信息
exports.getUserInfoBatch = function(req,res){
  if(!req.body.user_list){
    return res.json({message: 'null user_list'});
  }
  var getData = function(){
    var path = '/cgi-bin/user/info/batchget?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(token){
      getData();
    });
  }else{
    getData();
  }
};

// 用户管理之获取用户列表
exports.getUserList = function(req,res){
  var next_openid = req.query.next_openid;
  var getData = function(){
    var pathGetUser = '/cgi-bin/user/get?access_token='+access_token();
    if(next_openid)
      pathGetUser += '&next_openid='+next_openid;
    wechat_interface(pathGetUser,'','',function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(token){
      getData();
    });
  }else{
    getData();
  }
};

// 用户管理之黑名单管理-获取公众号的黑名单列表
exports.getBlackList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/tags/members/getblacklist?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(token){
      getData();
    });
  }else{
    getData();
  }
};

// 用户管理之黑名单管理-拉黑用户
exports.blackList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/tags/members/batchblacklist?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(token){
      getData();
    });
  }else{
    getData();
  }
};

// 用户管理之黑名单管理-取消拉黑用户
exports.unblackList = function(req,res){
  var getData = function(){
    var path = '/cgi-bin/tags/members/batchunblacklist?access_token='+access_token();
    wechat_interface(path,'POST',req.body,function(data,code){
      res.json(JSON.parse(data));
    });
  };
  if(!access_token()){
    getToken(function(token){
      getData();
    });
  }else{
    getData();
  }
};
