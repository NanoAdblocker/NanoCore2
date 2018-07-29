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

    Entry point of Nano Core 2 Terminal.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const assert = require("assert");
const build = require("./build.js");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");

/*****************************************************************************/

/**
 * Terminal instance.
 * @const {Term}
 */
const term = new (require("./term.js"))();

/**
 * System busy flag.
 * @var {boolean}
 */
let busy = true;

/**
 * Execute a command and validate exit code.
 * @async @function
 * @param {integer} expected - The expected exit code.
 * @param {Any} ...args - Arguments for term.exec().
 * @throws When exit code does not match expectation.
 */
const exec = async (expected, ...args) => {
    assert(typeof expected === "number");

    const exit_code = await term.exec(...args);
    if (exit_code !== expected)
        throw new Error("Exit code not " + expected.toString() + ".");
};

/*****************************************************************************/

/**
 * Configuration object.
 * @object
 *     {Array.<string>} Patches - Patches, in order.
 *     {string} Source - Original directory.
 *     {string} Target - Development directory.
 *     {string} Output - Patch output.
 */
const config = {};

/**
 * Load or reload configuration file.
 * @async @function
 * @throws When configuration file could not be opened or is invalid.
 */
const config_load = async () => {
    const data = eval(await fs.readFile("./config.nano.js", "utf8"));

    config.Patches = data.Patches.map((p) => path.resolve(p));
    if (os.platform() === "win32") {
        config.Source = data.Source.Win;
        config.Target = data.Target.Win;
        config.Output = data.Output.Win;
    } else {
        config.Source = data.Source.Linux;
        config.Target = data.Target.Linux;
        config.Output = data.Output.Linux;
    }

    const validate_path = (p) => {
        assert(typeof p === "string");
        assert(path.isAbsolute(p));

        const slashes = p.match(/\//g);
        assert(slashes !== null && slashes.length >= 2);
    };
    assert(Array.isArray(config.Patches));
    validate_path(config.Source);
    validate_path(config.Target);
    validate_path(config.Output);

    build.src_repo = config.Target;
};

/*****************************************************************************/

/**
 * Command handlers registry.
 * @var {Map}
 */
const cmd_handlers = new Map();

term.set_listener((cmd) => {
    assert(typeof cmd === "string");

    if (busy)
        term.write_line("ERROR: System busy.");
    else if (cmd_handlers.has(cmd))
        (cmd_handlers.get(cmd))();
    else
        term.write_line("ERROR: Unknown command.").ready();
});

/*****************************************************************************/

cmd_handlers.set("reset", async () => {
    busy = true;

    try {
        await fs.remove(config.Target);
        await fs.copy(config.Source, config.Target);
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("apply", async () => {
    if (config.Patches.length === 0)
        return term.ready();

    busy = true;

    const opt = {
        cwd: config.Target,
    };

    try {
        for (const p of config.Patches)
            await exec(0, "git", opt, "apply", p);

        await exec(0, "git", opt, "add", "-A");
        await exec(0, "git", opt, "commit", "-m", "Apply patch");
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("mark", async () => {
    busy = true;

    const stream = fs.createWriteStream(config.Output, { encoding: "utf8" });
    stream.on("error", (err) => {
        term.write_line(err.stack);
    });

    try {
        await exec(0, "git", {
            cwd: config.Target,
            on_data: (data) => {
                stream.write(data);
            },
        }, "diff");
        await new Promise((resolve, reject) => {
            stream.end(resolve);
        });
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

/*****************************************************************************/

/**
 * Supported browsers.
 * @const {Array.<string>}
 */
const browsers = ["chromium", "edge"];

/**
 * Build the package.
 * @async @function
 * @throws When things go wrong.
 */
const make = async () => {
    for (const b of browsers) {
        await build.build_core(b);
        await build.build_filters(b);
        await build.build_resources(b);
        await build.build_locale(b);
    }
};

/**
 * Test build output.
 * @async @function
 * @throws When things go wrong.
 */
const test = async () => {
    for (const b of browsers)
        await build.test(b);
};

/**
 * Create ZIP packages.
 * @async @function
 * @throws When things go wrong.
 */
const pack = async () => {
    for (const b of browsers)
        await build.pack(b);
};

/**
 * Publish to extension store.
 * @async @function
 * @throws When things go wrong.
 */
const publish = async () => {
    for (const b of browsers)
        await build.publish(b, term);
};

/*****************************************************************************/

cmd_handlers.set("make", async () => {
    busy = true;

    try {
        await make();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("pack", async () => {
    busy = true;

    try {
        await make();
        await test();
        await pack();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("publish", async () => {
    busy = true;

    try {
        await make();
        await test();
        await pack();
        await publish();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("clean", async () => {
    busy = true;

    try {
        await fs.remove("./build/");
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

/*****************************************************************************/

cmd_handlers.set("config", () => {
    term.write_line(JSON.stringify(config, null, 2));
    term.ready();
});

cmd_handlers.set("reload", async () => {
    busy = true;

    // TODO: Restore last configuration data on error?
    await config_load();

    busy = false;
    term.ready();
});

cmd_handlers.set("exit", () => {
    busy = true;
    term.destructor();
});

/*****************************************************************************/

process.on("unhandledRejection", (err) => {
    throw err;
});

(async () => {
    await config_load();

    busy = false;
    term.write_line("Nano Core 2 Terminal").ready();
})();

/*****************************************************************************/
