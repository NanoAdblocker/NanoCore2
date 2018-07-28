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

    Publish extension to Web Store.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * The credentials.
 * @object
 *     {string} WebStoreClient - Google API application client.
 *     {string} WebStoreSecret - Google API application secret.
 *     {string} WebStoreAccount - Google developer account refresh token.
 */
const credentials = require("../../Prototype/NanoBuild/credentials.js");

/**
 * Load modules.
 * @const {Module}
 */
const assert = require("assert");
const fs = require("./promise-fs.js");
const https = require("https");
const url = require("url");

/**
 * Serialize an object.
 * @function
 * @param {Object} obj - The object to serialize.
 * @return {string} The serialized string.
 */
const serialize = (obj) => {
    let str = "";

    for (let key in obj) {
        if (str !== "") {
            str += "&";
        }
        assert(typeof obj[key] === "string");
        str += key + "=" + encodeURIComponent(obj[key]);
    }

    return str;
};

/**
 * Read a stream into text.
 * @function
 * @param {ReadableStream} stream - The stream to read.
 * @param {Function} onDone - The done handler, text read will be passed in.
 * @param {Function} onError - The error handler, error object will be passed in.
 */
const streamToText = (stream, onDone, onError) => {
    let data = "";
    stream.setEncoding("utf8");
    stream.on("data", (c) => {
        data += c;
    });
    stream.on("end", () => {
        onDone(data);
    });
    stream.on("error", onError);
};

/**
 * Publish an extension package.
 * @async @function
 * @param {string} file - The path to the package file to upload.
 * @param {string} extId - The ID of the extension.
 */
exports.publish = async (file, extId) => {
    assert(credentials && typeof credentials === "object");
    assert(typeof credentials.WebStoreClient === "string");
    assert(typeof credentials.WebStoreSecret === "string");
    assert(typeof credentials.WebStoreAccount === "string");

    assert(file.endsWith(".zip"));
    const fileStat = await fs.lstat(file);
    assert(!fileStat.isSymbolicLink() && fileStat.isFile());

    const token = await new Promise((resolve, reject) => {
        const payload = serialize({
            client_id: credentials.WebStoreClient,
            client_secret: credentials.WebStoreSecret,
            refresh_token: credentials.WebStoreAccount,
            grant_type: "refresh_token",
        });

        let options = url.parse("https://accounts.google.com/o/oauth2/token");
        options.method = "POST";
        options.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(payload),
        }

        let req = https.request(options, (res) => {
            streamToText(res, (data) => {
                data = JSON.parse(data);
                assert(typeof data.access_token === "string");
                resolve(data.access_token);
            }, reject);
        });
        req.on("error", reject);
        req.end(payload);
    });

    await new Promise((resolve, reject) => {
        const payload = fs.createReadStream(file);

        let options = url.parse("https://www.googleapis.com/upload/chromewebstore/v1.1/items/" + extId);
        options.method = "PUT";
        options.headers = {
            "Authorization": "Bearer " + token,
            "X-Goog-API-Version": "2",
        };

        let req = https.request(options, (res) => {
            streamToText(res, (data) => {
                data = JSON.parse(data);
                console.log("Item uploaded, server response:", data);
                assert(data.uploadState === "SUCCESS");
                resolve();
            }, reject);
        });
        req.on("error", reject);
        payload.pipe(req);
    });

    await new Promise((resolve, reject) => {
        let options = url.parse("https://www.googleapis.com/chromewebstore/v1.1/items/" + extId + "/publish");
        options.method = "POST";
        options.headers = {
            "Authorization": "Bearer " + token,
            "X-Goog-API-Version": "2",
            "Content-Length": "0",
        };

        let req = https.request(options, (res) => {
            streamToText(res, (data) => {
                data = JSON.parse(data);
                console.log("Publish requested, server response:", data);
                assert(data.status.includes("OK") || data.status.includes("ITEM_PENDING_REVIEW"));
                resolve();
            }, reject);
        });
        req.on("error", reject);
        req.end();
    });
};
