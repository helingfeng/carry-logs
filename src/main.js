import cookie from 'js-cookie';

;(function (win, doc, scr, nav) {

    var carryServer = win.carryServer || 'https://tongji.helingfeng.com';

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

    function getUserId() {
        return ((+new Date()).toString(36) + Math.random().toString(36).substr(2, 3));
    }

    function report(data, prefix) {



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