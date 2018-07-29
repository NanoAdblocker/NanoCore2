# Patches

Below are patches that could be interesting, other less interesting patches
are in `housekeeping` directory. Note that some housekeeping tasks may be
included in the build script.

## Bug Fixes

`fix_textarea_spacing.patch`: Fix spacing of textarea, not all user agents
default to a monospace font.

## Undo Regression

`disable_user_css.patch`: Disable UserCSS, this unbreak the DOM inspector of
the Logger.

## Other

`link_resources.patch`: Link useful resources in the dashboard. Depends on
housekeeping changes.
