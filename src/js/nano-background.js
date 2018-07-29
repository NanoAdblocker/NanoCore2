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

    Background script.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nano = {};

/*****************************************************************************/

nano.ub = window["\xB5Block"];

/*****************************************************************************/

nano.inject_force_scroll = (tab) => {
    const payload = {
        code: "* { overflow: auto !important; }",
        runAt: "document_start"
    };

    if (vAPI.supportsUserStylesheets)
        payload.cssOrigin = "user";

    vAPI.insertCSS(tab, payload);
};

nano.recompile_filters = () => {
    const on_done = () => {
        vAPI.app.restart();
    };

    vAPI.storage.set({
        compiledMagic: -1,
        selfieMagic: -1
    }, on_done);
};

/*****************************************************************************/

nano.enable_integration_filter = () => {
    if (nano.ub.selectedFilterLists.includes("nano-defender"))
        return true;

    if (nano.ub.loadingFilterLists)
        return false;
    if (nano.ub.selectedFilterLists.length < 10)
        return false;

    nano.ub.saveSelectedFilterLists(["nano-defender"], true);
    nano.ub.loadFilterLists();
    return true;
};

/*****************************************************************************/

nano.is_trusted_ext = (id) => {
    return (
        sender.id === nano_defender_ext_id_chrome ||
        sender.id === nano_defender_ext_id_edge
    );
};

nano.handle_public_api = (msg) => {
    if (typeof msg.data !== "string")
        return false;

    switch (msg.data) {
        case "Nano Defender Enabled":
            return nano.enable_integration_filter();

        default:
            return false;
    }
};

nAPI.add_public_api_handler(nano.is_trusted_ext, nano.handle_public_api);

/*****************************************************************************/

nano.FilterLinter = function () {
    this.cache_key = "nano/cache/user-filters-linting-result";
    this.reset();
};

/*****************************************************************************/

nano.FilterLinter.prototype.reset = function () {
    // IMPORTANT! Any change in this function must be reflected in cache_result
    // and restore_result

    // This flag will be set to true when a full user filters recompilation is
    // initiated
    this.changed = false;

    this.warnings = [];
    this.errors = [];

    // The first line is 0, when resetting, line number must be -1 so the first
    // line will have number 0
    this.line = -1;
};

/*****************************************************************************/

nano.FilterLinter.prototype.cache_result = function () {
    const payload = {
        warnings: this.warnings,
        errors: this.errors,

        line: this.line
    };

    const entry = {};
    entry[this.cache_key] = JSON.stringify(payload);

    vAPI.cacheStorage.set(entry);
};

nano.FilterLinter.prototype.restore_result = function () {
    vAPI.cacheStorage.get(this.cache_key, (result) => {
        if (this.changed)
            return;

        const payload = result[that.cache_key];
        if (!payload)
            return;

        let result;
        try {
            result = JSON.parse(payload);
        } catch (err) {
            return;
        }

        if (result instanceof Object === false)
            return;

        if (Array.isArray(result.warnings))
            this.warnings = result.warnings;
        if (Array.isArray(result.errors))
            this.errors = result.errors;
        if (typeof result.line === "number")
            this.line = result.line;
    });
};

nano.FilterLinter.prototype.clear_result = function () {
    this.reset();
    vAPI.cacheStorage.remove(this.cache_key);
};

/*****************************************************************************/

// Maximum 100 errors and 100 warnings

nano.FilterLinter.prototype.error = function (message) {
    if (this.errors.length > 100) {
        return;
    } else if (this.errors.length === 100) {
        this.errors.push({
            row: this.line,
            type: "error",
            text: vAPI.i18n("nano_l_filter_aborted_e")
        });
        return;
    }

    this.errors.push({
        row: this.line,
        type: "error",
        text: message
    });
};

nano.FilterLinter.prototype.warn = function (message) {
    if (this.warnings.length > 100) {
        return;
    } else if (this.warnings.length === 100) {
        this.warnings.push({
            row: this.line,
            type: "warning",
            text: vAPI.i18n("nano_l_filter_aborted_w")
        });
        return;
    }

    this.warnings.push({
        row: this.line,
        type: "warning",
        text: message
    });
};

/*****************************************************************************/

nano.fl = new nano.FilterLinter();
nano.fl.restore_result();

/*****************************************************************************/

nano.WhitelistLinter = function () {
    this.re_suspecious_re = /^\/[0-9a-zA-Z-_.]+\/$/;
    this.reset();
};

/*****************************************************************************/

nano.WhitelistLinter.prototype.reset = function () {
    this.warnings = [];
};

/*****************************************************************************/

// Maximum 100 warnings

nano.WhitelistLinter.prototype.lint = function (line, num) {
    if (this.warnings.length > 100) {
        return;
    } else if (this.warnings.length === 100) {
        this.warnings.push({
            row: num,
            type: "warning",
            text: vAPI.i18n("nano_l_whitelist_aborted_w")
        });
        return;
    }

    if (this.re_suspecious_re.test(line)) {
        this.warnings.push({
            row: num,
            type: "warning",
            text: vAPI.i18n("nano_l_whitelist_suspecious_re")
        });
    }
};

/*****************************************************************************/

nano.wl = new nano.WhitelistLinter();

/*****************************************************************************/
