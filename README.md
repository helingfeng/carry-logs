# carry-logs
用于前端访问统计

## 如何使用

在页面头部添加`script`代码：

```javascript
var carryServer = 'https://carry.helingfeng.com';
var carryEvents = [];
(function () {
    var _carry = document.createElement('script');
    _carry.type = 'text/javascript';
    _carry.async = true;
    _carry.src = '../src/main.js';
    var _script = document.getElementsByTagName('script')[0];
    _script.parentNode.insertBefore(_carry, _script);
})();
```

## 定义事件埋点采集


```javascript
carryEvents.push({'track': '_trackEvent', 'action': 'music', 'label': 'play', 'value': 1});
```