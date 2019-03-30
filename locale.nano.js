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

// Locale definition
// Note that not every string is used

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

(() => {

    // ------------------------------------------------------------------------------------------------------------- //

    const mk_link = (url, name) => {
        return "<a href='" + url + "'>" + name + "</a>";
    };

    // ------------------------------------------------------------------------------------------------------------- //

    const ubo_res_doc = "https://github.com/gorhill/uBlock/wiki/Resources-Library";
    const nano_res_doc = "https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFiltersSource/" +
        "NanoResources.txt";

    // ------------------------------------------------------------------------------------------------------------- //

    return {

        // --------------------------------------------------------------------------------------------------------- //

        // Dashboard

        "nano_d_ui_group": {
            "message": "User interface",
            "description": "Group 'User interface' of settings tab",
        },

        "nano_d_line_wrap_e": {
            "message": "Soft wrap long lines in filter editor",
            "description": "English: Soft wrap long lines in filter editor",
        },

        "nano_d_line_wrap_v": {
            "message": "Soft wrap long lines in filter viewer",
            "description": "English: Soft wrap long lines in filter viewer",
        },

        "nano_d_recompile_filters": {
            "message": "Force recompile filters",
            "description": "Button in advanced settings to recompile filters",
        },

        "nano_d_resources_links": {
            "message": "Nano comes with two sets of resources, " + mk_link(ubo_res_doc, "uBlock Origin Resources") +
                " and " + mk_link(nano_res_doc, "Nano Extra Resources") + ".",
            "description": "Resources reference links, 'Resources' and 'Extra Resources' should be translated",
        },

        "nano_d_ace_help": {
            "message": "Nano Filter Editor is powered by Ace and most shortcut keys works the same.",
            "description": "Explain the similarity between Nano Filter Editor and Ace in terms of shortcut keys",
        },

        "nano_d_unsaved_warning": {
            "message": "Leave tab?\nChanges you made will not be saved.",
            "description": "Unsaved change warning",
        },

        "nano_d_about_based_on": {
            "message": "Based on {{@data}}",
            "description": "English: Based on {{@data}}",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Filter viewer

        "nano_v_title": {
            "message": "Nano — Filter Viewer",
            "description": "Title of the filter viewer",
        },

        "nano_v_read_error": {
            "message": "Could not load content, please refresh.",
            "description": "Error when filter content could not be loaded",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Popup panel

        "nano_p_cache_control": {
            "message": "cache control",
            "description": "The cache control strip name, can be at most 20 English characters wide",
        },

        "nano_p_open_firewall_pane": {
            "message": "Toggle the overview panel",
            "description": "Tooltip for toggle firewall (sometimes called overview) panel button",
        },

        "nano_p_refresh_button": {
            "message": "Click to refresh this page.\n\nCtrl+click to refresh this page while bypassing cache.",
            "description": "English: Click to refresh this page.\n\nCtrl+click to refresh this page while " +
                "bypassing cache.",
        },

        // Beta buttons

        "nano_p_force_scroll": {
            "message": "(beta) Enter force scroll mode (will break layout)",
            "description": "Tooltip for force scroll button"
        },

        "nano_p_bug_reporter": {
            "message": "(beta) Open the bug reporter",
            "description": "Tooltip for bug reporter button"
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Whitelist linter warnings

        "nano_l_whitelist_aborted_w": {
            "message": "Nano did not scan the rest of the lines for warnings because there are too many warnings.",
            "description": "Warning when too many warnings in whitelists",
        },

        "nano_l_whitelist_suspecious_re": {
            "message": "This line is treated as a regular expression, is that intended?",
            "description": "Warning when parsed as regular expression but is unlikely the intention of user",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Whitelist linter errors

        "nano_l_whitelist_aborted_e": {
            "message": "Nano did not scan the rest of the lines for errors because there are too many errors.",
            "description": "Error when too many errors in whitelists",
        },

        "nano_l_whitelist_invalid_hostname": {
            "message": "This hostname is not valid.",
            "description": "Error when hostname not valid",
        },

        "nano_l_whitelist_invalid_re": {
            "message": "This regular expression has syntax errors.",
            "description": "Error when regular expression has syntax errors",
        },

        "nano_l_whitelist_invalid_url": {
            "message": "This URL is not valid.",
            "description": "Error when a URL not valid",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Filter linter warnings

        "nano_l_filter_aborted_w": {
            "message": "Nano did not scan the rest of the lines for warnings because there are too many warnings.",
            "description": "Warning when too many warnings in filter rules",
        },

        "nano_l_filter_script_snippet_double_exception": {
            "message": "Nano discarded a negated domain because it cannot be used in a script snippet exception " +
                "rule.",
            "description": "Warning when negated domain used with script snippet exception",
        },

        "nano_l_filter_converted_to_exception": {
            "message": "Nano converted this rule to an exception rule because it only contain negated domains.",
            "description": "Warning when a rule is convered to exception because all negated domains",
        },

        "nano_l_filter_negated_html_filtering": {
            "message": "Negated domain is not yet supported for HTML filtering.",
            "description": "Warning when negated domain used with HTML filtering",
        },

        "nano_l_filter_discarded_non_negatable_type": {
            "message": "Nano discarded the type option '{{type}}' because it cannot be negated.",
            "description": "English: Nano discarded the type option '{{type}}' because it cannot be negated.",
        },

        "nano_l_filter_expanded_mp4_option": {
            "message": "Nano replaced the option 'mp4' with 'media,redirect=noopmp4-1s'.",
            "description": "Warning when 'mp4' is replaced",
        },

        "nano_l_filter_unsupported_type_ignored": {
            "message": "Nano discarded type options that are not yet supported.",
            "description": "Warning when unsupported type options discarded but not entire rule",
        },

        "nano_l_filter_resource_not_found": {
            "message": "The resource '{{res}}' could not be found, is it spelled correctly?",
            "description": "Warning when resource not found",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Filter linter deprecations

        "nano_l_filter_comment_bracket": {
            "message": "Using '[' to denote comment is deprecated, use '!' instead.",
            "description": "Deprecation when '[' used for comments",
        },

        "nano_l_filter_inline_comment": {
            "message": "Inline comments are deprecated.",
            "description": "Deprecation when inline comments",
        },

        "nano_l_filter_script_contains": {
            "message": "'##script:contains(...)' is deprecated, use '##^script:has-text(...)' instead.",
            "description": "Deprecation when 'script:contains' is used",
        },

        "nano_l_filter_mp4_option": {
            "message": "The use of the option 'mp4' is deprecated, write out the full options instead.",
            "description": "Deprecation when 'mp4'",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Filter linter errors

        "nano_l_filter_aborted_e": {
            "message": "Nano did not scan the rest of the lines for errors because there are too many errors.",
            "description": "Error when too many errors in filter rules",
        },

        "nano_l_filter_ag_js_injection": {
            "message": "Raw JavaScript injection is not accepted due to security concerns.",
            "description": "Error when raw JavaScript injection",
        },

        "nano_l_filter_bad_selector": {
            "message": "The selector in this rule has syntax errors.",
            "description": "Error when selector has syntax errors",
        },

        "nano_l_filter_too_expensive": {
            "message": "This rule cannot be generic.",
            "description": "Error when expensive rule is generic",
        },

        "nano_l_filter_style_injection_syntax_error": {
            "message": "This CSS injection rule has syntax errors.",
            "description": "Error when CSS injection has syntax errors",
        },

        "nano_l_filter_assets_access_violation": {
            "message": "Unprivileged filters may not reference privileged resources.",
            "description": "Error when unprivileged filter references a privileged resources",
        },

        "nano_l_filter_localhost_entry": {
            "message": "This host file entry is discarded because it is localhost declaration.",
            "description": "Error when localhost declaration",
        },

        "nano_l_filter_ag_element_remove": {
            "message": "Element remove rules with AdGuard syntax are not yet supported, use '##^' instead.",
            "description": "Error when AdGuard style element remove rule",
        },

        "nano_l_filter_negated_generichide": {
            "message": "The options 'generichide', 'ghide', and 'elemhide' cannot be negated.",
            "description": "Error when 'generichide' is negated",
        },

        "nano_l_filter_bad_domain_option_arguments": {
            "message": "The option 'domain=...' has invalid arguments.",
            "description": "Error when 'domain=' has invalid arguments",
        },

        "nano_l_filter_bad_csp_option_arguments": {
            "message": "The option 'csp=...' has invalid arguments.",
            "description": "Error when 'csp=' has invalid arguments",
        },

        "nano_l_filter_unknown_option": {
            "message": "The option '{{option}}' is not recognized.",
            "description": "English: The option '{{option}}' is not recognized.",
        },

        "nano_l_filter_only_unsupported_type": {
            // TODO: This was phrased like this due to weird behavior of thetype option 'webrtc', but turns out to be
            //       a bug:
            //       https://github.com/gorhill/uBlock/issues/3433
            //       Need to investigate whether this should be changed.
            "message": "A type option is not yet supported.",
            "description": "Error when unsupported type option used and entire rule discarded",
        },

        "nano_l_filter_bad_re": {
            "message": "This network rule has regular expression syntax errors.",
            "description": "Error when network has regular expression syntax errors",
        },

        "nano_l_filter_intervention_smed79": {
            // https://github.com/uBlock-LLC/uBlock/issues/1096
            "message": "The domain anchor may not be immediately followed by '^'.",
            "description": "Error when the bad rule from SMed79 is discarded",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Redirect rule warnings

        "nano_r_no_type": {
            "message": "Nano discarded the option 'redirect=...' because it requires a type option.",
            "description": "Warning when 'redirect=' has no type",
        },

        "nano_r_too_many_types": {
            "message": "Nano discarded the option 'redirect=...' because it has too many type options.",
            "description": "Warning when 'redirect=' has too many types",
        },

        "nano_r_no_resource_token": {
            "message": "Nano discarded the option 'redirect=...' because it has no arguments.",
            "description": "Warning when 'redirect=' has no arguments",
        },

        "nano_r_no_supported_type": {
            "message": "Nano discarded the option 'redirect=...' because it has no supported type option.",
            "description": "Warning when 'redirect=' has no supported type",
        },

        "nano_r_negated_domain": {
            "message": "Nano discarded a negated domain because it cannot be used with the option 'redirect=...'.",
            "description": "Warning when negated domain used with 'redirect='",
        },

        "nano_r_no_destination": {
            "message": "Nano discarded the option 'redirect=...' because it has no valid destination domain.",
            "description": "Warning when 'redirect=' has no destination",
        },

        "nano_r_redirect_in_exception": {
            "message": "The option 'redirect=...' cannot be used in exception rules.",
            "description": "Error when 'redirect=' used in exception",
        },

        "nano_r_does_not_match_re": {
            // TODO: Think of a better warning message
            "message": "Nano discarded the option 'redirect=...' because this network rule does not match this " +
                "regular expression: {{regexp}}",
            "description": "Warning when 'redirect=' failed initial test, use '{{regexp}}' to denote the tester " +
                "if needed",
        },

        // --------------------------------------------------------------------------------------------------------- //

        // Known bugs warnings

        "nano_b_cosmetic_filter_passed_through": {
            "message": "This rule is rejected for now. More information: " +
                "https://github.com/NanoAdblocker/NanoCore/issues/77",
            "description": "https://github.com/NanoAdblocker/NanoCore/issues/77",
        },

        // --------------------------------------------------------------------------------------------------------- //

    };
})();

// ----------------------------------------------------------------------------------------------------------------- //
