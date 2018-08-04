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

    Dashboard my filters tab script.

******************************************************************************/

"use strict";

/*****************************************************************************/

var nano = nano || {};

/*****************************************************************************/

nano.filters_cache = "";
nano.editor = new nano.Editor("userFilters", true, false);

/*****************************************************************************/

nano.load_settings = () => {
    const on_msg = (wrap) => {
        nano.editor.set_line_wrap(wrap === true);
        nano.render_filters(true);
    };

    vAPI.messaging.send(
        "dashboard",
        {
            what: "userSettings",
            name: "nanoEditorSoftWrap"
        },
        on_msg
    );
};

/*****************************************************************************/

nano.render_filters = (first) => {
    const on_msg = function (details) {
        if (details.error)
            return;

        let content = details.content.trim();
        if (content.length > 0)
            content += "\n";

        nano.filters_cache = content;
        nano.editor.set_value_focus(content);

        nano.filters_changed(false);
        nano.render_anno();

        // TODO: Clear undo history if first is true?
    };

    vAPI.messaging.send(
        "dashboard",
        {
            what: "readUserFilters"
        },
        on_msg
    );
};

nano.render_anno = () => {
    const on_msg = (data) => {
        nano.editor.set_anno(data.errors.concat(data.warnings));
    };

    vAPI.messaging.send(
        "dashboard",
        {
            what: "nanoGetFilterLinterResult"
        },
        on_msg
    );
};

/*****************************************************************************/

nano.filters_changed = (changed) => {
    if (typeof changed !== "boolean")
        changed = nano.editor.get_unix_value().trim() !== nano.filters_cache;

    const apply_disable = (id, disabled) => {
        const elem = document.getElementById(id);
        if (disabled)
            elem.setAttribute("disabled", "");
        else
            elem.removeAttribute("disabled");
    };

    apply_disable("userFiltersApply", !changed);
    apply_disable("userFiltersRevert", !changed);
};

nano.filters_saved = () => {
    vAPI.messaging.send(
        "dashboard",
        {
            what: "reloadAllFilters"
        }
    );

    const btn = document.getElementById("userFiltersApply");
    btn.setAttribute("disabled", "");

    // Wait a bit for filters to finish compiling
    setTimeout(nano.render_anno, 500);
};

nano.filters_apply = () => {
    const on_msg = function (details) {
        if (details.error)
            return;

        nano.filters_cache = details.content.trim();
        nano.editor.set_value_focus(details.content);

        nano.filters_changed(false);
        nano.filters_saved();

        // TODO: Set the cursor back to its original position?
        // TODO: Clear undo history if first is true?
    };

    vAPI.messaging.send(
        "dashboard",
        {
            what: "writeUserFilters",
            content: nano.editor.get_unix_value()
        },
        on_msg
    );
};

nano.filters_revert = () => {
    let content = nano.filters_cache;
    if (content.length > 0)
        content += "\n";

    nano.editor.set_value_focus(content);
    nano.filters_changed(false);
};

/*****************************************************************************/

nano.import_picked = function () {
    const abp_importer = (s) => {
        const re_abp_subscription_extractor =
            /\n\[Subscription\]\n+url=~[^\n]+([\x08-\x7E]*?)(?:\[Subscription\]|$)/ig;
        const re_abp_filter_extractor =
            /\[Subscription filters\]([\x08-\x7E]*?)(?:\[Subscription\]|$)/i;

        let matches = re_abp_subscription_extractor.exec(s);
        if (matches === null)
            return s;

        const out = [];
        let filter_match;
        while (matches !== null) {
            if (matches.length === 2) {
                filter_match = re_abp_filter_extractor.exec(matches[1].trim());
                if (filter_match !== null && filter_match.length === 2)
                    out.push(filter_match[1].trim().replace(/\\\[/g, "["));
            }
            matches = re_abp_subscription_extractor.exec(s);
        }

        return out.join("\n");
    };

    const on_file_reader_load = function () {
        const sanitized = abp_importer(this.result);
        nano.editor.set_value_focus(
            nano.editor.get_unix_value().trim() + "\n" + sanitized
        );
        nano.filters_changed();
    };

    const file = this.files[0];

    if (file === undefined || file.name === "")
        return;
    if (!file.type.startsWith("text"))
        return;

    const fr = new FileReader();
    fr.onload = on_file_reader_load;
    fr.readAsText(file);
};

nano.import_filters = () => {
    const input = document.getElementById("importFilePicker");
    input.value = "";
    input.click();
};

/*****************************************************************************/

nano.export_filters = () => {
    var val = nano.editor.get_platform_value().trim();
    if (val === "")
        return;

    const filename = vAPI.i18n("1pExportFilename")
        .replace("{{datetime}}", uBlockDashboard.dateNowToSensibleString())
        .replace(/ +/g, "_");

    vAPI.download({
        "url": "data:text/plain;charset=utf-8," +
        encodeURIComponent(val + nano.editor.get_platform_line_break()),

        "filename": filename
    });
};

/*****************************************************************************/

nano.init = () => {
    let elem = document.getElementById("importUserFiltersFromFile");
    elem.addEventListener("click", nano.import_filters);

    elem = document.getElementById("importFilePicker");
    elem.addEventListener("change", nano.import_picked);

    elem = document.getElementById("exportUserFiltersToFile");
    elem.addEventListener("click", nano.export_filters);

    elem = document.getElementById("userFiltersApply");
    elem.addEventListener("click", nano.filters_apply);

    elem = document.getElementById("userFiltersRevert");
    elem.addEventListener("click", nano.filters_revert);

    nano.editor.on("change", nano.filters_changed);
    nano.load_settings();
};

/*****************************************************************************/

cloud.onPush = () => {
    return nano.editor.get_unix_value();
};

cloud.onPull = (data, append) => {
    if (typeof data !== "string")
        return;

    if (append) {
        data = uBlockDashboard.mergeNewLines(
            nano.editor.get_unix_value(),
            data
        );
    }

    nano.editor.set_value_focus(data);
    nano.filters_changed();
};

/*****************************************************************************/

nano.init();

nano.editor.on_key("save", "Ctrl-S", () => {
    const btn = document.getElementById("userFiltersApply");
    btn.click();
});

/*****************************************************************************/
