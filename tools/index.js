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

    Entry point of tools.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * The modules.
 * @const {Module}
 */
const assert = require("assert");
const engine = require("./engine.js");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");

/*****************************************************************************/

/**
 * The terminal engine instance.
 * @const {engine.Term}
 */
const term = new engine.Term();

/**
 * System busy flag.
 * @var {bool}
 */
let busy = false;

/*****************************************************************************/

/**
 * The configuration object.
 * @object
 *     {Array.<string>} Patches - The patches, in order.
 *     {string} Output - The patches output.
 *     {string} Source - The original directory.
 *     {string} Target - The development directory.
 */
const config = {};

{
    const data = JSON.parse(fs.readFileSync("./config.json"));

    config.Patches = data.Patches;
    data.Patches = data.Patches.map((patch) => path.resolve(patch));
    if (os.platform() === "win32") {
        config.Output = data.Output.Win;
        config.Source = data.Source.Win;
        config.Target = data.Target.Win;
    } else {
        config.Output = data.Output.Linux;
        config.Source = data.Source.Linux;
        config.Target = data.Target.Linux;
    }

    const validate_path = (p) => {
        assert(typeof p === "string");
        assert(path.isAbsolute(p));
        const slashes = p.match(/\//g) || [];
        assert(slashes.length >= 2);
    };

    assert(Array.isArray(config.Patches));
    validate_path(config.Output);
    validate_path(config.Source);
    validate_path(config.Target);
}

/*****************************************************************************/

/**
 * The command handlers registry.
 * @var {Map}
 */
const cmd_handlers = new Map();

/**
 * The main command handler.
 * @function
 * @listens Terminal input.
 * @param {string} cmd - The command from the user.
 */
const cmd_listener = (cmd) => {
    if (busy)
        term.write_line("ERROR: System busy.");
    else if (cmd_handlers.has(cmd))
        cmd_handlers.get(cmd)();
    else
        term.write_line("ERROR: Unknown command.");
};

term.set_listener(cmd_listener);
term.write_line("Nano Core 2 Terminal");
term.ready();

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

    for (const patch of config.Patches) {
        if (await term.exec("git", config.Target, "apply", patch) !== 0)
            term.write("ERROR: Exit code is not 0, apply aborted.");
    }

    busy = false;
    term.ready();
});

/*****************************************************************************/

cmd_handlers.set("config", () => {
    term.write_line(JSON.stringify(config, null, 2));
    term.ready();
});

cmd_handlers.set("exit", () => {
    busy = true;
    term.destructor();
});

/*****************************************************************************/
