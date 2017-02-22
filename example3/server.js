var join = require('path').join;
var url = require('url');
var qs = require('querystring');
var createServer = require('../lib/server');
var he = require('he');

createServer(function(req, res) {
  var u = url.parse(req.url);
  var query = qs.parse(u.query);
  console.log(query);
  res.render(join(__dirname, 'index.html'), {
    //value: query.value,
    //href: query.href,

    // 一般属性转义成 html 实体
    value: he.encode(query.value || ''),

    // href 中在转成实体后还需要转 &
    href: transAnd(he.encode(query.href || '')),

    // 可注入 http://127.0.0.1:3000/?onxx=alert%281%29
    // 可注入 http://127.0.0.1:3000/?onxx=alert%26%23x28;1%26%23x29;
    // onxx: query.onxx,

    // 可注入 http://127.0.0.1:3000/?onxx=alert%281%29
    // 不可注入 http://127.0.0.1:3000/?onxx=alert%26%23x28;1%26%23x29;
    onxx: he.encode(query.onxx || '')


    // onXx 中在转成实体后还需要转 &
    //onxx: he.encode(query.onxx || '')

  });
});

function transAnd(str) {
  return str.replace(/&/g, '&amp;');
}
