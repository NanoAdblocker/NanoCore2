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

    Syntax validator.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const assert = require("assert");
const esprima = require("esprima");
const fs = require("fs-extra");
const path = require("path");

/*****************************************************************************/

/**
 * Validate syntax of a JavaScript file.
 * @async @function
 * @param {string} file - Path to the file to check.
 */
const validate_js = async (file) => {
    esprima.parse(await fs.readFile(file, "utf8"));
};

/**
 * Validate syntax of a JSON file.
 * @async @function
 * @param {string} file - Path to the file to check.
 */
const validate_json = async (file) => {
    JSON.parse(await fs.readFile(file, "utf8"));
};

/**
 * Validate content of a HTML file.
 * This is used to make sure the developer did not forget to apply patches.
 * @async @function
 * @param {string} file - Path to the file to check.
 */
const validate_html = async (file) => {
    const name = path.parse(file).name;

    let expected;
    switch (name) {
        case "1p-filters":
            expected = "ace/ace-1.2.9.js";
            break;

        case "asset-viewer":
            expected = "nano-editor.js";
            break;

        case "background":
            expected = "nano-background.js";
            break;

        default:
            return;
    }

    const data = await fs.readFile(file, "utf8");
    assert(data.includes(expected));
};

/*****************************************************************************/

/**
 * Check syntax recursively for one directory.
 * @async @function
 * @param {string} directory - The path to the directory to check.
 */
exports.validate_dir = async (dir) => {
    const files = await fs.readdir(dir);
    const tasks = await Promise.all(
        files.map((f) => fs.lstat(path.resolve(dir, f)))
    );

    for (let i = 0; i < files.length; i++) {
        assert(!tasks[i].isSymbolicLink());

        if (tasks[i].isDirectory()) {
            await exports.validate_dir(path.resolve(dir, files[i]));
            continue;
        }

        assert(tasks[i].isFile());
        if (files[i].endsWith(".js"))
            await validate_js(path.resolve(dir, files[i]))
        else if (files[i].endsWith(".json"))
            await validate_json(path.resolve(dir, files[i]))
        else if (files[i].endsWith(".html"))
            await validate_html(path.resolve(dir, files[i]))
    }
};

/*****************************************************************************/
