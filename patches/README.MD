# Patches

More changes can be found in the `integration` directory. Note that some
integration changes are handled by the build scripts.

These patches must be applied after integration changes. The order *sometimes*
matters, keep them in the same order when possible.

## Group `00`: Bug Fixes

`00_0_textarea_spacing.patch`: Fix spacing of textarea, not all user agents
default to a monospace font.

## Group `10`: Undo Regression

`10_0_user_css.patch`: Disable UserCSS. This will unbreak the DOM inspector of
the Logger on Chromium.

## Group `20`: Minor Behavior Changes

`20_0_configuration_tweaks.patch`: Update default configuration.

`20_1_header_parsing.patch`: Update header parsing to reset update period when
filters lose that header entry.

`20_2_hard_purge_any_key.patch`: Update purge button for cached assets to
accept any special keys for hard purge mode.

`20_3_reset_hard.patch`: Update factory reset functionality to hard reset
everything.

`20_4_log_script_snippet_errors.patch`: Log script snippet errors.

`20_5_other_editors_style.patch`: Change highlighting style of whitelist and
advanced settings editors.

`20_6_autocomment_href.patch`: Add the full URL as an option for the generated
filters automatic comment template.

## Group `30`: User Interface Changes

`30_0_link_resources.patch`: Link useful resources in the dashboard.

## Group `90`: Other Changes

`90_0_assets_migration.patch`: Legacy assets migration.

`90_1_cherry_pick_fixes.patch`: Cherry-pick of the following commits:
- https://github.com/gorhill/uBlock/commit/d49a9dce66de6c3af1c31b9384293cddd96eb574
- https://github.com/gorhill/uBlock/commit/a5ba668c382a3be0ba41ce0f0a69ebb090c260a5
- https://github.com/gorhill/uBlock/commit/64cfc5779d87612f87bd5f9bd5581704d5795b64
- https://github.com/gorhill/uBlock/commit/cb5437b1619ed4e84b7b1319b400f44f98df117a
- https://github.com/gorhill/uBlock/commit/46197a11c511ec7f21632eb12ab7332c5e12354c

`90_2_resources_updates.patch`: Updates to script snippets and web accessible
resources. Currently updated to commit
`d25b9aa30f72c817b95455a41dfb80e2fecf58b2` or `1.29.2`.
