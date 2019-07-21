// ----------------------------------------------------------------------------------------------------------------- //

// Nano Core 2 - An adblocker
// Copyright (C) 2018-2019  Nano Core 2 contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ----------------------------------------------------------------------------------------------------------------- //

// For redirectable resources, see: https://github.com/NanoAdblocker/NanoCore2/tree/master/src/war

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

// Assign a variable when the document gets ready, 2 required arguments
// chain - The property chain
// value - The value to assign, must be 'null', 'true', or 'false'
//
/// nano-assign-variable-onready.js
(() => {
    var chain = '{{1}}';
    var value = '{{2}}';
    if (chain === '' || chain === '{{1}}') {
        return;
    }
    if (value === 'null') {
        value = null;
    } else if (value === 'true') {
        value = true;
    } else if (value === 'false') {
        value = false;
    } else {
        return;
    }
    var assign = function () {
        var parent = window;
        chain = chain.split('.');
        for (var i = 0; i < chain.length - 1; i++) {
            parent = parent[chain[i]];
        }
        parent[chain[chain.length - 1]] = value;
    };
    if (document.readyState === 'interactive' ||
        document.readyState === 'complete') {
        assign();
    } else {
        addEventListener('DOMContentLoaded', assign);
    }
})();

// ----------------------------------------------------------------------------------------------------------------- //

// Experimental resources, these can change or break at any time

// Based on KAADIVVVV
// License: https://github.com/Robotex/KAADIVVVV/blob/master/LICENSE
//
/// nano-vvvvid-it.js
(() => {
    function defuse() {
        var checkAdv = function () {
            this.hasAdv = false;
        };
        vvvvid.models.PlayerObj.prototype.checkAdv = checkAdv;
        window[wnbshgd] = vvvvid.models.PlayerObj.prototype.checkAdv;
    }
    if (typeof vvvvid === 'object') {
        defuse();
    } else {
        addEventListener('DOMContentLoaded', defuse);
    }
})();

/// nano-colombiaonline-com.js
(() => {
    var magic = 'a' + Math.random().toString(36).substring(2);
    var testScript = "typeof otab == 'function'";
    var testComment = /\d{5,} \d{1,2}/;
    //
    var getter = function () {
        var script, temp;
        //
        temp = Array.from(document.querySelectorAll(
            'script:not([src]):not([' + magic + '])'
        ));
        if (document.currentScript && !document.currentScript.hasAttribute(magic)) {
            temp.unshift(document.currentScript);
        }
        if (temp.length === 0) {
            return true;
        }
        for (var e of temp) {
            e.setAttribute(magic, '');
            if (e.textContent && e.textContent.includes(testScript)) {
                script = e;
                break;
            }
        }
        //
        if (script === undefined) {
            return true;
        }
        var prev = script.previousSibling;
        temp = prev;
        while (temp = temp.previousSibling) {
            if (temp.nodeType === Node.COMMENT_NODE && testComment.test(temp.data)) {
                prev.style.setProperty('display', 'none', 'important');
                return false;
            }
        }
    };
    //
    Object.defineProperty(window, "trev", {
        set: function () { },
        get: function () {
            var r;
            var i = 0;
            do {
                try {
                    r = getter();
                } catch (err) { }
            } while (i++ , !r && i < 100);
            return null;
        }
    });
    addEventListener('load', function () {
        void trev;
    });
    //
    var isInBackground = false;
    var reStart = /^\/[a-z_]+\.cms/;
    var reEnd = /^ \d{5,} \d{1,2} $/;
    var adsHidder = function () {
        if (isInBackground || !document.body) {
            return;
        }
        var iterator = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        var comment;
        while (comment = iterator.nextNode()) {
            if (reStart.test(comment.data)) {
                var toHide = [];
                var prev = comment;
                while (prev = prev.previousSibling) {
                    if (prev.nodeType === Node.COMMENT_NODE && reEnd.test(prev.data)) {
                        if (toHide.length < 15) {
                            for (var e of toHide) {
                                try {
                                    e.style.setProperty('display', 'none', 'important');
                                } catch (err) { }
                            }
                        }
                        break;
                    }
                    toHide.push(prev);
                }
            }
        }
    };
    addEventListener('focus', function () {
        isInBackground = false;
    });
    addEventListener('blur', function () {
        isInBackground = true;
    });
    setInterval(adsHidder, 1000);
})();

