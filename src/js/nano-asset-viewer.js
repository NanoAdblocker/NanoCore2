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

    Asset viewer script.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nano = nano || {};

/*****************************************************************************/

nano.active_asset = "";
nano.editor = new nano.Editor("content", true, true);

/*****************************************************************************/

nano.load_settings = () => {
    const on_msg = (wrap) => {
        nano.editor.set_line_wrap(wrap !== false);
        nano.render_filter();
    };

    vAPI.messaging.send(
        "dashboard",
        {
            what: "userSettings",
            name: "nanoViewerSoftWrap"
        },
        on_msg
    );
};

/*****************************************************************************/

nano.render_filter = () => {
    const on_msg = (details) => {
        if (details && details.content) {
            let content = details.content;
            if (!content.endsWith("\n"))
                content += "\n";

            nano.editor.set_value_focus(content, -1);
        } else {
            nano.editor.set_value_focus("", -1);

            if (nano.active_asset !== "user-filters") {
                const anno = [
                    {
                        row: 0,
                        type: "error",
                        text: vAPI.i18n("nano_v_read_error")
                    }
                ];
                nano.editor.set_anno(anno);
            }
        }
    };

    if (nano.active_asset === "") {
        on_msg();
    } else {
        vAPI.messaging.send(
            "default",
            {
                what: "getAssetContent",
                url: nano.active_asset
            },
            on_msg
        );
    }
};

/*****************************************************************************/

nano.init = () => {
    const url = new URL(document.location);
    const params = url.searchParams;
    const key = params.get("url");

    if (typeof key === "string")
        nano.active_asset = key;

    nano.load_settings();
};

/*****************************************************************************/

nano.init();

/*****************************************************************************/
