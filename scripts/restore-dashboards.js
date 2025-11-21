#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dashboardsDir = path.join(__dirname, '../mochawesome-report');
const templatesDir = path.join(__dirname, '../dashboard-templates');

// Ensure mochawesome-report directory exists
if (!fs.existsSync(dashboardsDir)) {
  fs.mkdirSync(dashboardsDir, { recursive: true });
}

// Dashboard files to restore
const dashboards = ['index.html', 'dashboard.html', 'dashboard-advanced.html'];

dashboards.forEach(dashboard => {
  const templatePath = path.join(templatesDir, dashboard);
  const targetPath = path.join(dashboardsDir, dashboard);
  
  if (fs.existsSync(templatePath) && !fs.existsSync(targetPath)) {
    const content = fs.readFileSync(templatePath, 'utf-8');
    fs.writeFileSync(targetPath, content, 'utf-8');
    console.log(`✓ Restored ${dashboard}`);
  }
});

// Also copy any vendor files (like xlsx.min.js) from templates to the report folder
const vendorTemplatesDir = path.join(templatesDir, 'vendor');
const vendorTargetDir = path.join(dashboardsDir, 'vendor');

if (fs.existsSync(vendorTemplatesDir)) {
  if (!fs.existsSync(vendorTargetDir)) {
    fs.mkdirSync(vendorTargetDir, { recursive: true });
  }
  const files = fs.readdirSync(vendorTemplatesDir);
  files.forEach(file => {
    const src = path.join(vendorTemplatesDir, file);
    const dest = path.join(vendorTargetDir, file);
    // Copy only if template exists and target missing or different
    try {
      const srcStat = fs.statSync(src);
      if (srcStat.isFile()) {
        let shouldCopy = false;
        if (!fs.existsSync(dest)) {
          shouldCopy = true;
        } else {
          const srcBuf = fs.readFileSync(src);
          const destBuf = fs.readFileSync(dest);
          if (!srcBuf.equals(destBuf)) shouldCopy = true;
        }
        if (shouldCopy) {
          fs.copyFileSync(src, dest);
          console.log(`✓ Restored vendor/${file}`);
        }
      }
    } catch (err) {
      console.warn(`Could not restore vendor file ${file}:`, err.message);
    }
  });
}

console.log('✓ Dashboard restoration complete');
