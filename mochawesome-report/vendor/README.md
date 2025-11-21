Place a copy of the minified SheetJS library here to enable offline XLSX export.

Recommended file name: xlsx.min.js

How to obtain:
1. Download from CDN (version used by this project):
   https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js
2. Save it as `mochawesome-report/vendor/xlsx.min.js`.

The `xlsx-loader.js` included with the dashboards will attempt to load the local file first, then fall back to the CDN if it's not present. Placing the file in this folder will ensure .xlsx export works offline and doesn't depend on external CDNs.
