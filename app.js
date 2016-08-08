var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var messageparser = require('./utils/main.js')


var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);
});