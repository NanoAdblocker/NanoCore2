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

    Core utilities.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * The modules.
 * @const {Module}
 */
const child_process = require("child_process");

/*****************************************************************************/

/**
 * Terminal class.
 * Only one instance can be active at any given time.
 * @class
 */
exports.Term = class {
    /**
     * Constructor, setup terminal.
     * @constructor
     * @param {Function} [func] - The command handler.
     */
    constructor(func) {
        if (func)
            this.set_listener(func);
        else
            this.func = null;

        this._paused = false;
        this._handler = (line) => {
            if (this._paused)
                return;

            if (this.func)
                this.func(line.trim());
            else
                this.write_line("ERROR: No command handler.");
        };

        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        process.stdin.on("data", this._handler);
    }
    /**
     * Destructor.
     * @destructor
     */
    destructor() {
        process.stdin.removeListener("data", this._handler);
        process.stdin.pause();
    }

    /**
     * Set event listener. This will replace the previous listener.
     * @method
     * @param {Function} func - The listener.
     */
    set_listener(func) {
        this.func = func;
    }
    /**
     * Write prompt arrow.
     * Note that the user can enter input at any time, this is purely for
     * cosmetic purposes.
     * @method
     */
    ready() {
        this.write("> ");
    }

    /**
     * Write raw data to terminal output.
     * @method
     * @param {string|Buffer} data - The data to write.
     *    @param {string} cmd - The command from the user.
     */
    write(data) {
        process.stdout.write(data);
    }
    /**
     * Write a line to the terminal output.
     * @method
     * @param {string} line - The line to write.
     */
    write_line(line) {
        this.write(line + "\n");
    }

    /**
     * Execute a command, with interactive shell.
     * @async @method
     * @param {string} cmd - The command.
     * @return {integer} exit_code - The exit code
     */
    exec(cmd, cwd, ...args) {
        return new Promise((resolve, reject) => {
            const child = child_process.spawn(cmd, {
                cwd: cwd,
            }, args);

            child.stdout.on("data", (data) => {
                this.write(data);
            });
            child.stderr.on("data", (data) => {
                this.write(data);
            });

            const on_user_input = (data) => {
                child.stdin.write(data);
            };
            process.stdin.on("data", on_user_input);

            child.on("close", (code) => {
                process.stdin.removeListener("data", on_user_input);

                this.write_line("Child exited with exit code " +
                    code.toString());
                resolve(code);
            });
        });
    }
};

/*****************************************************************************/
