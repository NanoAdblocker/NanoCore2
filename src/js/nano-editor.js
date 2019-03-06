/******************************************************************************

    Nano Core 2 - An adblocker
    Copyright (C) 2018  Nano Core 2 contributors

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*******************************************************************************

    Editor with syntax highlighting.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nano = nano || {};

/*****************************************************************************/

const safeCompileRegExp = (str, fallback) => {
    try {
        return new RegExp(str);
    } catch (err) {
        return fallback;
    }
};

/*****************************************************************************/

ace.define("ace/mode/nano_filters", function (require, exports, module) {
    const oop = ace.require("ace/lib/oop");
    const unicode = require("ace/unicode");

    const TextMode = ace.require("ace/mode/text").Mode;
    const HighlightRules =
        ace.require("ace/mode/nano_filters_hr").HighlightRules;

    // The way tokenRe works seems to have changed, must test when updating
    // Ace
    // https://github.com/ajaxorg/ace/pull/3454/files#diff-2a8db065be808cdb78daf80b97fcb4aa
    exports.Mode = function () {
        this.HighlightRules = HighlightRules;
        this.lineCommentStart = "!";
        this.tokenRe = new RegExp(
            "^[" +
            unicode.packages.L + unicode.packages.Mn +
            unicode.packages.Mc + unicode.packages.Nd +
            unicode.packages.Pc +
            "\\-_.]+",
            "g"
        );
    };
    oop.inherits(exports.Mode, TextMode);
});

/*****************************************************************************/

