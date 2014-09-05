# 注入到 script 中

---

http://www.wooyun.org/bugs/wooyun-2010-015959

## 运行

```
node server.js
```

访问后注入 http://127.0.0.1:3000/?a=a}%3C/script%3E%3Cscript%3Ealert(1)%3C/script%3E

可以直接调用 eval http://127.0.0.1:3000/?a=eval%28%27alert%281%29%27%29;String

**注：chrome 有安全过滤，关闭或者选用其他浏览器**

## 解决

使用 [he](https://github.com/mathiasbynens/he) 将 query 参数转义成 html 实体
