# Nano Core 2

Restarting fresh

A patch driven fork of uBlock Origin.

Upstream commit pin: `07cbae66a475a8b0cf0a93cfbff0ac63c3bfa8b1` or `1.19.2`

**Please submit issues to the
[Nano Core issues tracker](https://github.com/NanoAdblocker/NanoCore/issues).**

## Localization

Nano Core 2 has some extra locale strings, most of them are for Nano Linter.

You can contribute to localization here:
https://crowdin.com/project/nano-adblocker

Your language is not listed? Submit an issue to let me know.

## Setup

1. Install latest version of Git and Node.js.
2. In an appropriate directory, run:
   1. `git clone --depth 1 https://github.com/NanoAdblocker/NanoCore2.git`
   2. `git clone --depth 1 https://github.com/NanoAdblocker/NanoFilters.git`
   3. `git clone --depth 1 https://github.com/jspenguin2017/Edgyfy.git`
   4. `git clone --depth 1 https://github.com/jspenguin2017/uBlockProtector`
3. Run `git clone --depth 1 https://github.com/gorhill/uBlock.git` in an
   appropriate directory to get upstream. Check out a tag or commit as
   appropriate.
4. In Nano Core 2 repository:
   1. Navigate to `/term` directory and run `npm install`.
   2. Update `/config.json` as appropriate.
   3. Run `node ./term` to open Nano Core 2 Terminal.

Note: The private repository `Prototype` is required for publishing.

## Development

You should not modify the upstream repository, instead, use Nano Core 2
Terminal to create and manage development environment.

```
reset    Nuke development environment and create a fresh one without any
         patches applied
sync     Resynchronize all existing patches, in order
apply    Apply all existing patches, in order
mark     Create a patch based on the difference between tip of applied patches
         and current code in development environment

make     Build extension from development environment
pack     Build, test, then package the extension
publish  Build, test, package, then publish the extension
         Optionally pass browser name to publish for only one browser
clean    Remove all build files

lmake    Build English locale file from locale definition
lsync    Synchronize (non-English) locale files with the latest build of the
         Crowdin project
         This will not rebuild the Crowdin project even if there are changes

config   Print active configuration data
reload   Reload configuration data
exit     Exit the terminal
```

## Version Update Checklist

1.  Pull filters updates
2.  If needed, pull upstream updates then update about string and commit pin
3.  If needed, pull upstream updates to build scripts
4.  If needed, pull upstream updates to `assets.json` and `manifest.json`
5.  If needed, pull upstream updates to `1p-filters.js` and `asset-viewer.js`
6.  If needed, build and pull locale updates
7.  Bump version number
8.  Test to make sure everything is working
9.  Add tags to repositories, and upload packages
10. Upload packages to extension stores

## Version Update Watchlist

These are the potential problems to look out for:

1. Font Awesome related CSS changes

## Subresource Integrity Incidence Response Protocol

When there is a severe issue with the content of a subresource, an intervention
can be easily placed with the help of
[UltimateMirror](https://github.com/NanoMeow/UltimateMirror) and
[MirrorEngine](https://github.com/NanoMeow/MirrorEngine):

1. Lock the subresource in UltimateMirror
2. Remove problematic content from UltimateMirror, if needed
3. Update `assets.json` so the sanitized subresource will be loaded from
   UltimateMirror

Later, the intervention can be lifted as follows:

1. Update `assets.json` as appropriate, the subresource should no longer be
   loaded from UltimateMirror
2. Wait a bit for cache to expire (takes about 10 minutes), then restart
   MirrorEngine
3. Unlock the subresource in UltimateMirror

## Tips

Do not forget to copy and commit generated patches from `mark` to make them
permanent. Also adjust the configuration file as appropriate.

To update a patch, simply paste further changes to the bottom of that patch and
`sync` them in.

To fix conflict, either edit the broken patch file manually or disable it
along with patches after it then recreate the changes.
