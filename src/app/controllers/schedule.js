'use strict';
var schedulelist = {};
var mongoose = require('mongoose'),
  Schedules = mongoose.model('Schedules'),
  errorHandler = require('./errors'),
  Material = require('./material'),
  Messages = require('./message'),
  nodeschedule = require('node-schedule'),
  _ = require('lodash'),
  fs = require('fs'),
  requestForm = require('request'),
  tempPath = './tempImg';

function send(data,callback){
  console.dir('00000000000000000000000');
  var date = new Date(parseInt(data.sendOn)*1000);

  console.dir(new Date());
  console.dir('11111111111111111111111');
  console.dir(date);
  // nodeschedule.scheduleJob('10 24 15 * * *',function(){
  var j = nodeschedule.scheduleJob(date,function(){
  console.dir('222222222222222222222222');

  console.dir(new Date());
    var sendTo;
    if(data.touser){
      sendTo = {
        touser:data.touser,
        mpnews:data.mpnews,
        msgtype:data.msgtype
      };
    }else if(data.filter){
      delete sendTo.touser;
      sendTo.filter = data.filter;
    }
    console.dir(sendTo);
    Messages.sendMassMessageByOpenID(sendTo,function(cb){
      console.dir('55555555555555555555555');
      callback(cb);
    });
  });

  schedulelist[data.id] = j;
}

function initJobs(){
  var timestamp = new Date().getTime();
  var searchCon = {
    sendOn: {$gte: timestamp}
  },
  count = 0,limit = 10,totalPage;

  Schedules.find(searchCon).count(function(err,totalCount){
    if(totalCount <= limit){
      execByPage(count);
    }else{
      totalPage = Math.ceil(totalCount/limit);
      for(var i=0;i<totalPage;i++){
        execByPage(i);
      }
    }
  });
  function execByPage(count){
    Schedules.find(searchCon).limit(limit).skip(count*limit).exec(function(err,cbd){
      if(err) throw err;
      console.dir(cbd.length);
      // console.dir('ScheduleJob.length+++++++++++++++++');
      function exec(schedule){
        send(schedule,function(bd){
          console.dir(schedule);
          console.dir(bd);
        });
      }
      for(var key in cbd){
        var schedule = cbd[key];
        // console.dir(schedule);
        // console.dir('scheduleJob to reschedule+++++++++');
        exec(schedule);
      }
    });
  }
  // need to delete the files in the tempPath dir
  var deleteTempDir = function(path){
    if(fs.existsSync(path)){
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path+'/'+file;
        if(fs.lstatSync(curPath).isDirectory()){
          deleteTempDir(path);
        }else{
          fs.unlink(curPath);
        }
      });
    }else{
      fs.mkdirSync(path);
    }
  };
  deleteTempDir(tempPath);
}

initJobs();

function sendState(schedule){
  send(schedule,function(cb){
    if(JSON.parse(cb).errcode === 0){
      var conditions = {
          _id: schedule.id
        },
        update = {
          $set:{
            status: true
          }
        },
        options = {
          multi: false
        };
      Schedules.update(conditions,update,options,function(err,cbd){
        if(err) throw err;
        console.dir(cbd);
      });
    }else{
      console.dir(cb);
    }
  });
}

function saveInDb(req,res){
  var material = new Schedules(req.body);
  material.save(function(err,item){
    if(err){
      return res.status(400).send({
        message:errorHandler.getErrorMessage(err)
      });
    }else{
      sendState(item);
      res.json({message: 'ok,this task is on shedule!',item:item});
    }
  });
}

exports.save = function(req,res){

  function saveAndSchedule(req,res){
    if(req.body.touser.length || req.body.filter.tag_id){
      if(!req.body.mpnews.media_id){
        Material.addNewsMaterial(req.body.artObj,req,function(mpnews){
          if(!JSON.parse(mpnews).errcode){
            req.body.mpnews.media_id = JSON.parse(mpnews).media_id;
            req.body.status = false;
            saveInDb(req,res);
          }else{
            res.json(JSON.parse(mpnews));
          }
        });
      }else{
        saveInDb(req,res);
      }
    }else{
      res.json({message: 'touser and tag_id, at least one is not null!'});
    }
  }

  function getMediaId(k,article){
    var url = article.url;

    requestForm.head(url, function(err, response, body){
      if(err){
        return res.json(JSON.parse(err));
      }
      var filename = new Date().getTime();
      // './tempImg'
      // var path = './tempImg/'+filename+'.jpg';
      var path = tempPath+'/'+filename+'.jpg';
      requestForm(url).pipe(fs.createWriteStream(path)).on('close', function(){
        Material.addMaterial(response.headers['content-type'],path,function(data){
          if(JSON.parse(data).media_id){
            article.thumb_media_id = JSON.parse(data).media_id;
            fs.unlink(path, function (err) {
              if (err) throw err;
                console.log('delete '+tempPath+' successfully!');
            });
            var i = req.body.artObj.articles.length-1;
            if( k===i ){
              saveAndSchedule(req,res);
            } else {
              getMediaId(k+1, req.body.artObj.articles[k+1]);
            }
          }else{
            res.json(JSON.parse(data));
          }
        });
      });
    });
  }
  // 暂定传url，不传thumb_media_id
  if(req.body.artObj.articles.length){
    if(req.body.artObj.articles)
    getMediaId(0,req.body.artObj.articles[0]);
  }else{
    saveAndSchedule(req,res);
  }
};

exports.read = function(req,res){
  res.json(req.schedule);
};

exports.list = function(req,res){
  var searchCon = {},
    count = req.query.count?req.query.count:0,
    limit = req.query.limit?req.query.limit:10,
    totalPage;
  if(req.query.key){
    var key = new RegExp('.*'+req.query.key+'.*','gi');
    searchCon.$or = [{'artObj.articles.title': key},{'artObj.articles.author': key},
    {'artObj.articles.content': key},{'artObj.articles.digest': key}];
  }

  Schedules.find(searchCon).count(function(err,totalCount){
    Schedules.find(searchCon).limit(limit).skip(count*limit).exec(function(err,articles){
      if(err){
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }else{
        res.json({totalCount: totalCount,articles: articles});
      }
    });
  });
};

exports.update = function(req,res){
  var material = _.extend(req.schedule, req.body);
  Material.updateNewsMaterial(material,function(data){
    if(JSON.parse(data).errcode === 0){
      material.save(function(err,cbd){
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          if(schedulelist){
            var scheduleJob;
            var key = cbd.id;
            console.dir(schedulelist);
            for(key in schedulelist){
              scheduleJob = schedulelist[key];
              scheduleJob.cancel();
              sendState(cbd);
            }
          }
          res.json(cbd);
        }
      });
    }else{
      res.json(JSON.parse(data));
    }
  });
};

exports.delete = function(req,res){
  var material = req.schedule;
  Material.delMaterial(material,function(data){
    if(JSON.parse(data).errcode === 0){
      material.remove(function(err){
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          if(schedulelist){
            var key = material.id;
            for(key in schedulelist){
              var scheduleJob = schedulelist[key];
              scheduleJob.cancel();
              delete schedulelist[key];
            }
          }
          res.json({message: 'scheduleJob'+ material.id +' has been deleted!'});
        }
      });
    }else{
      res.json(JSON.parse(data));
    }
  });
};

exports.getScheduleById = function(req,res,next,id){
  Schedules.findById(id).exec(function(err,schedule){
    if(err) return next(err);
    if(!schedule) return next(new Error('Failed to load the schedule'+ id));
    req.schedule = schedule;
    next();
  });
};
