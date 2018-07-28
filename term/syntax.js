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
 * The modules.
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
 * @param {string} file - The path to the file to check.
 */
const validateJS = async (file) => {
    esprima.parse(await fs.readFile(file, "utf8"));
};

/**
 * Validate syntax of a JSON file.
 * @async @function
 * @param {string} file - The path to the file to check.
 */
const validateJSON = async (file) => {
    JSON.parse(await fs.readFile(file, "utf8"));
};

/*****************************************************************************/

/**
 * Check syntax recursively for one directory.
 * @async @function
 * @param {string} directory - The path to the directory to check.
 */
exports.validateDirectory = async (directory) => {
    const files = await fs.readdir(directory);
    const tasks = await Promise.all(
        files.map((f) => fs.lstat(path.resolve(directory, f)))
    );

    let validateTasks = [];
    for (let i = 0; i < files.length; i++) {
        assert(!tasks[i].isSymbolicLink());

        if (tasks[i].isDirectory()) {
            // One directory at a time to make sure things will not get
            // overloaded
            await exports.validateDirectory(path.resolve(directory, files[i]));
            continue;
        }

        assert(tasks[i].isFile());
        if (files[i].endsWith(".js")) {
            validateTasks.push(
                validateJS(path.resolve(directory, files[i]))
            );
        } else if (files[i].endsWith(".json")) {
            validateTasks.push(
                validateJSON(path.resolve(directory, files[i]))
            );
        }
    }
    await Promise.all(validateTasks);
};

/*****************************************************************************/
