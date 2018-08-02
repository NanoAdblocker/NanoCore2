# Patches

Below are patches that could be interesting, other less interesting patches
are in `housekeeping` directory. Note that some housekeeping tasks are
included in the build script.

## Bug Fixes

`fix_textarea_spacing.patch`: Fix spacing of textarea, not all user agents
default to a monospace font.

## Undo Regression

`reg_user_css.patch`: Disable UserCSS, this will unbreak the DOM inspector of
the Logger.

## Features

`upd_config_tweaks.patch`: Update default configuration.

`upd_hard_purge_any_key.patch`: Update purge button for cached assets to accept
any special keys for hard purge mode.

`int_extended_resources.patch`: Integrate with extended resources and implement
privileged filters system. Depends on housekeeping changes.

`int_force_recompile.patch`: Enable force recompile filters button in advanced
settings page. Depends on housekeeping changes.

`int_force_scroll.patch`: Enable force scroll mode button in popup panel.
Depend on housekeeping changes.

## Live Documentation

`doc_link_resources.patch`: Link useful resources in the dashboard. Depends on
housekeeping changes.
