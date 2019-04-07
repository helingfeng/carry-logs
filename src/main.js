import Cookies from 'js-cookie';

;(function (win, doc, scr, nav) {

    var carryServer = win.carryServer || 'https://tongji.helingfeng.com';
    var userCookieKey = 'carry_user_id';

    // 获取域名
    function getDomain($default = 'github.com') {
        return doc.domain || $default;
    }

    // 获取网页标题
    function getTitle($default = 'github') {
        return doc.title || $default;
    }

    // 获取设备屏宽
    function getScreenWidth() {
        return scr.width || 0;
    }

    // 获取设备屏高
    function getScreenHeight() {
        return scr.height || 0;
    }

    // 获取设备用户代理
    function getUserAgent() {
        return nav.userAgent || '';
    }

    // 获取区域
    function getLanguage($default = 'zh-CN') {
        return nav.language || $default;
    }

    // 生成用户访问标识
    function getUserId() {
        return ((+new Date()).toString(36) + Math.random().toString(36).substr(2, 5));
    }

    // 上报数据
    function report(data, prefix) {

        // 若当前用户不存在访客标识，则生成对应访客标识
        let userId = Cookies.get(userCookieKey);
        if (userId === undefined) {
            userId = getUserId();
            Cookies.set(userCookieKey, userId);
        }

        data.user_id = userId;
        data.visit_time = (new Date()).valueOf();
        data.random = Math.random();

        let image = doc.createElement('img');
        image.src = carryServer + '/' + prefix + '.gif?' + httpBuildQuery(data);
    }

    function reportPageView(data = {}) {
        data.domain = getDomain();
        data.title = getTitle();

        data.screen_width = getScreenWidth();
        data.screen_height = getScreenHeight();
        data.language = getLanguage();
        data.user_agent = getUserAgent();

        report(data, 'page_view');
    }

    function reportErrorLog(data = {}) {
        data.user_agent = getUserAgent();

        report(data, 'error');
    }

    function reportEvent(event = {}) {
        report(event, 'event');
    }

    // 构建查询字符串
    function httpBuildQuery(param) {
        let url = '';
        for (let field in param) {
            url += "&" + field + "=" + encodeURIComponent(param[field]);
        }
        url = url ? url.substring(1) : url;
        return url;
    }

    win.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        let _error = {};
        _error.message = errorMessage;
        _error.script = scriptURI;
        _error.line = lineNumber;
        _error.column = columnNumber;
        _error.detail = JSON.stringify(errorObj);
        reportErrorLog(_error);
    };

    win.onbeforeunload = function () {
        let param = {};
        param._in = 0;
        reportPageView(param);
    };

    var eventHandler = function () {
        if (Object.prototype.toString.call(win.carryEvents) === '[object Array]') {
            var queue = win.carryEvents || [];
            win.carryEvents = {
                push: function (event) {
                    reportEvent(event);
                }
            };
            // 处理未加载代码前事件
            while (queue.length > 0) {
                win.carryEvents.push(queue.shift());
            }
        }

        let param = {};
        param._in = 1;
        reportPageView(param);
    };

    if (doc.readyState !== 'loading') {
        eventHandler();
    } else {
        doc.addEventListener('DOMContentLoaded', eventHandler);
    }

})(window, window.document, window.screen, window.navigator);