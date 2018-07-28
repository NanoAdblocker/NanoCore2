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

        this._handler = (line) => {
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
     * Set event listener. This will replace the previous listener.
     * @method
     * @param {Function} func - The listener.
     */
    set_listener(func) {
        this.func = func;
    }
};

/*****************************************************************************/