// Patch document.createElement and prevent created script from receiving network error event, 1 required argument
// url - The URL matcher of the script
//
/// nano-hijack-script-create.js
(() => {
    var _createElement = document.createElement;
    var needle = '{{1}}';
    if (needle === '' || needle === '{{1}}') {
        needle = '.?';
    } else if (needle.length > 2 && needle.startsWith('/') && needle.endsWith('/')) {
        needle = needle.slice(1, -1);
    } else {
        needle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    needle = new RegExp(needle);
    document.createElement = function (name) {
        var elem = _createElement.apply(this, arguments);
        if (name === 'script') {
            elem.addEventListener('error', function (e) {
                if (needle.test(elem.src)) {
                    e.preventDefault();
                    e.stopPropagation();
                    var ev = new Event('load');
                    elem.dispatchEvent(ev);
                }
            });
        }
        return elem;
    };
})();

// Remove elements when the document gets ready, 1 required argument
// selector - The selector for elements to remove, must be a plain CSS selector, pseudo-selectors are not supported
//
/// nano-remove-elements-onready.js
(() => {
    var selector = '{{1}}';
    if (selector === '' || selector === '{{1}}') {
        return;
    }
    var remove = function () {
        var elements = document.querySelectorAll(selector);
        for (var element of elements) {
            element.remove();
        }
    };
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        remove();
    } else {
        addEventListener('DOMContentLoaded', remove);
    }
})();

// Insert an invisible elements onto the page, can be used to dodge baits, 1 required argument
// identifier - An identifier, either an id or a class name.Like '#id' or '.class'
//
/// nano-make-bait-element.js
(() => {
    var identifier = '{{1}}';
    var element = document.createElement('div');
    if (identifier.charAt(0) === '#') {
        element.id = identifier.substring(1);
    } else if (identifier.charAt(0) === '.') {
        element.className = identifier.substring(1);
    } else {
        return;
    }
    element.style.display = 'none';
    document.documentElement.appendChild(element);
})();

// Grant fake notification permission
//
/// nano-grant-fake-notification.js
(() => {
    Notification = function () { };
    Notification.permission = 'default';
    Notification.requestPermission = function (callback) {
        Notification.permission = 'grante';
        if (callback) {
            setTimeout(callback, 0, 'granted');
        }
        return Promise.resolve('granted');
    };
})();

// ----------------------------------------------------------------------------------------------------------------- //

// Privileged resources, these are only available to Nano Adblocker's trusted filter lists

// Click elements when the document gets ready, 1 required argument
// selector - The selector for elements to remove, must be a plain CSS selector, pseudo-selectors are not supported
//
/// nanop-click-elements-onready.js
(() => {
    var guard = '{{nano}}';
    if (guard === '{{nano}}') {
        return;
    }
    var selector = '{{1}}';
    if (selector === '' || selector === '{{1}}') {
        return;
    }
    var click = function () {
        var elements = document.querySelectorAll(selector);
        for (var element of elements) {
            element.click();
        }
    };
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        click();
    } else {
        addEventListener('DOMContentLoaded', click);
    }
})();

// Click elements when the document gets loaded, 1 required argument
// selector - The selector for elements to remove, must be a plain CSS selector, pseudo-selectors are not supported
//
/// nanop-click-elements-onload.js
(() => {
    var guard = '{{nano}}';
    if (guard === '{{nano}}') {
        return;
    }
    var selector = '{{1}}';
    if (selector === '' || selector === '{{1}}') {
        return;
    }
    var click = function () {
        var elements = document.querySelectorAll(selector);
        for (var element of elements) {
            element.click();
        }
    };
    if (document.readyState === 'complete') {
        click();
    } else {
        addEventListener('load', click);
    }
})();

// Set a cookie, 1 required arguments, 3 optional arguments
// data   - The key = value pair
// path   - Optional, the path, default to current path
// domain - Optional, the domain, default to current domain
// secure - true or false; optional, default to false
// del    - true or false, set to true to delete the cookie instead; optional, default to false
//
/// nanop-easy-set-cookie.js
(() => {
    var guard = '{{nano}}';
    if (guard === '{{nano}}') {
        return;
    }
    var data = '{{1}}';
    var path = '{{2}}';
    var domain = '{{3}}';
    var secure = '{{4}}';
    var del = '{{5}}';
    if (data.indexOf('=') === -1) {
        return;
    }
    if (del === 'true') {
        data += ';max-age=-100';
    } else {
        data += ';max-age=2592000'; // 30 days
    }
    if (path !== '' && path !== '{{2}}') {
        data += ';path=' + path;
    }
    if (domain !== '' && domain !== '{{3}}') {
        data += ';domain=' + domain;
    }
    if (secure === 'true') {
        data += ';secure';
    }
    document.cookie = data;
})();

// Set a cookie the hard way, 1 required argument
// data - The cookie data to set
//
/// nanop-set-cookie.js
(() => {
    var guard = '{{nano}}';
    if (guard === '{{nano}}') {
        return;
    }
    var data = '{{1}}';
    if (data.indexOf('=') === -1) {
        return;
    }
    document.cookie = data;
})();

// ----------------------------------------------------------------------------------------------------------------- //
