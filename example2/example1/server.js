var join = require('path').join;
var url = require('url');
var qs = require('querystring');
var createServer = require('../lib/server');
var he = require('he');

createServer(function(req, res) {
  var u = url.parse(req.url);
  var query = qs.parse(u.query);
  res.render(join(__dirname, 'index.html'), {
    // a: he.encode(query.a || '') // 转义防止 xss
    a: query.a
  });
});
