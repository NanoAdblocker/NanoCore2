# Filter Syntax

If you are not familiar with filter syntax of uBlock Origin,
[**please read this first**](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax).

In Nano Adblocker, most of the filter syntax are the same as uBlock Origin,
however, there are a few exceptions.

## Extra Resources

Nano Adblocker has
[extra resources](https://raw.githubusercontent.com/NanoAdblocker/NanoFilters/master/NanoFilters/NanoResources.txt),
and when a filter references one of those resources, it will not work as
intended in uBlock Origin out of the box. You can, however, load these extra
resources to uBlock Origin in advanced settings to make those filters work.

To combat extra stubborn websites, Nano Adblocker also has a few privileged
resources. These resources, which start with `nanop-`, are very powerful
so only privileged filters are allowed to use them. For security reasons,
they will not work in uBlock Origin.

## Convenience Options

Nano Adblocker will map options as follows for convenience:
```
    3p -> third-party
    1p -> first-party

 ghide -> generichide
   css -> stylesheet
iframe -> subdocument
   xhr -> xmlhttprequest
```

Although unlikely, this mapping **may change** if any of the mapped options get
another meaning in uBlock Origin.

uBlock Origin will instead map options as follows, but due to a bug, it does
not always work:
```
    3p -> third-party
    1p -> first-party

   css -> stylesheet
 frame -> subdocument
   xhr -> xmlhttprequest
```

## The option `empty`

Nano Adblocker will discard the filter if it has the option `empty`, uBlock
Origin will instead ignore the option.

This option is from Adguard and means redirect requests to an appropriate
blank file, ignoring the option and block the request instead will likely to
make things worse.

## The option `fetch`

Nano Adblocker does not differentiate between `fetch` and `xmlhttprequest`
requests and does not recognize `fetch` as an option. `fetch` requests
are mapped to `xmlhttprequest` by Edgyfy. uBlock Origin on Edge differentiates
between `fetch` and `xmlhttprequest` but does not recognize `fetch` as an
option.

If you are a filters maintainer and this difference is causing problems for
you, please let us know.

## The option `mp4`

Nano Adblocker will replace the option `mp4` with
`media,redirect=noopmp4-1s`, uBlock Origin will instead discard the filter.

This option should not be negated, however, Nano Adblocker will treat `~mp4` to
be the same as `mp4`, **this may change in the future without notice**.

This option is from Adguard and means redirect MP4 requests to a blank MP4 file,
Nano Adblocker will instead redirect media requests to a blank MP4 file. Keep
in mind that not all media requests are MP4 requests and not all MP4 requests
are media requests. Because of this difference, **this option may change in the
future without notice**.

A deprecation warning will be dispatched when this option is used in Nano
Adblocker.
