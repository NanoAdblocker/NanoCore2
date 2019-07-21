# Sanity Tests

Until a reliable unit tests and integration tests system is up and running, a
sanity test need to be performed manually before each release.

## Setup

Actions:
1. Open the background console

Expected:
1. No error is ever logged to the background console

## Popup Panel

Actions:
1. Go to `example.com`
1. Open the popup panel

Expected:
1. Version shown at the top is correct
1. Two rows of tools are visible
1. Refresh button is visible

## Logger

Actions:
1. Open the logger using the popup panel
1. Go to `example.com`

Expected:
1. Appropriate network requests are logged

## Dashboard

Actions:
1. Open the dashboard using the popup panel

### Settings Tab

Actions:
1. Go to the settings tab
1. Click restore to default settings
1. Confirm action

Expected:
1. Settings are restored
1. Filter cache is purged
1. Filters are reloaded from the package

### My Filters Tab

Actions:
1. Go to my filters tab
1. Add these filters:
```
||example.com^$mp4
1
```

Expected:
1. No error thrown in the background console
1. Linter marks:
   1. Line `1`: `2` warnings
   1. Line `2`: `1` error
1. Dashboard shows `2` total filters
