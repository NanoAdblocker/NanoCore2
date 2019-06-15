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

// Configuration file

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

(() => {
    return {

        // --------------------------------------------------------------------------------------------------------- //

        Patches: [

            // ----------------------------------------------------------------------------------------------------- //

            "./patches/integration/00_0_about.patch",
            "./patches/integration/00_1_version_parsing.patch",
            "./patches/integration/00_2_vapi_icon.patch",
            "./patches/integration/00_3_favicon.patch",

            "./patches/integration/10_0_load_scripts.patch",
            "./patches/integration/10_1_compile_flags.patch",
            "./patches/integration/10_2_extended_resources.patch",
            "./patches/integration/10_3_force_recompile.patch",
            "./patches/integration/10_4_extended_options.patch",
            "./patches/integration/10_5_linters.patch",
            "./patches/integration/10_6_lint_filters.patch",
            "./patches/integration/10_7_filter_editor.patch",
            "./patches/integration/10_8_filter_viewer.patch",

            "./patches/integration/20_0_popup_tweaks.patch",
            "./patches/integration/20_1_force_scroll.patch",
            "./patches/integration/20_2_bug_reporter.patch",

            "./patches/integration/30_0_settings_tweaks.patch",
            "./patches/integration/30_1_editor_settings.patch",
            "./patches/integration/30_2_link_differences.patch",

            "./patches/integration/90_0_edgyfy.patch",
            "./patches/integration/90_1_settings_migration.patch",

            // ----------------------------------------------------------------------------------------------------- //

            "./patches/00_0_textarea_spacing.patch",

            "./patches/10_0_user_css.patch",

            "./patches/20_0_configuration_tweaks.patch",
            "./patches/20_1_header_parsing.patch",
            "./patches/20_2_hard_purge_any_key.patch",
            "./patches/20_3_reset_hard.patch",
            "./patches/20_4_log_script_snippet_errors.patch",
            "./patches/20_5_whitelist_style.patch",
            "./patches/20_6_autocomment_href.patch",

            "./patches/30_0_link_resources.patch",

            // ----------------------------------------------------------------------------------------------------- //

        ],

        // --------------------------------------------------------------------------------------------------------- //

        Source: {
            Linux: "/tmp2/uBlock/",
            Win: "D:/A_Temporary/uBlock/",
        },

        Target: {
            Linux: "/tmp2/NanoCore2DevEnv/",
            Win: "D:/A_Temporary/NanoCore2DevEnv/",
        },

        Output: {
            Linux: "/tmp2/NanoCore2Latest.patch",
            Win: "D:/A_Temporary/NanoCore2Latest.patch",
        },

        // --------------------------------------------------------------------------------------------------------- //

    };
})();

// ----------------------------------------------------------------------------------------------------------------- //
