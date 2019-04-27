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

    Build data.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const assert = require("assert");

/*****************************************************************************/

/**
 * Version number.
 * @const {string}
 */
exports.version = "1.0.0.105";

/**
 * The based on string.
 * @const {string}
 */
exports.based_on = [
    "uBlock Origin",

    "Version/1.18.16",
    "Commit/7bf83fa",

    "UserCSS/disabled",
].join(" ");

/**
 * Chromium extension identification string.
 * @const {string}
 */
exports.chromium_id = "gabbbocakeomblphkmmnoamkioajlkfo";

/*****************************************************************************/

/**
 * Generate manifest.
 * @function
 * @param {Enum} browser - One of "chromium", "edge".
 * @return {string} Generated manifest file.
 */
exports.manifest = (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const manifest = {
        "author": "Nano Core 2 contributors",
        "background": {
            "page": "background.html",
        },
        "browser_action": {
            "default_icon": {
                "128": "img/128_on.png",
            },
            "default_popup": "popup.html",
            "default_title": "Nano Adblocker",
        },
        "commands": {
            "launch-element-picker": {
                "description": "__MSG_popupTipPicker__",
            },
            "launch-element-zapper": {
                "description": "__MSG_popupTipZapper__",
            },
            "launch-logger": {
                "description": "__MSG_popupTipLog__",
            },
        },
        "content_scripts": [
            {
                "all_frames": true,
                "js": [
                    "js/vapi.js",
                    "js/vapi-client.js",
                    "js/vapi-usercss.js",
                    "js/vapi-usercss.real.js",
                    "js/vapi-usercss.pseudo.js",
                    "js/contentscript.js",
                ],
                "matches": [
                    "http://*/*",
                    "https://*/*",
                ],
                "run_at": "document_start",
            },
            {
                "all_frames": false,
                "js": [
                    "js/scriptlets/subscriber.js"
                ],
                "matches": [
                    "http://*/*",
                    "https://*/*",
                ],
                "run_at": "document_idle",
            },
        ],
        "default_locale": "en",
        "description": "An adblocker",
        "icons": {
            "128": "img/128_on.png",
        },
        "incognito": "split",
        "manifest_version": 2,
        "minimum_chrome_version": "51.0",
        "name": "Nano Adblocker",
        "options_ui": {
            "page": "dashboard.html",
            "open_in_tab": true,
        },
        "permissions": [
            "<all_urls>",
            "contextMenus",
            "privacy",
            "storage",
            "tabs",
            "unlimitedStorage",
            "webNavigation",
            "webRequest",
            "webRequestBlocking",
        ],
        "storage": {
            "managed_schema": "managed_storage.json",
        },
        "version": exports.version,
        "web_accessible_resources": [
            "web_accessible_resources/*",
        ],
    };

    if (browser === "edge") {
        // Edge does not care if the size is actually right but does care if
        // the key name is right
        manifest["-ms-preload"] = {
            "backgroundScript": "js/edgyfy.js",
            "contentScript": "js/edgyfy.js",
        };
        manifest.background.persistent = true;
        manifest.browser_action.default_icon = {
            "38": "img/128_on.png",
        };
        manifest.browser_specific_settings = {
            "edge": {
                "browser_action_next_to_addressbar": true,
            },
        };
        manifest.icons = {
            "128": "img/128_on.png",
            "16": "img/128_on.png",
        };
        // TODO: Remove when Edge properly support split mode
        manifest.incognito = "spanning";
        delete manifest.minimum_chrome_version;
        manifest.minimum_edge_version = "41.16299.248.0";
        manifest.options_page = "dashboard.html";
        delete manifest.options_ui;
        {
            const i = manifest.version.indexOf(".");
            manifest.version = manifest.version.substring(i + 1) + ".0";
        }
    }

    return JSON.stringify(manifest, null, 2);
};

/*****************************************************************************/
