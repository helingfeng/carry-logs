;(function (win, doc, scr, nav) {

    var carryServer = carryServer || 'https://tongji.helingfeng.com';
    var carryEvents = carryEvents || [];

    /* 网页描述 */

    function getDomain($default = 'github.com') {
        return doc.domain || $default;
    }

    function getTitle($default = 'github') {
        return doc.title || $default;
    }


    /* 浏览器设备参数 */

    function getScreenWidth() {
        return scr.width || 0;
    }

    function getScreenHeight() {
        return scr.height || 0;
    }

    function getUserAgent() {
        return nav.userAgent || '';
    }

    function getLanguage($default = 'zh-CN') {
        return nav.language || $default;
    }


    function report(url, data, prefix) {
        data.visit_time = (new Date()).valueOf();
        data.random = Math.random();

        let image = doc.createElement('img');
        image.src = carryServer + '/' + prefix + '.gif?' + httpBuildQuery(data);
    }

    function reportPageView(data) {
        data.domain = getDomain();
        data.title = getTitle();

        data.screen_width = getScreenWidth();
        data.screen_height = getScreenHeight();
        data.language = getLanguage();
        data.user_agent = getUserAgent();

        report(data, 'page_view');
    }

    function reportErrorLog(data) {
        data.user_agent = getUserAgent();

        report(data, 'error');
    }

    function reportEvent(event) {
        let data = {};
        data.event = event;

        report(data, 'event');
    }

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
        if (Object.prototype.toString.call(carryEvents) === '[object Array]') {
            var queue = carryEvents || [];
            carryEvents = {
                push: function (event) {
                    reportEvent(carryServer, event, 'event');
                }
            };
            // 处理未加载代码前事件
            while (queue.length > 0) {
                carryEvents.push(queue.shift());
            }
        }

        let param = {};
        param._in = 1;
        reportPageView();
    };

    if (doc.readyState !== 'loading') {
        eventHandler();
    } else {
        doc.addEventListener('DOMContentLoaded', eventHandler);
    }

})(window, window.document, window.screen, window.navigator);