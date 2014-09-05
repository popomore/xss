# 简单 url 参数注入

---

http://www.wooyun.org/bugs/wooyun-2010-015957

## 运行

```
node server.js
```

访问后注入 http://127.0.0.1:3000/?a=%3Cimg%20src=1%20onerror=alert(1)%3E

**注：chrome 有安全过滤，关闭或者选用其他浏览器**

## 解决

使用 [he](https://github.com/mathiasbynens/he) 将 query 参数转义成 html 实体
