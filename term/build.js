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

    Build script.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Required modules.
 * @const {Module}
 */
const archiver = require("archiver");
const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs-extra");
const path = require("path");
const syntax = require("./syntax.js");

/**
 * Optional modules.
 * @const {Module}
 */
let edge = null;
let store = null;

/**
 * Build data.
 * @const {Module}
 */
const data = require("./data.js");

/*****************************************************************************/

/**
 * Find MD5 hash of a string.
 * @function
 * @param {string} data - Data to hash.
 */
const md5 = (data) => {
    assert(typeof data === "string");

    return crypto.createHash("md5").update(data, "utf8").digest("hex");
};

/**
 * Create ZIP archive.
 * @async @function
 * @param {string} in_dir - Directory to ZIP.
 * @param {string} out_file - Path to the file to write to.
 */
const zip = (in_dir, out_file) => {
    assert(typeof in_dir === "string" && typeof out_file === "string");

    return new Promise((resolve, reject) => {
        const input = archiver.create("zip", {});
        const output = fs.createWriteStream(out_file);

        input.on("end", resolve).on("warning", reject).on("error", reject);
        output.on("error", reject);

        input.pipe(output);
        input.directory(in_dir, false).finalize();
    });
};

/**
 * Resolve path.
 * @function
 * @param {Any} ...args - Arguments for path.resolve().
 */
const r = (...args) => {
    return path.resolve(...args);
};

/**
 * Create a one level file ending filter.
 * @function
 * @param {string} root - Path to root level.
 * @param {string} ext - File ending to filter.
 * @param {boolean} [match=true] - Whether the filter is a match filter.
 */
const f = (root, ext, match = true) => {
    root = r(root);

    if (match) {
        return {
            filter: async (f) => {
                const stat = await fs.lstat(f);

                assert(!stat.isSymbolicLink());

                if (stat.isDirectory())
                    return root === r(f);
                else if (stat.isFile())
                    return f.endsWith(ext);
                else
                    assert(false);
            },
        };
    } else {
        return {
            filter: async (f) => {
                const stat = await fs.lstat(f);

                assert(!stat.isSymbolicLink());

                if (stat.isDirectory())
                    return root === r(f);
                else if (stat.isFile())
                    return !f.endsWith(ext);
                else
                    assert(false);
            },
        };
    }
};

/*****************************************************************************/

/**
 * Configuration.
 * The source repository must be explicitly set before calling any of the
 * functions.
 * @const {string}
 */
exports.src_repo = null;
exports.assets_repo = "../NanoFilters";
exports.edge_shim = "../Edgyfy/edgyfy.js";

/*****************************************************************************/