ace.define("ace/mode/nano_filters_hr", function (require, exports, module) {
    var oop = ace.require("ace/lib/oop");
    var TextHighlightRules =
        ace.require("ace/mode/text_highlight_rules").TextHighlightRules;

    // Order is important
    exports.HighlightRules = function () {
        this.$rules = {

            /*****************************************************************/

            start: [

                /*************************************************************/

                // Subfilter
                {
                    token: "keyword",
                    regex: /! (?:>>>>>>>>|<<<<<<<<) /,
                    next: "subfilter"
                },

                // Preprocessor
                {
                    token: "keyword",
                    regex: /^!#/,
                    next: "preprocessor"
                },

                /*************************************************************/

                // Comments
                {
                    token: "invisible",
                    regex: /^(?:!|#(?: |$)|\[).*/
                },

                {
                    token: "invisible",
                    regex: / #.*/
                },

                /*************************************************************/

                // Extended filtering
                {
                    token: "keyword",
                    regex: /#@?(?:\?|\$\??)?#\^?(?!$)/,
                    next: "double_hash"
                },

                // Operator @ misused
                {

                    token: "invalid",
                    regex: /#@?(?:\?|\$\??)?@#\^?(?!$).*/
                },

                // Raw JavaScript injection is not supported
                {
                    token: "invalid",
                    regex: /#@?%@?#.*/
                },

                /*************************************************************/

                // Network filtering
                {
                    token: "keyword",
                    regex: /^@@/
                },

                // Special characters
                {
                    token: "keyword.operator",
                    regex: /\||,|\^|\*/
                },

                // Empty option
                {
                    token: "invalid",
                    regex: /\$(?!.*?(?:\/|\$)),/,
                    next: "options"
                },

                // Trailing operator $
                {
                    token: "invalid",
                    regex: /\$$/
                },

                // Options
                {
                    token: "keyword",
                    regex: /\$(?!.*?(?:\/|\$))/,
                    next: "options"
                },

                // Domains (default)
                {
                    defaultToken: "string"
                }

                /*************************************************************/

            ],

            /*****************************************************************/

            subfilter: [
                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Subfilter URL (default)
                {
                    defaultToken: "text"
                }
            ],

            /*****************************************************************/

            preprocessor: [
                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Includes
                {
                    token: "keyword",
                    regex: /include (?!$)/,
                    next: "include_url"
                },

                // If condition
                {
                    token: "keyword",
                    regex: /if (?!$)/,
                    next: "include_url"
                },

                // End if condition
                {
                    token: "keyword",
                    regex: /endif/,
                    next: "start"
                },

                // Invalid (default)
                {
                    defaultToken: "invalid"
                }
            ],

            /*****************************************************************/

            include_url: [
                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Subfilter URL (default)
                {
                    defaultToken: "text"
                }
            ],

            /*****************************************************************/

            double_hash: [
                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Script inject
                {
                    token: "keyword",
                    regex: /\+js\(|script:inject\(/,
                    next: "script_inject_part1"
                },

                // CSS (default)
                {
                    defaultToken: "constant"
                }
            ],

            /*****************************************************************/

            script_inject_part1: [
                // Trailing comma
                {
                    token: "invalid",
                    regex: /,\)?$/,
                    next: "start"
                },

                // Exit
                {
                    token: "keyword",
                    regex: /\)$/,
                    next: "start"
                },

                // Mismatch parentheses
                {
                    token: "invalid",
                    regex: /.?$/,
                    next: "start"
                },

                // Parameters
                {
                    token: "keyword",
                    regex: /,/,
                    next: "script_inject_part2"
                },

                // Script snippet name (default)
                {
                    defaultToken: "variable"
                }
            ],

            /*****************************************************************/

            script_inject_part2: [
                // Mismatch parentheses
                {
                    token: "invalid",
                    regex: /[^\)]?$/,
                    next: "start"
                },

                // Exit
                {
                    token: "keyword",
                    regex: /\)$/,
                    next: "start"
                },

                // Separator
                {
                    token: "keyword",
                    regex: /,/,
                    next: "script_inject_part2"
                },

                // Parameter (default)
                {
                    defaultToken: "constant"
                }
            ],

            /*****************************************************************/

            options: [
                // Trailing comma
                {
                    token: "invalid",
                    regex: /,$/,
                    next: "start"
                },

                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Options separator
                {
                    token: "keyword.operator",
                    regex: /,/
                },

                // Modifiers
                {
                    token: "keyword",
                    regex: new RegExp([
                        "~?(?:" + [
                            "third-party",
                            "3p",
                            "first-party",
                            "1p"
                        ].join("|") + ")",
                        "doc(?:ument)?",
                        "important",
                        "badfilter"
                    ].join("|"))
                },

                // Actions
                {
                    // inline-font and inline-script must be before font
                    // and script
                    token: "variable",
                    regex: new RegExp([
                        "elemhide",
                        "generichide",
                        "ghide",
                        "inline-font",
                        "inline-script",
                        "popunder",
                        "popup"
                    ].join("|"))
                },

                // Resource type
                {
                    // object-subrequest must be before object
                    token: "variable",
                    regex: new RegExp([
                        "~?(?:" + [
                            "css",
                            "font",
                            "image",
                            "media",
                            "object(?:-subrequest)?",
                            "script",
                            "stylesheet",
                            "xhr",
                            "xmlhttprequest"
                        ].join("|") + ")",
                        "i?frame",
                        "mp4",
                        "subdocument"
                    ].join("|"))
                },

                // Special types
                {
                    token: "variable",
                    regex: new RegExp([
                        "~?(?:" + [
                            "beacon",
                            "other",
                            "ping",
                            "websocket"
                        ].join("|") + ")",
                        "data"
                    ].join("|"))
                },

                // Redirect
                {
                    token: "keyword",
                    regex: /redirect=/,
                    next: "options_redirect"
                },

                // Domains restriction
                {
                    token: "keyword",
                    regex: /domain=/,
                    next: "options_domain"
                },

                // CSP injection
                {
                    token: "keyword",
                    regex: /csp=/,
                    next: "options_csp"
                },

                // Plain CSP option, for whitelist only
                {
                    token: "keyword",
                    regex: /csp/
                },

                // Invalid (default)
                {
                    defaultToken: "invalid"
                }
            ],

            /*****************************************************************/

            options_redirect: [
                // Trailing comma
                {
                    token: "invalid",
                    regex: /,$/,
                    next: "start"
                },

                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Options separator
                {
                    token: "keyword.operator",
                    regex: /,/,
                    next: "options"
                },

                // Keywork "none"
                {
                    token: "keyword",
                    regex: safeCompileRegExp(
                        "(?<==)none(?=,|$)",
                        /none(?=,|$)/
                    )
                },

                // Redirect resource name (default)
                {
                    defaultToken: "variable"
                }
            ],

            /*****************************************************************/

            options_domain: [
                // Trailing comma
                {
                    token: "invalid",
                    regex: /,$/,
                    next: "start"
                },

                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Options separator
                {
                    token: "keyword.operator",
                    regex: /,/,
                    next: "options"
                },

                // Domains (default)
                {
                    defaultToken: "string"
                }
            ],

            /*****************************************************************/

            options_csp: [
                // Trailing comma
                {
                    token: "invalid",
                    regex: /,$/,
                    next: "start"
                },

                // Exit
                {
                    token: "text",
                    regex: /$/,
                    next: "start"
                },

                // Options separator
                {
                    token: "keyword.operator",
                    regex: /,/,
                    next: "options"
                },

                // CSP text (default)
                {
                    defaultToken: "constant"
                }
            ]

            /*****************************************************************/

        };
    };
    oop.inherits(exports.HighlightRules, TextHighlightRules);
});

