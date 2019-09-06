# Sanity Tests

Until a reliable unit tests and integration tests system is up and running, a
sanity test need to be performed manually before each release.

## Setup

Actions:
1. Open the background console

Expected:
1. No error is ever logged to the background console

## Popup Panel

**Actions**
1. Go to `example.com`
1. Open the popup panel

**Expected**
1. Correct version shown at the top
1. Two rows of tools are visible
1. Refresh button is visible

## Logger

**Actions**
1. Open the logger using the popup panel
1. Go to `example.com`

**Expected**
1. Appropriate network requests are logged

## Dashboard

**Actions**
1. Open the dashboard using the popup panel

**Expected**
1. Correct icon shown in the top left corner

### Settings Tab

**Actions**
1. Go to the settings tab
1. Click restore to default settings button
1. Confirm action

**Expected**
1. Settings are restored (check outdated warning markers in filter lists tab)
1. Filter cache is purged (check timestamp in `Malware Domain List`)
1. Filters are reloaded from the package (check `Network` tab of background
   console)

### My Filters Tab

**Actions**
1. Go to my filters tab
1. Add these filters:
```
||www1.example.com^$mp4
||www2.example.com^$empty
||www3.example.com^$redirect=
||www4.example.com^$redirect=noopjs
*/*$redirect=nooptext
/[w\d]\.example\.com/$mp4
||www5.example.com^$mp4,empty
@@||www6.example.com^$mp4

1

||ww2.example.com^$xmlhtprequest

www1.example.com#@#+js()
www2.example.com##+js()
```

**Expected**
1. No error thrown in the background console
1. Highlighter marks:
   1. Section `1`:
      1. Line `3`: `redirect=` marked as invalid
   1. Section `3`:
      1. Line `1`: `xmlhtprequest` marked as invalid
   1. Section `4`:
      1. Line `2`: `##+js()` marked as invalid
1. Linter marks:
   1. Section `1`:
      1. Line `3`: `1` warning
      1. Line `4`: `1` warning
      1. Line `5`: `2` warnings
      1. Line `6`: `1` warning
      1. Line `7`: `1` error
      1. Line `8`: `1` error
   1. Section `2`:
      1. Line `1`: `1` error
   1. Section `3`:
      1. Line `1`: `1` error
   1. Section `4`:
      1. Line `2`: `1` error
1. Dashboard shows `5` total filters

**Actions**
1. Refresh the dashboard

**Expected**
1. Warnings and errors are reloaded

**Cleanup**
1. Remove added filters

### About Tab

**Actions**
1. Go to about tab

**Expected**
1. Page showing correct information

## Cosmetic Filtering

**Actions**
1. Go to `https://gorhill.github.io/uBlock/tests/`
1. Navigate to procedural cosmetic filters page
1. Add filters
1. Reload the page
1. Wait 5 seconds

**Expected**
1. All boxes are green and stays green
1. No highlight markers and no linter markers in my filters tab

**Cleanup**
1. Remove added filters

## Element Picker

**Actions**
1. Go to `example.com`
1. Bring up the element picker using the popup panel
1. Pick some text
1. Add the filter
1. Refresh the page

**Expected**
1. Picked text stays hidden
1. No highlight markers and no linter markers in my filters tab

**Cleanup**
1. Remove added filter
