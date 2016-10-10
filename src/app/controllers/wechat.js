'use strict';
/**
 * Modules dependencies.
 */
var mongoose = require('mongoose'),
  https = require('https'),
  Wechats = mongoose.model('Wechats'),
  querystring = require('querystring'),
  _ = require('lodash'),
  fs = require('fs'),
  index = require('../../dbconf/index'),
  config = require('../../config/config');
var wechat = require('wechat');

var access_token,
  middleware_token = config.wechat.middleware_token;

exports.params = {
  appInfo : {
    grant_type:'client_credential',
    appid:config.wechat.appid,
    secret:config.wechat.secret
  },
  options : {
    hostname: 'api.weixin.qq.com',
    method: 'GET'
  },
  access_token: function(){
    return access_token;
  }
};

exports.index = function(req,res){
  res.render('index',{
    title: 'Wechat',
    content: 'The Wechat server is running with '+ (index.dbMode).charAt(0).toUpperCase()+ (index.dbMode).slice(1) +'~'
  });
};

exports.wechatMiddleware = wechat(middleware_token,function(req,res,next){
  var message = req.weixin;
  console.dir(message);
var refillStr = '<a href=' + message.FromUserName + '\'>1. 业务介绍</a>';
    var consumeStr = '<a href=\'http://your_IP/weixin/consume?weixinId=' + message.FromUserName + '\'>2. 服务理念</a>';
    var deleteStr = '<a href=' + message.FromUserName + '\'>3. 关于我们</a>';
    var historyStr = '<a href=' + message.FromUserName + '\'>4. 调戏新妹~</a>';

    var emptyStr = '        ';
    var replyStr = '感谢你的关注！' + '\n'+ emptyStr + '\n' + refillStr + '\n'+ emptyStr + '\n' + consumeStr + '\n'+ emptyStr + '\n' + deleteStr + '\n'+ emptyStr + '\n' + historyStr;

  if((message.MsgType === 'event') && (message.Event === 'subscribe')){
    return  res.reply(replyStr);
  }

  if(message.Content === 'hello'){
    res.reply('hehe，你好');
  }else
  if(message.Content === 'list'){
    res.reply({
      content: replyStr,
      type: 'text'
    });
  }else
  if(message.Content === '音乐'){
    res.reply({
      type:'music',
      content:{
        title:'来首music吧',
        description:'i have nothing',
        musicUrl:'Z-Hhmyp2HjsRf32cMIP3tlA_DD1ndfS9gId9uUyaTvA'
      }
    });
  }else{
    res.reply([{
        title:'这个问题我暂时无法回答',
        description:'这个问题哦，我想想。。。太难了，我需要学习学习再回答你吧！',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
    }]);
  }
});


function requestRec(count,options,params,callback){
  var request = https.request(options, function(response){
    var str = '';
    response.on('data', function(d) {
      str += d;
    });
    response.on('end', function(){
      if(JSON.parse(str).errcode === 42001 && count === 0){
        exports.getToken(function(token){
          count++;
          requestRec(count,options,params,callback);
        });
      }else{
        callback(str,response.statusCode);
      }
    });
    request.on('error', function(e){
      callback(e,response.statusCode);
    });
  }).on('error', function(e) {
    console.log('get error: ' + e.message);
  });
  request.write(params);
  request.end();
}

// application/json  multipart/form-data
exports.wechat_interface = function(path,method,params,callback){
  if(params)
    params = JSON.stringify(params);
  exports.params.options.path = path;
  exports.params.options.method = method?method:'GET';
  exports.params.options.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(params)
  };
    // console.dir(exports.params.options);
    // console.dir('options');
    // console.dir(params);
  var count = 0;
  requestRec(count,exports.params.options,params,callback);
};

exports.getToken = function(callback){
  var path = '/cgi-bin/token?'+ querystring.stringify(exports.params.appInfo);
  var pathDBUser = '/tokens';
  index.operations(pathDBUser,'','',function(data,code){
    if(JSON.parse(data).length){
      if(access_token){
        module.exports.wechat_interface(path,'','',function(back_data,back_code){
          var readyVal = _.extend(JSON.parse(data)[0],JSON.parse(back_data));
          index.operations(pathDBUser+'/'+readyVal._id,'PUT',readyVal,function(return_data,return_code){
            access_token = JSON.parse(return_data).access_token;
            callback(return_data,return_code);
          });
        });
      }else{
        access_token = JSON.parse(data)[0].access_token;
        callback(data,code);
      }
    }else{
      module.exports.wechat_interface(path,'','',function(back_data,back_code){
        index.operations(pathDBUser,'POST',JSON.parse(back_data),function(return_data,return_code){
          access_token = JSON.parse(back_data).access_token;
          callback(return_data,return_code);
        });
      });
    }
  });
};

exports.getAccessToken = function(req,res){
  exports.getToken(function(token){
    res.json(JSON.parse(token));
  });
};
