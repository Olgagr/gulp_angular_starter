var gzippo = require('gzippo'),
    express = require('express');

var app = express();
var environment = process.env.NODE_ENV;
var port = process.env.PORT || 8001;

app.get('/ping', function(req, res) {
  res.sendStatus(200);
});

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
              '\n__dirname = ' + __dirname +
              '\nprocess.cwd = ' + process.cwd());
});