'use strict';

/**
 * Modules dependencies
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var WechatSchema = new Schema({
  user: {
    type: String
  },
  access_token: {
    type: String
  }
});

mongoose.model('Wechats',WechatSchema);
