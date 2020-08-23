# Sanity Tests

Until a reliable unit tests and integration tests system is up and running, a
sanity test need to be performed manually before each release.

## Setup

**Actions**
1. Go to the extension manager
1. Open the details page for the sideloaded Nano Adblocker
1. Open the background console
1. Enable error collection

**Expected**
1. No error is ever logged to the background console
1. No error is ever collected

## Dashboard

**Actions**
1. Open the dashboard using the popup panel

**Expected**
1. Correct icon shows in the top left corner

### Settings Tab

**Actions**
1. Go to `Settings` tab
1. Click `Reset to default settings...`
1. Confirm action

**Expected**
1. The confirm prompt mentions `Nano`
1. Settings are restored (check outdated warning markers in `Filter lists` tab)
1. Filters cache is purged (check the last modified timestamp of `EasyList`)
1. Filters are reloaded from the extension package (check `Network` tab of the
   background console)
1. The subfilter of the uBlock base filter is properly loaded

**Actions**
1. Open the advanced settings page

**Expected**
1. Correct highlighting style is used

### My Filters Tab

**Actions**
1. Go to `My filters` tab
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
www3.example.com##+js(nanop-click-elements-onload, a)

||example.com^$csp=default-src 'none'; report-to https://other.example.com;
```

**Expected**
1. No error thrown in the background console
1. Highlighter markers:
   1. Section `1`:
      1. Line `3`: `redirect=` marked as invalid
   1. Section `3`:
      1. Line `1`: `xmlhtprequest` marked as invalid
   1. Section `4`:
      1. Line `2`: `##+js()` marked as invalid
1. Linter markers:
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
      1. Line `3`: `1` error
   1. Section `5`:
      1. Line `1`: `1` error
1. `Filter lists` tab shows `5` total filters for `My filters`

**Actions**
1. Refresh the dashboard

**Expected**
1. Warnings and errors are reloaded

**Cleanup**
1. Remove added filters

### Whitelist Tab

**Actions**
1. Go to `Whitelist` tab

**Expected**
1. Correct highlighting style is used

### About Tab

**Actions**
1. Go to `About` tab

**Expected**
1. Page shows the correct information

## Popup Panel

**Actions**
1. Go to `example.com`
1. Open the popup panel

**Expected**
1. Refresh button is visible
1. 6 buttons are shown in the bottom toolbar
1. Correct extension name and version are displayed

**Actions**
1. Click `Less` until the popup panel is completely contracted
1. Click `More` twice

**Expected**
1. The top toolbar appears, then the firewall panel appears

**Actions**
1. Click `Less` twice

**Expected**
1. The firewall panel disappears, then the top toolbar disappears

**Actions**
1. Open the bug reporter using the popup panel

**Expected**
1. Quick Issue Reporter opens
1. Correct URL is filled into the form automatically

## Logger

**Actions**
1. Open the logger using the popup panel
1. Go to `example.com`

**Expected**
1. Appropriate network requests are logged
1. Correct icons are shown in the toolbar

**Actions**
1. Bring up the popup panel inside the logger

**Expected**
1. Icon in the toolbar changes properly
1. Correct extension name and version are displayed
1. Two rows of tools are visible
1. Refresh button is visible

## Cosmetic Filtering

**Actions**
1. Go to `https://gorhill.github.io/uBlock/tests/`
1. Click `CSS selector-based cosmetic filters`
1. Add filters as instructed
1. Reload the page
1. Wait 5 seconds
1. Repeat for `Procedural cosmetic filters`

**Expected**
1. All boxes are green and stay green
1. No highlighter marker and no linter marker in `My filters` tab

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
1. No highlight marker and no linter marker in my filters tab

**Cleanup**
1. Remove added filter
