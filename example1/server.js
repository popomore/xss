var fs = require('fs');
var join = require('path').join;
var http = require('http');
var through = require('through2');
var url = require('url');
var qs = require('querystring');
var he = require('he');

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var u = url.parse(req.url);
  var query = qs.parse(u.query);
  var model = {
    // a: he.encode(query.a || '') // 转义防止 xss
    a: query.a
  };
  render('index.html', model)
  .pipe(res);
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

function render(file, model) {
  var html = '';
  return fs.createReadStream(join(__dirname, file))
  .pipe(through(function transform(buf, enc, cb) {
    html += buf;
    cb();
  }, function flush(cb) {
    html = html.replace(/{{(.*?)}}/, function(a, b) {
      return model[b] || '';
    });
    this.push(html);
    html = '';
    cb();
  }));
}
