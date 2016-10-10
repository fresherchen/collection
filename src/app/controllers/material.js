'use strict';

var access_token = require('./wechat').params.access_token;
var fs = require('fs');
var requestForm = require('request');
var getToken = require('./wechat').getToken;
var wechat_interface = require('./wechat').wechat_interface;
var options = require('./wechat').params.options;

// 新增临时素材（原上传多媒体文件，类型包括图片、语音、视频、缩略图）
exports.upload = function(req,res){
  var type = req.query.type;
  var upload = function(){
    var path = '/cgi-bin/media/upload?access_token='+access_token()+'&type='+type;
    var formData = {
      media: fs.createReadStream(req.files.media.path)
    };
    requestForm.post({url:'https://'+options.hostname+path, formData: formData}, function (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      res.json(JSON.parse(body));
    });
  };
  if(!access_token()){
    getToken(function(token){
      upload();
    });
  }else{
    upload();
  }
};

// exports.upload = function(type,req,callback){
//   var upload = function(){
//     var path = '/cgi-bin/media/upload?access_token='+access_token()+'&type='+type;
//     var formData = {
//       media: fs.createReadStream(req.files.media.path)
//     };
//     requestForm.post({url:'https://'+options.hostname+path, formData: formData}, function (err, httpResponse, body) {
//       if (err) {
//         return console.error('upload failed:', err);
//       }
//       callback(body);
//     });
//   };
//   if(!access_token()){
//     getToken(function(token){
//       upload();
//     });
//   }else{
//     upload();
//   }
// };

// 上传图文消息内图片获取URL
exports.uploadImg = function(req,res){
  var upload = function(){
    var path = '/cgi-bin/media/uploadimg?access_token='+access_token();
    var formData = {
      media: fs.createReadStream(req.files.media.path)
    };
    requestForm.post({url:'https://'+options.hostname+path, formData: formData}, function (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      res.json(JSON.parse(body));
    });
  };
  if(!access_token()){
    getToken(function(token){
      upload();
    });
  }else{
    upload();
  }
};

// 上传图文消息素材(临时图文素材,三天有效期，过期则报media_id invalid，
// 无法使用永久素材接口RUD，故请慎用)
exports.uploadnews = function(article,req,callback){
  if(!req.body)
    return callback({message: 'article is null!'});
  var uploadnews = function(){
    var path = '/cgi-bin/media/uploadnews?access_token='+access_token();
    wechat_interface(path,'POST',article,function(data,code){
      callback(data);
    });
  };
  if(!access_token()){
    getToken(function(){
      uploadnews();
    });
  }else{
    uploadnews();
  }
};
// exports.uploadnews = function(req,res){
//   if(!req.body)
//     return res.json({message: 'body is null!'});
//   var uploadnews = function(){
//     var path = '/cgi-bin/media/uploadnews?access_token='+access_token();
//     wechat_interface(path,'POST',req.body,function(data,code){
//       res.json(JSON.parse(data));
//     });
//   };
//   if(!access_token()){
//     getToken(function(){
//       uploadnews();
//     });
//   }else{
//     uploadnews();
//   }
// };

// 新增永久图文素材
exports.addNewsMaterial = function(article,req,callback){
  if(!req.body)
    return callback({message: 'article is null!'});
  var addData = function(){
    var path = '/cgi-bin/material/add_news?access_token='+access_token();
    wechat_interface(path,'POST',article,function(data,code){
      callback(data);
    });
  };
  if(!access_token()){
    getToken(function(){
      addData();
    });
  }else{
    addData();
  }
};
// exports.addNewsMaterial = function(req,res){
//   if(!req.body)
//     return res.json({message: 'req.body is null!'});
//   var addData = function(){
//     var path = '/cgi-bin/material/add_news?access_token='+access_token();
//     wechat_interface(path,'POST',req.body,function(data,code){
//       res.json(data);
//     });
//   };
//   if(!access_token()){
//     getToken(function(){
//       addData();
//     });
//   }else{
//     addData();
//   }
// };

