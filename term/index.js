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
 * Main modules.
 * @const {Module}
 */
const assert = require("assert");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");

/*****************************************************************************/

/**
 * The terminal engine instance.
 * @const {engine.Term}
 */
const term = new (require("./term.js"))();

/**
 * System busy flag.
 * @var {boolean}
 */
let busy = true;

/**
 * Execute a command with expected exit code.
 * @async @function
 * @param {integer} expected - The expected exit code.
 * @param {any} ...args - Arguments for term.exec().
 * @throws When exit code does not match expectation.
 */
const exec = async (expected, ...args) => {
    const exit_code = await term.exec(...args);
    if (exit_code !== expected)
        throw new Error("ERROR: Exit code not 0.");
};

/*****************************************************************************/

/**
 * The configuration object.
 * @object
 *     {Array.<string>} Patches - The patches, in order.
 *     {string} Source - The original directory.
 *     {string} Target - The development directory.
 *     {string} Output - The patches output.
 */
const config = {};

/**
 * Load the configuration.
 * @async @function
 * @throws When configuration file could not be opened or is invalid.
 */
const config_load = async () => {
    const data = JSON.parse(await fs.readFile("./config.json", "utf8"));

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
};

/*****************************************************************************/

/**
 * The command handlers registry.
 * @var {Map}
 */
const cmd_handlers = new Map();

term.set_listener((cmd) => {
    if (busy)
        term.write_line("ERROR: System busy.").ready();
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
        await fs.copy(config.Source, config.Target, {
            overwrite: false,
            errorOnExist: true,
        });
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("apply", async () => {
    busy = true;

    try {
        for (const p of config.Patches)
            await exec(0, "git", { cwd: config.Target }, "apply", p);

        await exec(0, "git", { cwd: config.Target }, "add", "-A");
        await exec(0, "git", { cwd: config.Target }, "commit", "-m", "Apply");
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
    } catch (err) {
        term.write_line(err.stack);
    }

    stream.end();

    busy = false;
    term.ready();
});

/*****************************************************************************/

cmd_handlers.set("make", async () => {
    busy = true;

    try {
        // TODO
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("publish", async () => {
    busy = true;

    try {
        // TODO
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
