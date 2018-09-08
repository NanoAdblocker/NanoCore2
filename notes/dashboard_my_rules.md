# Dashboard - My Rules

If you are not familiar with dynamic filtering rules in uBlock Origin,
[**please read this first**](https://github.com/gorhill/uBlock/wiki/Dynamic-filtering:-rule-syntax).

## Differences

Nano Adblocker has a slightly different default dynamic filtering rules:

```
no-csp-reports: * true
no-large-media: behind-the-scene false
no-scripting: behind-the-scene false
behind-the-scene * * noop
behind-the-scene * 1p-script noop
behind-the-scene * 3p noop
behind-the-scene * 3p-frame noop
behind-the-scene * 3p-script noop
behind-the-scene * image noop
behind-the-scene * inline-script noop
```
