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

    Terminal utilities.

******************************************************************************/

"use strict";

/*****************************************************************************/

/**
 * Modules.
 * @const {Module}
 */
const child_process = require("child_process");

/*****************************************************************************/

/**
 * Terminal class.
 * Up to one terminal manager can be active at any given time.
 * Unless otherwise mentioned, all methods return the keyword this. Note that
 * the constructor and destructor are not considered to be methods.
 * @class
 */
module.exports = class {
    /**
     * Constructor.
     * @constructor
     * @param {Function} [func] - Command handler.
     *     @param {string} cmd - Incoming command, trimmed.
     */
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
    /**
     * Destructor.
     * @destructor
     */
    destructor() {
        process.stdin.pause();
        process.stdin.removeListener("data", this._handler);
    }

    /**
     * Set terminal title.
     * @method
     * @param {string} name - Title.
     */
    title(name) {
        return this.write("\x1B]0;" + name + "\x07");
    }

    /**
     * Write raw data to terminal output.
     * @method
     * @param {string|Buffer} data - Data to write.
     */
    write(data) {
        process.stdout.write(data);
        return this;
    }
    /**
     * Write a line to terminal output.
     * @method
     * @param {string} line - Line to write.
     */
    write_line(line) {
        return this.write(line + "\n");
    }

    /**
     * Set event listener.
     * This will replace the current listener if there is one.
     * @method
     * @param {Function} func - Command handler.
     *     @param {string} cmd - Incoming command, trimmed.
     */
    set_listener(func) {
        this._func = func;
        return this;
    }
    /**
     * Write prompt arrow.
     * Note that the user can enter input at any time, this is purely for
     * cosmetic purposes.
     * @method
     */
    ready() {
        return this.write("> ");
    }

    /**
     * Execute a command.
     * The terminal will become an interactive shell until the command
     * finishes.
     * @async @method
     * @param {Object} opt - The options.
     *     @object
     *     {string} cwd - Working directory to execute the command.
     *     {Function} [on_data] - Listener for stdout.
     *         @param {string} data - Data from stdout of the command.
     * @return {integer} Exit code.
     */
    exec(cmd, opt, ...args) {
        return new Promise((resolve, reject) => {
            const child = child_process.spawn(cmd, args, {
                cwd: opt.cwd,
            });

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

/*****************************************************************************/
