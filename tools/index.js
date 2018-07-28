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
const engine = require("./engine.js");

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

/*****************************************************************************/

cmd_handlers.set("init", () => {
    busy = true;

});

cmd_handlers.set("exit", () => {
    busy = true;
    term.destructor();
});

/*****************************************************************************/