/**
 * Build Nano Core 2.
 * @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.build_core = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const output = r("./build", browser);
    await fs.mkdirp(output);

    const src = exports.src_repo;
    assert(typeof src === "string");

    await fs.copy(r(src, "src/css"), r(output, "css"));
    await fs.copy(r(src, "src/js"), r(output, "js"));
    await fs.copy(r(src, "src/lib"), r(output, "lib"));
    await fs.copy(r(src, "src"), r(output), f(r(src, "src"), ".html"));

    await fs.copy(
        r(src, "platform/chromium"), r(output, "js"),
        f(r(src, "platform/chromium"), ".js"),
    );
    await fs.copy(
        r(src, "platform/chromium"), r(output),
        f(r(src, "platform/chromium"), ".js", false),
    );

    await fs.copy(r("./src/fonts"), r(output, "css/fonts"));
    await fs.copy(r("./src/js"), r(output, "js"));
    await fs.copy(r("./src/ace"), r(output, "lib/ace"));
    await fs.copy(r("./src/img"), r(output, "img"));
    await fs.copy(r("./src/icons/icon_16.png"), r(output, "img/icon_16.png"));
    await fs.copy(r("./LICENSE"), r(output, "LICENSE"));

    // This must be after copying platform files
    await fs.writeFile(
        r(output, "manifest.json"), data.manifest(browser), "utf8",
    );

    if (browser === "edge") {
        await fs.copy(exports.edge_shim, r(output, "js/edgyfy.js"));
    }
};

/**
 * Build filters.
 * @async @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.build_filters = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const output = r("./build", browser, "assets");
    await fs.mkdirp(output);

    const assets = exports.assets_repo;
    assert(typeof assets === "string");

    await fs.copy(r("./src/assets.json"), r(output, "assets.json"));
    await fs.copy(r(assets, "NanoFilters"), r(output, "NanoFilters"));
    await fs.copy(r(assets, "ThirdParty"), r(output, "ThirdParty"));
};

/**
 * Build web accessible resources.
 * @async @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.build_resources = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const output = r("./build", browser, "web_accessible_resources");
    await fs.mkdirp(output);

    const src = exports.src_repo;
    const assets = exports.assets_repo;
    assert(typeof src === "string" && typeof assets === "string");

    const meta = r(src, "src/web_accessible_resources/to-import.txt");
    const record = r(src, "src/web_accessible_resources/imported.txt");
    const build_record = r(output, "imported.txt");

    const db_parse_one = (data) => {
        const re_non_empty_line = /\S/;
        const re_split_fields = /\s+/;

        data = data.split("\n");

        let fields = null;
        let encoded = null;
        let database = {};
        const register_entry = () => {
            const [name, mime] = fields.splice(0, 2);

            let content;
            if (encoded)
                content = fields.join("");
            else
                content = fields.join("\n");

            database[name] = {
                mime: mime,
                content: content,
            };

            fields = null;
            encoded = null;
        };

        for (let line of data) {
            if (line.startsWith("#"))
                continue;

            if (fields === null) {
                line = line.trim();
                if (!line)
                    continue;

                fields = line.split(re_split_fields);
                assert(fields.length === 2);
                encoded = fields[1].includes(";");

            } else if (re_non_empty_line.test(line)) {
                if (encoded)
                    fields.push(line.trim());
                else
                    fields.push(line);

            } else {
                register_entry();

            }
        }
        if (fields)
            register_entry();

        return database;
    };

    const process_one = async (name, db_entry, record_stream) => {
        const re_extract_mime = /^[^/]+\/([^\s;]+)/;

        record_stream.write(name);
        record_stream.write("\n");

        name = md5(name);

        const suffix = re_extract_mime.exec(db_entry.mime);
        assert(suffix !== null);
        name = "\t" + name + "." + suffix[1];

        record_stream.write(name);
        record_stream.write("\n");

        name = name.trim();

        if (db_entry.mime.endsWith(";base64")) {
            await fs.writeFile(
                r(output, name),
                Buffer.from(db_entry.content, "base64"),
                "binary",
            );
        } else {
            await fs.writeFile(
                r(output, name),
                db_entry.content + "\n",
                "utf8",
            );
        }
    };

    const process_all = async () => {
        const data = (await fs.readFile(meta, "utf8")).split("\n");

        let to_import = [];
        for (let d of data) {
            d = d.trim();
            if (!d || d.startsWith("#"))
                continue;

            to_import.push(d);
        }

        const [ubo, nano] = (await Promise.all([
            fs.readFile(r(assets, "ThirdParty/uBlockResources.txt"), "utf8"),
            fs.readFile(r(assets, "NanoFilters/NanoResources.txt"), "utf8"),
        ])).map(db_parse_one);

        await fs.copy(record, build_record);
        const record_stream = fs.createWriteStream(build_record, {
            flags: "a",
            encoding: "utf8",
        });
        record_stream.on("error", (err) => {
            // TODO: Test to make sure this actually works like this
            throw err;
        });

        for (const file of to_import) {
            if (nano.hasOwnProperty(file))
                await process_one(file, nano[file], record_stream);
            else if (ubo.hasOwnProperty(file))
                await process_one(file, ubo[file], record_stream);
            else
                assert(false);
        }

        await new Promise((resolve) => {
            record_stream.end(resolve);
        });
    };
    await process_all();
};

/**
 * Build locale files.
 * @async @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.build_locale = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const output = r("./build", browser, "_locales");
    await fs.mkdirp(output);

    const src = exports.src_repo;
    assert(typeof src === "string");

    const all_keys = [];
    const en_ubo = JSON.parse(
        await fs.readFile(r(src, "src/_locales/en/messages.json"), "utf8"),
    );
    const en_nano = JSON.parse(
        await fs.readFile(r("./src/_locales/en/messages.json"), "utf8"),
    );
    assert(typeof en_ubo === "object" && en_ubo !== null);
    assert(typeof en_nano === "object" && en_nano !== null);

    for (const key in en_ubo) {
        if (key === "dummy")
            continue;

        if (en_ubo.hasOwnProperty(key)) {
            assert(!all_keys.includes(key));
            assert(
                typeof en_ubo[key] === "object" &&
                en_ubo[key] !== null &&
                typeof en_ubo[key].message === "string",
            );

            all_keys.push(key);
        }
    }
    for (const key in en_nano) {
        if (en_nano.hasOwnProperty(key)) {
            assert(!all_keys.includes(key));
            assert(
                typeof en_nano[key] === "object" &&
                en_nano[key] !== null &&
                typeof en_nano[key].message === "string",
            );

            all_keys.push(key);
        }
    }

    const process_one = async (lang, has_nano) => {
        await fs.mkdirp(r(output, lang));

        const ubo = JSON.parse(await fs.readFile(
            r(src, "src/_locales", lang, "messages.json"), "utf8",
        ));
        let nano;
        if (has_nano) {
            nano = JSON.parse(await fs.readFile(
                r("./src/_locales", lang, "messages.json"), "utf8",
            ));
        } else {
            nano = {};
        }

        const result = {};
        for (const key of all_keys) {
            const ubo_has = ubo.hasOwnProperty(key);
            const nano_has = nano.hasOwnProperty(key);

            assert(!ubo_has || !nano_has);
            if (ubo_has) {
                assert(
                    ubo[key] &&
                    typeof ubo[key] === "object" &&
                    typeof ubo[key].message === "string",
                );

                result[key] = ubo[key];
            } else if (nano_has) {
                assert(
                    nano[key] &&
                    typeof nano[key] === "object" &&
                    typeof nano[key].message === "string",
                );

                result[key] = nano[key];
            } else {
                // Fallback to English
                const ubo_has = en_ubo.hasOwnProperty(key);
                const nano_has = en_nano.hasOwnProperty(key);

                assert(ubo_has !== nano_has);
                if (ubo_has)
                    result[key] = en_ubo[key];
                else
                    result[key] = en_nano[key];
            }

            if (!key.startsWith("nano_")) {
                result[key].message = result[key].message
                    .replace(/uBlock Origin|uBlock\u2080|uBlock(?!\/)|uBO/g, "Nano")
                    .replace(/ublock/g, "nano");
            }

            if (key === "nano_d_about_based_on") {
                const based_on = data.based_on;
                assert(typeof based_on === "string");

                result[key].message = result[key].message
                    .replace("{{@data}}", based_on);
            }
        }

        await fs.writeFile(
            r(output, lang, "messages.json"),
            JSON.stringify(result, null, 2),
            "utf8",
        );
    };

    const [langs_ubo, langs_nano] = await Promise.all([
        fs.readdir(r(src, "src/_locales")),
        fs.readdir(r("./src/_locales")),
    ]);
    let tasks = [];
    for (const lang of langs_ubo) {
        if (langs_nano.includes(lang))
            tasks.push(process_one(lang, true));
        else
            tasks.push(process_one(lang, false));
    }
    await Promise.all(tasks);

    if (browser === "chromium")
        await fs.copy(r(output, "nb"), r(output, "no"));
};

/*****************************************************************************/

