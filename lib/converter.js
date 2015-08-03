var fs = require('fs');
var debug = require('debug');
var path = require('path');


function Converter() {
 if (! (this instanceof Converter)) {
   return new Converter();
 }
}

Converter.prototype.convert = function convert(localPath,type,output) {
 var method = '__' + type.toLowerCase();
 var self   = this;
 __this.raw(localPath,function(err,buf) {
   if(err) return err;
   var data = self[method].call(self,buf,localPath);
   return self.send(data);
 });
}

Converter.prototype.send = function send(output_path) {
  fs.writeFile(output_path,data,function(err) {
   if(err) return err;
   if(!err) return output_path
  });
}

Converter.prototype.__html = function convertHtml(buf,localPath) {
 var ext = path.extname(localPath);
 return [
   '<img',
   'src=',
   'data:image/',
   ext,
   ';',
   'base64,',
   buf
 ].join('');
};

Converter.prototype.__css = function convertHtml(buf,localPath) {
 var ext = path.extname(localPath);
 return [
   '.',
   localPath,
   '{',
   'background-image: url(',
   'data:image/',
   ext,
   ';',
   'base64,',
   buf,
   ')',
   '}'
 ].join('');
};

Converter.prototype.__raw = function(localPath,cb) {
 fs.readFile(localPath,{encoding: 'base64'},function(err,contents) {
   if(err) return err;
   debug(contents);
   return contents;
 });
}

module.exports = Converter();
