# Advanced Settings

If you are not familiar with advanced settings of uBlock Origin,
[**please read this first**](https://github.com/gorhill/uBlock/wiki/Advanced-settings).

## Differences

In Nano Adblocker, most of the advanced settings are the same as uBlock Origin,
however, the default value of some settings are different:
- `autoUpdateAssetFetchPeriod` defaults to `180` <sup>1</sup>
- `autoUpdatePeriod` defaults to `4`
- `extensionUpdateForceReload` defaults to `true`
- `manualUpdateAssetFetchPeriod` defaults to `1` <sup>1</sup>

<sup>1</sup> When fetching assets, you should either get them all done in one
burst or wait a significant delay between them. It is expensive to keep sockets
open and it is even more expensive to create new ones. In fact, holding sockets
open is how
[Slowloris](https://en.wikipedia.org/wiki/Slowloris_(computer_security))
attacks are carried out.

Also, the behavior of some settings are different:
- `popupPanelDisabledSections` expects a different bitfield:
  - Bit `0`: Firewall panel
- `popupPanelLockedSections` expects a different bitfield:
  - Bit `0`: Firewall panel

Beside the differences above, Nano Adblocker also offers a few more
functionalities in the advanced settings page. These advanced functionalities
**can change or break at any time**, make sure to back up your settings if you
want to play around with them. Please open an issue when they break for you, or
otherwise behave in a way that contradicts the description below. We cannot fix
issues that we are not aware of, so please take the time to report them!

### `autoCommentFilterTemplate` option

Available since 1.0.0.113

Following placeholders are also supported:
- `{{nanoHref}}`: Full URL of the webpage

### `Force recompile filters` button

Available since 1.0.0.22

When clicked, Nano Adblocker will discard compiled filters and internal selfies
then restart, during which *all* filters will be recompiled. **Any unsaved
changes will be discarded** during the restart and all opened extension pages
will be closed.

### `nanoIgnoreThirdPartyWhitelist` switch

Available since 1.0.0.22

Default: `false`

When set to `true`, Nano Adblocker will discard exception and `badfilter` rules
from all filter lists except `My filters` when compiling filters **in the
future**. Similarly, setting this switch to `false` **or turning off advanced
mode** will **not** cause discarded filters to be immediately restored.

Negated domains are sometimes transformed into exception rules, and they will
not be affected for now. This can change in the future.

Setting this switch to `true` **will definitely** break *many* websites and
you are to fix them **by yourself**.

### `nanoMakeThirdPartyFiltersPrivileged` switch

Available since 1.0.0.79

Default: `false`

When set to `true`, Nano Adblocker will treat all third party filter lists as
privileged when compiling filters **in the future**. Similarly, setting
this switch to `false` **or turning off advanced mode** will **not** cause
privileged filters to be immediately removed.

Privileged filter lists have access to privileged resources. Name of
privileged resources always start with `nanop-`. Nano Adblocker's own filters
(Nano filters) are always privileged.

### `nanoMakeUserFiltersPrivileged` switch

Available since 1.0.0.22

Default: `false`

When set to `true`, Nano Adblocker will treat `My filters` as privileged when
compiling filters **in the future**. Similarly, setting this switch to `false`
**or turning off advanced mode** will **not** cause privileged filters to be
immediately removed.

Privileged filter lists have access to privileged resources. Name of
privileged resources always start with `nanop-`. Nano Adblocker's own filters
(Nano filters) are always privileged.
