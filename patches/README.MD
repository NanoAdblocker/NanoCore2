# Patches

More changes can be found in the `integration` directory. Note that some
integration changes are handled by the build scripts.

These patches must be applied after integration changes. The order *sometimes*
matters, keep them in the same order when possible.

## Group `00`: Bug Fixes

`00_0_textarea_spacing.patch`: Fix spacing of textarea, not all user agents
default to a monospace font.

## Group `10`: Undo Regression

`10_0_user_css.patch`: Disable UserCSS, this will unbreak the DOM inspector of
the Logger.

## Group `20`: Minor Behavior Changes

`20_0_configuration_tweaks.patch`: Update default configuration.

`20_1_header_parsing.patch`: Update header parsing to reset update period when
filters lose that header entry.

`20_2_hard_purge_any_key.patch`: Update purge button for cached assets to
accept any special keys for hard purge mode.

`20_3_reset_hard.patch`: Update factory reset functionality to hard reset
everything.

`20_4_log_script_snippet_errors.patch`: Log script snippet errors.

## Group `30`: User Interface Changes

`30_0_link_resources.patch`: Link useful resources in the dashboard.

## Group `90`: Other Changes

`90_0_micro_optimizations.patch`: Minor optimizations and typo fixes.

`90_1_warn_unsaved.patch`: Warn for unsaved changed in dashboard. Falls in this
category because a pull request is opened upstream.
