# html 属性注入

---

http://www.wooyun.org/bugs/wooyun-2010-015963

## 运行

```
node server.js
```

html 属性注入 http://127.0.0.1:3000/?value=a%22%20onclick=%22alert%281%29

href 注入 http://127.0.0.1:3000/?href=%27%2balert%281%29%2b%27

img 注入 http://127.0.0.1:3000/?onxx=alert%26%23x28;1%26%23x29;

**注：chrome 有安全过滤，关闭或者选用其他浏览器**

## 解决

使用 [he](https://github.com/mathiasbynens/he) 将 query 参数转义成 html 实体
