var express = require("express"),
    http = require('http'),
    config = require('config'),
    path = require("path");
var app = express(),
    server = http.createServer(app);
app.use(express.static(__dirname + config.get('App.path')));
app.use('/', express.static(__dirname + '/worker'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + config.get('App.path') + config.get('App.index')));
});
app.get('/redirect', function (req, res) {
    var query = req.query;
    // console.log('query', query);
    // res.status(200).json({app: "digibiz", query })
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<script>window.close(); location.href='djbusiness://status=${query.status}&msg=${query.message}$pathCode=${query.pathCode}'</script>`);
});
app.set('port', config.get('App.port'));
server.listen(app.get('port'), config.get('App.host'), function () {
    //console.log('Application running on port ' + app.get('port'));
});
