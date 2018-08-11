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

    Manage the Crowdin project.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const https = require("https");
const url = require("url");
const yauzl = require("yauzl");

/*****************************************************************************/

/**
 * Read stream into a buffer.
 * @function
 * @param {ReadableStream} stream - Stream to read.
 * @param {Function} on_done - Done event handler.
 *     @param {string} text - Data read from the stream.
 * @param {Function} on_error - Error event handler.
 *     @param {Error} err - Error object.
 */
const stream_to_buffer = (stream, on_done, on_error) => {
    const data = [];

    stream.on("data", (chunk) => {
        data.push(chunk);
    });

    stream.on("end", () => {
        on_done(Buffer.concat(data));
    });
    stream.on("error", on_error);
};

/**
 * Download a file.
 * @async @function
 * @param {string} link - URL to the file to download. Must be using HTTPS
 * protocol.
 * @returns {Buffer} File content.
 * @throws When things go wrong.
 */
const download = (link) => {
    return new Promise((resolve, reject) => {
        const opt = url.parse(link);
        const req = https.request(opt, (res) => {
            stream_to_buffer(res, resolve, reject);
        });
        req.on("error", reject);
        req.end();
    });
};

/*****************************************************************************/

/**
 * Supported locales with their normalized keys.
 * @const {Map}
 */
const locales = new Map([
    ["es-ES", "es"],
    ["nb", "nb"],
    ["pl", "pl"],
    ["zh-CN", "zh-CN"],
]);

/*****************************************************************************/

/**
 * Download, validate, unpack, and synchronize supported non-English locales
 * with the Crowdin project.
 * @async @function
 * @throws When things go wrong.
 */
exports.sync = async () => {
    const file = download(
        "https://crowdin.com/backend/download/project/nano-adblocker.zip",
    );

    await new Promise((resolve, reject) => {
        const done = new Set();

        yauzl.fromBuffer(file, (err, zip) => {
            if (err) {
                reject(err);
                return;
            }

            zip.on("entry", (entry) => {
                console.log(entry.fileName);
                zip.readEntry();
            });
            zip.on("end", () => {
                if (locales.size !== done.size)
                    reject(new Error("Some locale files are missing."));
                else
                    resolve();
            });
            zip.on("error", reject);

            zip.readEntry();
        });
    });
};

/*****************************************************************************/
