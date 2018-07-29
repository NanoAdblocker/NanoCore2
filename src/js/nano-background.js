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

    Background script.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nano = {};

/*****************************************************************************/

nano.my_id = () => {
    return chrome.runtime.id;
};

nano.is_trusted_ext = (id) => {
    return (
        sender.id === nano_defender_ext_id_chrome ||
        sender.id === nano_defender_ext_id_edge
    );
};

/*****************************************************************************/

chrome.runtime.onMessageExternal.addListener((msg, sender, response) => {
    if (typeof msg !== "object" || msg === null)
        return;
    if (typeof msg.data !== "string")
        return;
    if (!nano.is_trusted_ext(sender.id))
        return;

    // TODO: Enable integration filter

    if (typeof response === "function")
        response({ data: "ok" });
});

/*****************************************************************************/
