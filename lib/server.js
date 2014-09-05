var fs = require('fs');
var http = require('http');
var through = require('through2');

module.exports = function createServer(callback) {
  http.createServer(function (req, res) {
    res.render = function(file, model) {
      render('index.html', model)
      .pipe(res);
    };

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    callback(req, res);
  }).listen(3000, '127.0.0.1');
  console.log('Server running at http://127.0.0.1:3000/');
};

function render(path, model) {
  var html = '';
  return fs.createReadStream(path)
  .pipe(through(function transform(buf, enc, cb) {
    html += buf;
    cb();
  }, function flush(cb) {
    html = html.replace(/{{(.*?)}}/g, function(a, b) {
      return model[b] || '';
    });
    this.push(html);
    html = '';
    cb();
  }));
}
