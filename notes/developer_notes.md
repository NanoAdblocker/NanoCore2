# Developer Notes

These may or may not be out of date.

## General Notes

- `cosmetic-filtering.js > FilterContainer.prototype.compileGenericHideSelector`
  checks whether a hostname is required for the filter. If we want to keep slow
  filters, we cannot change this check, as assumption of code after will no
  longer be valid, and things will break.

- `redirect-engine.js > suffersSpuriousRedirectConflicts` attempts to unbreak
  HTTPS Everywhere. We usually do not like this kind of tradeoff, but
  considering websites that are not using HTTPS are unlikely to use CSP, this
  seems to be a reasonable tradeoff.

- `scriptlet-filtering.js > api.compile` will convert script snippet rules with
  negated domains to exception rules. If the domains do not match, it can cause
  unintended behavior.

- `static-ext-filtering.js > api.compile` sometimes passes double-hash filters
  with no suffix onwards to static network filtering engine. `localhost##` will
  cause an error to be logged to the background console from
  `static-net-filtering.js > FilterParser.prototype.parse`. `localhost#?#` and
  `localhost#^#` are compiled to static network filters.

- `storage.js > µBlock.compileFilters` checks whether the filter starts with
  `#` and discards the filter if it does. This is safe because double-hash
  filters are already handled.

## Other Observations

- `static-net-filtering.js > FilterContainer.prototype.compile` checks for
  empty lines, but there seems to be no way for empty lines to enter this
  function.

- `storage.js > µBlock.loadFilterLists > onFilterListsReady` has a typo in
  the comments.

- Logger messages for invalid filters are not formatted consistently.
