# Patches

Below are patches that could be interesting, other less interesting patches
are in `housekeeping` directory. Note that some housekeeping tasks are
included in the build script.

## Bug Fixes

`fix_textarea_spacing.patch`: Fix spacing of textarea, not all user agents
default to a monospace font.

## Undo Regression

`disable_user_css.patch`: Disable UserCSS, this unbreak the DOM inspector of
the Logger.

## Features

`force_scroll_mode.patch`: Implement force scroll mode. Depends on housekeeping
changes.

`make_hard_purge_any_key.patch`: Make hard purge cached assets to be any
special keys.

`link_resources.patch`: Link useful resources in the dashboard. Depends on
housekeeping changes.

`force_recompile_filters.patch`: Add button to advanced settings page to force
recompile filters. Depends on housekeeping changes.

`tweak_default_config.patch`: Tweak default configuration.
