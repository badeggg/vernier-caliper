/**
 * @badeggg
 * 2016.4.16 start coding
 * 开始
 */
var express = require('express');
var path = require('path');

var app = express();
app.use( express.static(__dirname) );
app.get('/', function(req, res){
  res.sendFile( path.join(__dirname, 'home.html') );
});
app.listen(3000);
console.log('vernier-caliper server running...');