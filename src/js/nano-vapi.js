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

    nAPI binding.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nAPI = nAPI || {};

/*****************************************************************************/

nAPI.add_public_api_handler = (trusted, handler) => {
    chrome.runtime.onMessageExternal.addListener((msg, sender, res) => {
        if (typeof msg !== "object" || msg === null)
            return;

        if (!trusted(sender.id))
            return;
        if (!handler(msg))
            return;

        if (typeof res === "function")
            res({ data: "ok" });
    });
};

/*****************************************************************************/
