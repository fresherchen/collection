'use strict';

var mongoose =require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    _id : false,
    thumb_media_id: String,
    author: String,
    title: String,
    content_source_url: String,
    content: String,
    digest: String,
    show_cover_pic: Number
  });

var ScheduleSchema = new Schema({
  touser:{
    type: Array
  },
  filter:{
    is_to_all: Boolean,
    tag_id: Number
  },
  mpnews:{
    media_id: String
  },
  msgtype:{
    type: String
  },
  artObj:{
    articles:[
      ArticleSchema
  ]},
  sendOn: Number,
  status: {
    type: Boolean,
    default: false
  },
  index: Number
});

mongoose.model('Schedules',ScheduleSchema);
