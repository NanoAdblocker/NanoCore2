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

// Terminal utilities

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

const child_process = require("child_process");

// ----------------------------------------------------------------------------------------------------------------- //

// Only one terminal manager can be active at any given time
// Unless otherwise mentioned, all methods return the keyword this
// Constructor takes in the event listener, which will receive trimmed command strings from user

module.exports = class {
    constructor(func) {
        if (func)
            this.set_listener(func);

        this._paused = false;

        this._handler = (line) => {
            if (this._paused)
                return;

            if (this._func)
                this._func(line.trim());
            else
                this.write_line("ERROR: No command handler.");
        };

        process.stdin.setEncoding("utf8");
        process.stdin.on("data", this._handler);
        process.stdin.resume();
    }

    destructor() {
        process.stdin.pause();
        process.stdin.removeListener("data", this._handler);
    }

    title(title) {
        return this.write("\x1B]0;" + title + "\x07");
    }

    // String or buffer
    write(data) {
        process.stdout.write(data);
        return this;
    }

    // String only
    write_line(line) {
        return this.write(line + "\n");
    }

    // Overwrites current listener
    set_listener(func) {
        this._func = func;
        return this;
    }

    ready() {
        return this.write("> ");
    }

    // Options:
    // cwd     - Current working directory
    // on_data - Listener for stdout
    //
    // Resolves the exit code
    exec(cmd, opt, ...args) {
        return new Promise((resolve, reject) => {
            const child = child_process.spawn(cmd, args, {
                cwd: opt.cwd,
            });

            child.on("error", reject);

            child.stdout.setEncoding("utf8");

            child.stdout.on("data", (data) => {
                this.write(data);

                if (opt.on_data)
                    opt.on_data(data);
            });

            child.stderr.setEncoding("utf8");

            child.stderr.on("data", (data) => {
                this.write(data);
            });

            this._paused = true;

            const on_user_input = (data) => {
                child.stdin.write(data);
            };

            process.stdin.on("data", on_user_input);

            child.on("close", (code) => {
                process.stdin.removeListener("data", on_user_input);

                this._paused = false;
                this.write_line("Command exited with code " + code.toString());

                resolve(code);
            });
        });
    }
};

// ----------------------------------------------------------------------------------------------------------------- //
