Place a copy of the minified SheetJS library here to enable offline XLSX export.

Recommended file name: xlsx.min.js

How to obtain:
1. Download from CDN (version used by this project):
   https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js
2. Save it as `dashboard-templates/vendor/xlsx.min.js`.

When you run the restore script, the template will be copied into `mochawesome-report/` and the loader will try to load `./vendor/xlsx.min.js` from the generated report folder. Alternatively place the same file at `mochawesome-report/vendor/xlsx.min.js` after report generation.
