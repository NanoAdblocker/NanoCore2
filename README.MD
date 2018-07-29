# Nano Core 2

Restarting fresh

A patch driven fork of uBlock Origin.

## Setup

1. Install latest version of Git and Node.js.
2. Navigate to `tools` directory and run `npm install`.
3. Update `config.json` as appropriate.
4. Run `git clone --depth 1 https://github.com/gorhill/uBlock.git` in an
   appropriate directory to get upstream. Check out a tag or commit if needed.
5. Clone these repositories in the same parent directory as Nano Core 2 if
   needed: `NanoAdblocker/NanoFilters`, `jspenguin2017/Edgyfy`
6. Run `node ./term` to open Nano Core 2 Terminal.

Note: The private repository `Prototype` is required for publishing.

## Development

You should not modify the upstream repository, instead, use Nano Core 2
Terminal to create and manage development environment.

```
reset    Nuke the development environment and create a fresh one without any
         patches applied
apply    Apply all existing patches, in proper order
mark     Create a patch based on the difference between tip of applied patches
         and current code in the development environment

make     Build extension from the development environment
pack     Build, test, then package the extension
publish  Build, test, package, then publish the extension

config   Print the active configuration data
reload   Reload configuration data
exit     Exit the terminal
```

## Tips

Do not forget to copy and commit the generated patches from `mark` to make them
permanent. Also adjust the configuration file as appropriate.

To update a patch, disable that patch along with patches after it, update the
patch, enable all patches, verify that later patches are still working, then
commit to make the change permanent. This is also the workflow for fixing
conflicts.

Each patch should only do one thing. If the thing is too complex, split it into
smaller pieces.
