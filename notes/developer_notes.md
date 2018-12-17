# Developer Notes

These may or may not be out of date.

## Generic Notes

- `cosmetic-filtering.js > FilterContainer.prototype.compileGenericHideSelector`
  tests the filter with a regular expression to check if it needs a hostname.
  If we want to keep slow filters, we cannot change this check, as assumption
  of code after will no longer be valid, and things will break.
- `redirect-engine.js > suffersSpuriousRedirectConflicts` attempts to unbreak
  HTTPS Everywhere. We usually do not like this kind of tradeoff, but
  considering websites that are not using HTTPS are unlikely to use CSP, this
  seems to be a reasonable tradeoff.
- `scriptlet-filtering.js` will convert script snippet rules with negated
  domains to exception rules. If the domains do not match, it can cause
  unintended behavior.
- `static-ext-filtering.js` sometimes passes double-hash filters with no suffix
  to static network filtering engine. `localhost##` will cause an error to be
  logged to the background console from
  `static-net-filtering.js > FilterParser.prototype.parse`. `localhost#?#` and
  `localhost#^#` are compiled to static network filters.
- `storage.js` checks whether the filter starts with `#` and discards the
  filter if it does. This is safe because double-hash filters are already
  handled.

## Other Observations

- Minor code style issue
  https://github.com/gorhill/uBlock/commit/b0da5df0a065f65596d611d312f68acae61ce71a
- `static-net-filtering.js > FilterContainer.prototype.compile` checks for
  empty lines, but there seems to be no way for empty lines to enter this
  function.
