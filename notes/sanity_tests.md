# Sanity Tests

Until a reliable unit tests and integration tests system is up and running, a
sanity test need to be performed manually before each release.

## Filter Parsing Logic

Open the dashboard and add these custom filters:

```
||example.com^$mp4
```

Expected:
1. No error thrown in the background console
1. Linter marks:
   1. `2` warnings on line `1`
1. Dashboard shows `2` total filters
