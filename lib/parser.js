var fs      = require('fs-extra');
var debug   = require('debug')('dev');
var path    = require('path');
var _       = require('lodash');
var Converter = require('./converter');

function Parser(options) {
if (!options.output) {
  return new Error('I need a path to return the output to');
}
 this.output_path = options.output;
 this.html        = options.html || false;
 this.css         = options.css || false;
 this.path        = options.path || false;
 this.paths = [];
 this.init(options.path);
}

Parser.prototype.init = function init() {
  var self = this;
  this.normalize(path,function(err) {
    if (err) {
      debug(err);
    }
    if(!err){
     self.getData();
    }
  });
};

Parser.prototype.getData = function getData() {
  var type = this.html || this.css || 'raw';
  if (this.paths.length >= 1) {
    debug('We are getting ready to parse a directory');
    _.map(this.paths,function(value){
      return Converter.convert(value,type,this.output_path);
    },this);
  }else{
    debug('We are getting ready to parse a file');
    return Converter.convert(this.path,type,this.output_path);
  }
};

Parser.prototype.normalize = function normalize(path,callback) {
  var self = this;
  fs.stat(path,function(err,stats) {
    if (err) return callback(err);
    if (!stats.isFile() || !stats.isDirectory()) {
      return callback(new Error('could not resolve file type') );
    }else if(stats.isDirectory()){
      self.paths = fs.readdirSync(path);
      debug(self.paths,'paths array');
      callback();
    }else{
      debug(self.path,'file path');
      self.path = path;
      callback();
    }
  });
};

module.exports = Parser;
