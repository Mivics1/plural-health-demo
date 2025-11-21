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

console.log('✓ Dashboard restoration complete');
