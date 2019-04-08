# CarryLogs
页面加载完自动采集数据并上报，并支持手动埋点事件采集上报，适用于前端访问统计，如页面访问`PV`、`UV`等。
也可以统计用户停留页面时长，页面热点区，页面元素触发事件频率等。

## 如何使用？

CarryLogs 分为服务器端与客户端两部分，客户端负责采集用户行为数据，服务端负责接收上报数据，并存储分析用户行为，
使用数据可视化进行呈现。

### 服务端

```shell
# 进入服务端项目目录
cd server
# 安装依赖
composer install
# 启动服务并绑定端口
php -S localhost:8888 server.php
```
    
### 客户端

在页面头部添加`script`代码：
```javascript
var carryEvents = [], carryServer = 'http://localhost:8888';
(function () {
    var _carry = document.createElement('script');_carry.type = 'text/javascript';_carry.async = true;_carry.src = '../src/main.js';
    var _script = document.getElementsByTagName('script')[0];_script.parentNode.insertBefore(_carry, _script);
})();
```

## 客户端自定义事件埋点采集

手动添加`carryEvents.push`到需要埋点的代码块中，如：
```javascript
$('submit').on('click', function(){
    carryEvents.push({'track': '_trackEvent', 'action': 'submit', 'label': 'click', 'value': 1});
});
```