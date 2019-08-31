# Filter Syntax

If you are not familiar with filter syntax of uBlock Origin,
[**please read this first**](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax).

In Nano Adblocker, most of the filter syntax are the same as uBlock Origin,
however, there are a few exceptions.

## Extra Resources

Nano Adblocker has
[extra resources](https://github.com/NanoAdblocker/NanoCore2/blob/master/src/snippets.js),
and when a filter references one of those resources, it will not work as
intended in uBlock Origin out of the box. You can, however, load these extra
resources to uBlock Origin in advanced settings to make those filters work.

To combat extra stubborn websites, Nano Adblocker also has a few privileged
resources. These resources, which start with `nanop-`, are very powerful
so only privileged filters are allowed to use them. For security reasons,
they will not work in uBlock Origin.

## Convenience Options

Nano Adblocker and uBlock Origin will map options as follows for convenience:
```
   1p -> first-party
   3p -> third-party
  css -> stylesheet
  doc -> document
frame -> subdocument
  xhr -> xmlhttprequest
```

Additionally, Nano Adblocker will map `ghide` to `generichide` and `iframe` to
`subdocument`. uBlock Origin will discard filters that use `ghide` or `iframe`
options.

## The option `fetch`

Nano Adblocker does not differentiate between `fetch` and `xmlhttprequest`
requests and does not recognize `fetch` as an option. `fetch` requests
are mapped to `xmlhttprequest` by Edgyfy. uBlock Origin on Edge differentiates
between `fetch` and `xmlhttprequest` but does not recognize `fetch` as an
option.

If you are a filters maintainer and this difference is causing problems for
you, please let us know.