/*****************************************************************************/

nano.Editor = function (elem, highlight, readonly) {
    this.editor = ace.edit(elem);
    this.session = this.editor.session;
    this.is_win = navigator.userAgent.includes("Windows");

    if (highlight)
        this.session.setMode("ace/mode/nano_filters");
    else
        this.session.setMode("ace/mode/text");

    this.editor.setPrintMarginColumn(120);
    this.editor.setReadOnly(readonly);

    const useless_commands = [
        "blockindent",
        "blockoutdent",
        "indent",
        "outdent"
    ];
    for (const cmd of useless_commands)
        this.editor.commands.removeCommand(cmd);

    if (this.is_win)
        this.session.setNewLineMode("windows");
    else
        this.session.setNewLineMode("unix");

    this.editor.$blockScrolling = Infinity;

    this.on_resize = () => {
        const child_elem = document.getElementById(elem);

        const parent_rect = document.documentElement.getBoundingClientRect();
        const child_rect = child_elem.getBoundingClientRect();

        let avail_height = Math.floor(parent_rect.bottom - child_rect.top);
        if (avail_height < 1)
            avail_height = 1;

        child_elem.style.height = avail_height.toString() + "px";
        this.editor.resize();
    };
    addEventListener("resize", this.on_resize);
    this.on_resize();
};

nano.Editor.prototype.destroy = function () {
    removeEventListener("resize", this.on_resize);
};

/*****************************************************************************/

nano.Editor.prototype.set_line_wrap = function (wrap) {
    this.session.setUseWrapMode(wrap);
};

nano.Editor.prototype.set_value_focus = function (val, cursor, keep_anno) {
    if (cursor !== -1)
        cursor = 1;

    this.editor.setValue(val, cursor);
    this.editor.renderer.scrollCursorIntoView();
    this.editor.focus();

    if (!keep_anno)
        this.session.clearAnnotations();

    this.on_resize();
};

nano.Editor.prototype.set_anno = function (anno) {
    this.session.setAnnotations(anno);
};

/*****************************************************************************/

nano.Editor.prototype.get_platform_line_break = function () {
    if (this.is_win)
        return "\r\n";
    else
        return "\n";
};

nano.Editor.prototype.get_platform_value = function () {
    return this.editor.getValue();
};

nano.Editor.prototype.get_unix_value = function () {
    if (this.is_win)
        this.session.setNewLineMode("unix");

    const data = this.editor.getValue();

    if (this.is_win)
        this.session.setNewLineMode("windows");

    return data;
};

/*****************************************************************************/

nano.Editor.prototype.on = function (ev, callback) {
    this.session.on(ev, callback);
};

nano.Editor.prototype.on_key = function (name, key, callback) {
    if (typeof key === "string") {
        key = {
            win: key
        };
    }

    this.editor.commands.addCommand({
        name: name,
        bindKey: key,
        exec: callback
    });
};

/*****************************************************************************/
