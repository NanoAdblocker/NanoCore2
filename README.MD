# Nano Core 2

Restarting fresh

A patch driven fork of uBlock Origin.

Upstream commit pin: `756288294ddfe66e4ec2fe73367d24328931e53f`

## Setup

1. Install latest version of Git and Node.js.
2. Navigate to `term` directory and run `npm install`.
3. Update `config.json` as appropriate.
4. Run `git clone --depth 1 https://github.com/gorhill/uBlock.git` in an
   appropriate directory to get upstream. Check out a tag or commit as
   appropriate.
5. Run these commands in the same directory to get files needed to build Nano
   Core 2.
   - `https://github.com/NanoAdblocker/NanoCore2.git`
   - `git clone --depth 1 https://github.com/NanoAdblocker/NanoFilters.git`
   - `git clone --depth 1 https://github.com/jspenguin2017/Edgyfy.git`
7. Run `node ./term` to open Nano Core 2 Terminal.

Note: The private repository `Prototype` is required for publishing.

## Development

You should not modify the upstream repository, instead, use Nano Core 2
Terminal to create and manage development environment.

```
reset    Nuke development environment and create a fresh one without any
         patches applied
sync     Resynchronize line numbers and hashes of patches
apply    Apply all existing patches, in order
mark     Create a patch based on the difference between tip of applied patches
         and current code in development environment

make     Build extension from development environment
pack     Build, test, then package the extension
publish  Build, test, package, then publish the extension
clean    Remove all build files

config   Print active configuration data
reload   Reload configuration data
exit     Exit the terminal
```

## Tips

Do not forget to copy and commit generated patches from `mark` to make them
permanent. Also adjust configuration file as appropriate.

To update a patch, simply paste further changes to the bottom of that patch and
`sync` them in. If something breaks, try disabling patches after that patch
temporarily.

To fix conflict, either carefully edit the patch file manually or disable the
broken patch along with patches after it and recreate the changes.
