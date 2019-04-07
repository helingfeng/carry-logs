# CarryLogs
页面加载完自动采集数据并上报，并支持手动埋点事件采集上报，适用于前端访问统计，如页面访问PV、UV等。
也可以统计用户停留页面时长，页面热点区，页面元素触发事件频率等。

## 如何使用？

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