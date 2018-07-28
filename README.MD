# Nano Core 2

Restarting fresh

## Setup

1. Install latest version of Git and Node.js.
2. Navigate to `tools` directory and run `npm install`.
3. Update `config.json` as appropriate.
4. Run `git clone --depth 1 https://github.com/gorhill/uBlock.git` in the
   appropriate directory to get upstream.
5. Run `node ./tools` to open Nano Core 2 Terminal.

## Development

You should **not** modify the upstream repository, instead, use Nano Core 2
Terminal to create development environment.

Commands that the terminal accepts are as follows:

```
reset   Nuke your development environment and create a fresh one WITHOUT any
        patches applied
apply   Apply existing patches
mark    Create a patch based on the difference between tip of existing patches
        and your current development environment
config  Print the active configuration data
exit    Exit the terminal
```
