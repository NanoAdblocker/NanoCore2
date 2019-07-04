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

## Basic Functionalities

Actions:
1. Open the dashboard
1. Restore to default settings

Expected:
1. Settings are restored
1. Filter cache is purged
1. Filters are reloaded from the package

## Edge Case Filter Parsing

Actions:
1. Open the dashboard and add these custom filters:
```
||example.com^$mp4
```

Expected:
1. No error thrown in the background console
1. Linter marks:
   1. `2` warnings on line `1`
1. Dashboard shows `2` total filters
