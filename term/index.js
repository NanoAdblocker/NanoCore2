// ----------------------------------------------------------------------------------------------------------------- //

// Nano Core 2 - An adblocker
// Copyright (C) 2018-2019  Nano Core 2 contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ----------------------------------------------------------------------------------------------------------------- //

// Entry point of Nano Core 2 Terminal

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

const APP_NAME = "Nano Core 2 Terminal";

// ----------------------------------------------------------------------------------------------------------------- //

const assert = require("assert");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");

const build = require("./build.js");
const crowdin = require("./crowdin.js");
const Term = require("./term.js");

// ----------------------------------------------------------------------------------------------------------------- //

let busy = true;

// ----------------------------------------------------------------------------------------------------------------- //

const term = new Term();

// ----------------------------------------------------------------------------------------------------------------- //

const exec = async (expected, ...args) => {
    assert(typeof expected === "number");

    const exit_code = await term.exec(...args);

    if (exit_code !== expected)
        throw new Error("Exit code is not " + expected.toString() + ".");
};

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

// ----------------------------------------------------------------------------------------------------------------- //

// Source - Path to original directory
// Target - Path to development directory
// Output - Path to patch output
const config = {};

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
        {
            const slashes = p.match(/\//g);
            assert(slashes !== null && slashes.length >= 2);
        }
    };

    assert(Array.isArray(config.Patches));

    validate_path(config.Source);
    validate_path(config.Target);
    validate_path(config.Output);

    build.src_repo = config.Target;
};

// ----------------------------------------------------------------------------------------------------------------- //

const cmd_handlers = new Map();

term.set_listener((cmd) => {
    assert(typeof cmd === "string");

    if (busy) {
        term.write_line("Error: System busy.");
    } else if (cmd.length === 0) {
        term.ready();
    } else if (cmd_handlers.has(cmd)) {
        const handler = cmd_handlers.get(cmd);
        handler();
    } else {
        term.write_line("Error: Unknown command.").ready();
    }
});

// ----------------------------------------------------------------------------------------------------------------- //

// Default exec options
const exec_opt = () => {
    return {
        cwd: config.Target,
    };
};

// ----------------------------------------------------------------------------------------------------------------- //

// Apply patch
const apply = async (p) => {
    term.write_line("Applying " + p);

    await exec(0, "git", exec_opt(), "apply", p);
};

const commit = async () => {
    await exec(0, "git", exec_opt(), "add", "-A");
    await exec(0, "git", exec_opt(), "commit", "-m", "Apply patches");
};

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

let last_sync_i = 0;

const sync = async (cont) => {
    if (!cont)
        last_sync_i = 0;

    for (let i = last_sync_i; i < config.Patches.length; i++) {
        last_sync_i = i;
        const p = config.Patches[i];

        await apply(p);
        await diff(p);
        await commit();
    }

    last_sync_i = 0;
};

// ----------------------------------------------------------------------------------------------------------------- //

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

cmd_handlers.set("apply", async () => {
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

cmd_handlers.set("sync", async () => {
    busy = true;

    try {
        await sync(false);
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;

    term.ready();
});

cmd_handlers.set("cont", async () => {
    busy = true;

    try {
        await exec(0, "git", exec_opt(), "reset", "--hard");
        await sync(true);
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

// ----------------------------------------------------------------------------------------------------------------- //

const browsers = [
    "chromium",
    // "edge",
];

// ----------------------------------------------------------------------------------------------------------------- //

const make_one = async (browser) => {
    await build.build_core(browser);
    await build.build_filters(browser);
    await build.build_resources(browser);
    await build.build_locale(browser);
};

const test_one = async (browser) => {
    await build.test(browser);
};

const pack_one = async (browser) => {
    await build.pack(browser);
};

const publish_one = async (browser) => {
    await build.publish(browser, term);
};

// ----------------------------------------------------------------------------------------------------------------- //

const make = async () => {
    for (const b of browsers)
        await make_one(b);
};

const test = async () => {
    for (const b of browsers)
        await test_one(b);
};

const pack = async () => {
    for (const b of browsers)
        await pack_one(b);
};

const publish = async () => {
    for (const b of browsers)
        await publish_one(b);
};

// ----------------------------------------------------------------------------------------------------------------- //

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

// ----------------------------------------------------------------------------------------------------------------- //

const lmake = async () => {
    const data = eval(await fs.readFile("./locale.nano.js", "utf8"));

    const output = path.resolve("./src/_locales/en/");

    await fs.mkdirp(output);

    await fs.writeFile(
        path.resolve(output, "messages.json"),
        JSON.stringify(data, null, 2),
        "utf8",
    );
};

const lsync = async () => {
    await crowdin.sync();
};

// ----------------------------------------------------------------------------------------------------------------- //

cmd_handlers.set("lmake", async () => {
    busy = true;

    try {
        await lmake();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;

    term.ready();
});

cmd_handlers.set("lsync", async () => {
    busy = true;

    try {
        await lsync();
    } catch (err) {
        term.write_line(err.stack);
    }

    busy = false;

    term.ready();
});

// ----------------------------------------------------------------------------------------------------------------- //

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

// ----------------------------------------------------------------------------------------------------------------- //

process.on("unhandledRejection", (err) => {
    throw err;
});

term.title(APP_NAME).write_line(APP_NAME);

const main = async () => {
    await config_load();

    busy = false;

    term.ready();
};

// ----------------------------------------------------------------------------------------------------------------- //

main();

// ----------------------------------------------------------------------------------------------------------------- //
