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

    Configuration file.

******************************************************************************/

"use strict";

/*****************************************************************************/

(() => {
    return {

        /*********************************************************************/

        Patches: [
            // Housekeeping
            "./patches/housekeeping/upd_about_page.patch",
            "./patches/housekeeping/fix_version_parsing.patch",
            "./patches/housekeeping/fix_vapi_icon.patch",
            "./patches/housekeeping/fix_favicon.patch",
            "./patches/housekeeping/int_nano_background.patch",
            "./patches/housekeeping/int_compile_flags.patch",
            "./patches/housekeeping/cos_popup_tweaks.patch",

            // Bug fixes
            "./patches/fix_textarea_spacing.patch",

            // Undo regression
            "./patches/disable_user_css.patch",

            // Features
            "./patches/force_scroll_mode.patch",
            "./patches/make_hard_purge_any_key.patch",
            "./patches/link_resources.patch",
            "./patches/force_recompile_filters.patch",
            "./patches/tweak_default_config.patch",
            "./patches/add_extended_resources.patch",
        ],

        /*********************************************************************/

        Source: {
            Linux: "/tmp/uBlock/",
            Win: "D:/!Temporary/uBlock/",
        },

        Target: {
            Linux: "/tmp/NanoCore2DevEnv/",
            Win: "D:/!Temporary/NanoCore2DevEnv/",
        },

        Output: {
            Linux: "/tmp/NanoCore2Latest.patch",
            Win: "D:/!Temporary/NanoCore2Latest.patch",
        },

        /*********************************************************************/

    };
})();

/*****************************************************************************/
