# Nano Core 2

Restarting fresh

A patch driven fork of uBlock Origin.

Upstream commit pin: `a20498b5c02b6e55e32ffe5ede829249cbdedeac` or `1.16.15rc0`

**Please submit issues to the
[Nano Core issues tracker](https://github.com/NanoAdblocker/NanoCore/issues).**

## Localization

Nano Core 2 has extra locale strings, most of them are for Nano Linter.

You can contribute to localization here:
https://crowdin.com/project/nano-adblocker

Your language is not listed? Submit an issue to let me know.

## Setup

1. Install latest version of Git and Node.js.
2. In an appropriate directory, run:
   - `git clone --depth 1 https://github.com/NanoAdblocker/NanoCore2.git`
   - `git clone --depth 1 https://github.com/NanoAdblocker/NanoFilters.git`
   - `git clone --depth 1 https://github.com/jspenguin2017/Edgyfy.git`
3. Run `git clone --depth 1 https://github.com/gorhill/uBlock.git` in an
   appropriate directory to get upstream. Check out a tag or commit as
   appropriate.
4. In Nano Core 2 repository:
   - Navigate to `./term` directory and run `npm install`.
   - Update `./config.json` as appropriate.
   - Run `node ./term` (in repository root) to open Nano Core 2 Terminal.

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

tmake    Build English locale file from locale definition
tsync    Synchronize (non-English) locale files with the latest build of the
         Crowdin project
         This will not rebuild the Crowdin project even if there are changes

config   Print active configuration data
reload   Reload configuration data
exit     Exit the terminal
```

## Checklist

- Pull filters update
- If needed, pull upstream update and update about string
- If needed, pull locale update
- Bump version number
- Add tags to repositories, and upload packages
- Upload packages to extension stores

## Tips

Do not forget to copy and commit generated patches from `mark` to make them
permanent. Also adjust the configuration file as appropriate.

To update a patch, simply paste further changes to the bottom of that patch and
`sync` them in. If something breaks, try disabling patches after that patch
temporarily.

To fix conflict, either edit the broken patch file manually or disable it
along with patches after it then recreate the changes.
