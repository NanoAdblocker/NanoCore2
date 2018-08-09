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
        throw new Error("Exit code is not " + expected.toString() + ".");
};

/**
 * Asynchronously wait for a given amount of time.
 * @async @function
 * @param {integer} delay - Time to wait, in milliseconds.
 */
const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

/*****************************************************************************/

/**
 * Configuration object.
 * @object
 * {Array.<string>} Patches - Patches, in order.
 * {string} Source - Original directory.
 * {string} Target - Development directory.
 * {string} Output - Patch output.
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
        term.write_line("Error: System busy.");
    else if (cmd.length === 0)
        term.ready();
    else if (cmd_handlers.has(cmd))
        (cmd_handlers.get(cmd))();
    else
        term.write_line("Error: Unknown command.").ready();
});

/*****************************************************************************/

/**
 * Default options for executing commands.
 * Return value may change when the configuration file is reloaded.
 * @function
 * @return {Option} Default options.
 */
const exec_opt = () => {
    return {
        cwd: config.Target,
    };
};

/**
 * Apply a patch.
 * @async @function
 * @param {string} p - Path to the patch.
 * @throws When things go wrong.
 */
const apply = async (p) => {
    term.write_line("Applying " + p);
    await exec(0, "git", exec_opt(), "apply", p);
}

/**
 * Commit current changes.
 * @async @function
 * @throws When things go wrong.
 */
const commit = async () => {
    await exec(0, "git", exec_opt(), "add", "-A");
    await exec(0, "git", exec_opt(), "commit", "-m", "Apply patches");
};

/**
 * Create a patch and write it to a fil.
 * @async @function
 * @param {string} p - Path to the file.
 * @throws When things go wrong.
 */
const diff = async (p) => {
    let has_error = false;

    const stream = fs.createWriteStream(p, {
        encoding: "utf8",
    });
    stream.on("error", (err) => {
        has_error = true;
        term.write_line(err.stack);
    });

    await exec(0, "git", Object.assign(
        {
            on_data: (data) => {
                stream.write(data);
            },
        },
        exec_opt(),
    ), "diff");
    await new Promise((resolve, reject) => {
        stream.end(() => {
            if (has_error)
                reject();
            else
                resolve();
        });
    });
};

/*****************************************************************************/

cmd_handlers.set("reset", async () => {
    busy = true;

    try {
        await fs.remove(config.Target);

        // Need to wait a bit in between or there could be problems on Windows
        await sleep(100);

        await fs.copy(config.Source, config.Target);
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("sync", async () => {
    busy = true;

    try {
        for (const p of config.Patches) {
            await apply(p);
            await diff(p);
            await commit();
        }
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

    try {
        for (const p of config.Patches)
            await apply(p);

        await commit();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

cmd_handlers.set("mark", async () => {
    busy = true;

    try {
        await diff(config.Output);
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;
    term.ready();
});

/*****************************************************************************/

/**
 * All supported browsers.
 * @const {Array.<string>}
 */
const browsers = ["chromium", "edge"];

/*****************************************************************************/

/**
 * Build extension package for one browser.
 * @async @function
 * @param {string} b - Browser name.
 * @throws When things go wrong.
 */
const make_one = async (b) => {
    await build.build_core(b);
    await build.build_filters(b);
    await build.build_resources(b);
    await build.build_locale(b);
};

/**
 * Test build output for one browser.
 * @async @function
 * @param {string} b - Browser name.
 * @throws When things go wrong.
 */
const test_one = async (b) => {
    await build.test(b);
};

/**
 * Create ZIP package for one browser.
 * @async @function
 * @param {string} b - Browser name.
 * @throws When things go wrong.
 */
const pack_one = async (b) => {
    await build.pack(b);
};

/**
 * Publish package for one browser to extension store.
 * @async @function
 * @param {string} b - Browser name.
 * @throws When things go wrong.
 */
const publish_one = async (b) => {
    await build.publish(b, term);
};

/*****************************************************************************/

/**
 * Build extension package for all supported browsers.
 * @async @function
 * @throws When things go wrong.
 */
const make = async () => {
    for (const b of browsers)
        await make_one(b);
};

/**
 * Test build output for all supported browsers.
 * @async @function
 * @throws When things go wrong.
 */
const test = async () => {
    for (const b of browsers)
        await test_one(b);
};

/**
 * Create ZIP package for all supported browsers.
 * @async @function
 * @throws When things go wrong.
 */
const pack = async () => {
    for (const b of browsers)
        await pack_one(b);
};

/**
 * Publish package for all supported browsers to extension store.
 * @async @function
 * @throws When things go wrong.
 */
const publish = async () => {
    for (const b of browsers)
        await publish_one(b);
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

for (const b of browsers) {
    cmd_handlers.set("publish " + b, async () => {
        busy = true;

        try {
            await make_one(b);
            await test_one(b);
            await pack_one(b);
            await publish_one(b);
        } catch (err) {
            term.write_line(err.stack);
        }

        busy = false;
        term.ready();
    });
}

cmd_handlers.set("clean", async () => {
    busy = true;

    try {
        await fs.remove("./build");
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

{
    const name = "Nano Core 2 Terminal";
    term.title(name).write_line(name);
}

(async () => {
    await config_load();

    busy = false;
    term.ready();
})();

/*****************************************************************************/