/**
 * Test the build result.
 * @async @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.test = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    await syntax.validate_dir(r("./build", browser));
};

/**
 * Create ZIP package.
 * @async @function
 * @param {Enum} browser - One of "chromium", "edge".
 */
exports.pack = async (browser) => {
    assert(browser === "chromium" || browser === "edge");

    const in_dir = r("./build", browser);
    const out_file = in_dir + ".zip";

    await zip(in_dir, out_file);
};

/**
 * Publish package to extension store.
 * @async @function
 * @param {Enum} browser - One of "chromium", "firefox", "edge".
 * @param {Term} term - Terminal for child process.
 */
exports.publish = async (browser, term) => {
    assert(browser === "chromium" || browser === "edge");

    const input = r("./build", browser + ".zip");

    if (browser === "chromium") {
        if (!store)
            store = require("./store.js");

        await store.publish(input, data.chromium_id, term);
    } else if (browser === "edge") {
        if (!edge)
            edge = require("../../Prototype/NanoCore2/edge.js");

        // The packaging module can break the directory structure
        await fs.remove("./build/edge_appx");
        await fs.remove("./build/NanoAdblocker");
        await fs.copy("./build/edge", "./build/edge_appx");

        await edge.pack(
            fs, term,
            r("./src/icons"), r("./build"),
            r("./build/edge_appx"),
        );

        term.write_line("APPX package created. Automatic publishing of Edge " +
            "extensions is not yet implemented.");
    }
};

/*****************************************************************************/
