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

    Crowdin project helper.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const fs = require("fs-extra");
const https = require("https");
const path = require("path");
const url = require("url");
const yauzl = require("yauzl");

/*****************************************************************************/

/**
 * Read stream into a buffer.
 * @function
 * @param {ReadableStream} stream - Stream to read.
 * @param {Function} on_done - Done event handler.
 *     @param {Buffer} data - Data read from the stream.
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
 * @function
 * @param {string} link - URL to the file to download. Must be using the HTTPS
 * protocol.
 * @param {Function} on_done - Done event handler.
 *     @param {Buffer} file - File content.
 * @param {Function} on_error - Error event handler.
 *     @param {Error} err - Error object.
 * @param {boolean} [no_redir=false] - Whether redirection is forbidden. If
 * false, redirect will be followed for at most once.
 */
const download = (link, on_done, on_error, no_redir = false) => {
    const opt = url.parse(link);

    const req = https.request(opt, (res) => {
        if (
            res.statusCode === 301 ||
            res.statusCode === 302 ||
            res.statusCode === 307 ||
            res.statusCode === 308
        ) {
            const new_link = res.headers["location"];

            if (no_redir) {
                on_error(new Error("Too many redirects."));
            } else if (
                typeof new_link !== "string" ||
                !new_link.startsWith("https://")
            ) {
                on_error(new Error("Bad server response."));
            } else {
                download(new_link, on_done, on_error, true);
            }

            return void res.resume();
        }

        if (res.statusCode !== 200) {
            on_error(new Error("Connection error."));

            return void res.resume();
        }

        stream_to_buffer(res, on_done, on_error);
    });

    req.on("error", on_error);
    req.end();
};

/**
 * Validate a JSON stream and write to a file.
 * @function
 * @param {string} file - Path to output file.
 * @param {ReadableStream} stream - Data stream.
 * @param {Function} on_done - Done event handler.
 * @param {Function} on_error - Error event handler.
 *     @param {Error} err - Error object.
 */
const validated_write = (file, stream, on_done, on_error) => {
    let data = "";

    stream.setEncoding("utf8");
    stream.on("data", (c) => {
        data += c;
    });

    stream.on("end", () => {
        try {
            data = JSON.parse(data);
        } catch (err) {
            return void on_error(err);
        }

        fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
            if (err)
                on_error(err);
            else
                on_done();
        });
    });
    stream.on("error", on_error);
};

/*****************************************************************************/

/**
 * Supported locales with their normalized keys.
 * @const {Map}
 */
const locales = new Map([
    ["es-ES", "es"],
    ["de", "de"],
    ["it", "it"],
    ["nb", "nb"],
    ["pl", "pl"],
    ["ru", "ru"],
    ["zh-CN", "zh_CN"],
]);

/*****************************************************************************/

/**
 * Download, safely unpack, validate, then build supported non-English locales
 * from the latest build of the Crowdin project.
 * Note that you still have to manually build the project on Crowdin when
 * there are changes.
 * @async @function
 * @throws When things go wrong.
 */
exports.sync = async () => {
    const file = await new Promise((resolve, reject) => {
        download(
            "https://crowdin.com/backend/download/project/nano-adblocker.zip",
            resolve, reject,
        );
    });

    await new Promise((resolve, reject) => {
        const done = new Set();

        yauzl.fromBuffer(file, { lazyEntries: true }, (err, zip) => {
            if (err)
                return void reject(err);

            const next = () => {
                zip.readEntry();
            };

            zip.on("entry", (entry) => {
                const name = entry.fileName;
                if (name.endsWith("/"))
                    return void next();

                const [key, messages, ...rest] = name.split("/");
                if (messages !== "messages.json" || rest.length !== 0)
                    return void reject(new Error("Unexpected file."));
                if (!locales.has(key)) {
                    return void reject(
                        new Error("Locale " + key + " is not recognized."),
                    );
                }

                const norm_key = locales.get(key);
                done.add(key);

                const outdir = path.resolve("./src/_locales", norm_key);
                fs.mkdirp(outdir, (err) => {
                    if (err)
                        return void reject(err);

                    zip.openReadStream(entry, (err, stream) => {
                        if (err)
                            return void reject(err);

                        validated_write(
                            path.resolve(outdir, "messages.json"),
                            stream, next, reject,
                        );
                    });
                });
            });

            zip.on("end", () => {
                if (locales.size !== done.size)
                    reject(new Error("Some locale files are missing."));
                else
                    resolve();
            });
            zip.on("error", reject);

            next();
        });
    });
};

/*****************************************************************************/
