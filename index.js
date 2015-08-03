var fs      = require('fs-extra');
var base64  = require('base64-stream');
var program = require('commander');
var debug   = require('debug')('dev');
var pkg     = require('./package.json');

program
  .version(pkg.version)
  .option('-i, --input', 'Input File or Directory')
  .option('-o, --output', 'Ouput File or Directory')
  .option('-h, --html', 'Configure the output to be html image tags')
  .parse(process.argv);

 if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
  }else{
   var options = program.input;
   console.log(options);
  }