// 获取永久素材
exports.getNewsMaterial = function(req,res){
  if(!req.body.media_id)
    return res.json({message: 'media_id is null!'});
  var path;
  var getData = function(){
    path = '/cgi-bin/material/get_material?access_token='+access_token();
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

// 修改永久图文素材(修改永久图文素材，不能修改'media/uploadnews'端口的素材)
exports.updateNewsMaterial = function(material,callback){
  if(!material && material.index)
    return callback({message: 'data or index is null'});
  var readyMaterial = {
    media_id: material.mpnews.media_id,
    index: material.index,
    articles:material.artObj.articles[material.index]
  };
  var update = function(){
    var path = '/cgi-bin/material/update_news?access_token='+access_token();
    wechat_interface(path,'POST',readyMaterial,function(data,code){
      callback(data);
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
// exports.updateNewsMaterial = function(req,res){
//   if(!req.body)
//     return res.json({message: 'req.body is null'});
//   var path;
//   var update = function(){
//     path = '/cgi-bin/material/update_news?access_token='+access_token();
//     wechat_interface(path,'POST',req.body,function(data,code){
//       res.json(JSON.parse(data));
//     });
//   };
//   if(!access_token()){
//     getToken(function(){
//       update();
//     });
//   }else{
//     update();
//   }
// };


// 新增其他类型永久素材（多媒体素材，类型包括图片、语音、视频、缩略图）
exports.addMaterial = function(type,filesPath,callback){
  var path;
  var upload = function(){
    path = '/cgi-bin/material/add_material?access_token='+access_token()+'&type='+type;
    var formData = {
      media: fs.createReadStream(filesPath)
    };
    requestForm.post({url:'https://'+options.hostname+path, formData: formData}, function (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      callback(body);
    });
  };
  if(!access_token()){
    getToken(function(){
      upload();
    });
  }else{
    upload();
  }
};

// exports.addMaterial = function(req,res){
//   var type = req.query.type;
//   if(type === 'video'){
//     if(!req.body.description){
//       return res.json({message: 'The description is null when type is video!'});
//     }
//   }
//   if(!req.files){
//     return res.json({message: 'The file is null which is uploading!'});
//   }
//   var path;
//   var upload = function(){
//     path = '/cgi-bin/material/add_material?access_token='+access_token()+'&type='+type;
//     var formData = {
//       media: fs.createReadStream(req.files.media.path)
//     };
//     if(type === 'video')
//       formData.description = req.body.description;
//     requestForm.post({url:'https://'+options.hostname+path, formData: formData}, function (err, httpResponse, body) {
//       if (err) {
//         return console.error('upload failed:', err);
//       }
//       res.json(JSON.parse(body));
//     });
//   };
//   if(!access_token()){
//     getToken(function(){
//       upload();
//     });
//   }else{
//     upload();
//   }
// };

// 删除永久素材
exports.delMaterial = function(material,callback){
  if(!material)
    return callback({message: 'media_id is null!'});
  var del = function(){
    var path = '/cgi-bin/material/del_material?access_token='+access_token();
    material = material.mpnews;
    wechat_interface(path,'POST',material,function(data,code){
      callback(data);
    });
  };
  if(!access_token()){
    getToken(function(){
      del();
    });
  }else{
    del();
  }
};
// exports.delMaterial = function(req,res){
//   if(!req.body.media_id)
//     return res.json({message: 'media_id is null!'});
//   var del = function(){
//     var path = '/cgi-bin/material/del_material?access_token='+access_token();
//     wechat_interface(path,'POST',req.body,function(data,code){
//       res.json(JSON.parse(data));
//     });
//   };
//   if(!access_token()){
//     getToken(function(){
//       del();
//     });
//   }else{
//     del();
//   }
// };

// 获取素材总数
exports.getMaterialCount = function(req,res){
  var path;
  var getData = function(){
    path = '/cgi-bin/material/get_materialcount?access_token='+access_token();
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

// 获取素材详细
exports.getMaterialBatch = function(req,res){
  var path;
  var getData = function(){
    path = '/cgi-bin/material/batchget_material?access_token='+access_token();
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
