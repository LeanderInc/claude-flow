#!/usr/bin/env node

/**
 * MarketingScan AI - PDF Report Generator
 *
 * Generates professional 40-50 page PDF reports from marketing audit JSON data
 *
 * Usage:
 *   node generate-pdf.js --input path/to/audit.json --output path/to/report.pdf
 *   npm run generate -- --input ../outputs/audit.json
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const Handlebars = require('handlebars');
const { format } = require('date-fns');
const { processAuditData } = require('./utils/data-processor');

// Load configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const params = { open: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') {
      params.input = args[i + 1];
      i++;
    } else if (args[i] === '--output' || args[i] === '-o') {
      params.output = args[i + 1];
      i++;
    } else if (args[i] === '--open') {
      params.open = true;
    }
  }

  // Default input/output paths
  if (!params.input) {
    params.input = path.join(__dirname, '../outputs/marketing-audit-2025-12-14T00-41-20-675Z/complete-audit.json');
  }

  if (!params.output) {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    params.output = path.join(__dirname, 'output', `marketing-audit-${timestamp}.pdf`);
  }

  return params;
}

/**
 * Load and compile HTML template
 */
function compileTemplate() {
  const templatePath = path.join(__dirname, 'templates/report-template.html');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  return Handlebars.compile(templateContent);
}

/**
 * Load CSS styles
 */
function loadStyles() {
  const stylesPath = path.join(__dirname, 'templates/styles.css');
  return fs.readFileSync(stylesPath, 'utf8');
}

/**
 * Generate PDF from audit data
 */
async function generatePDF(inputPath, outputPath, openAfter = false) {
  console.log('\n🚀 MarketingScan AI - PDF Generator');
  console.log('='.repeat(80));
  console.log(`📁 Input:  ${inputPath}`);
  console.log(`📄 Output: ${outputPath}\n`);

  try {
    // 1. Load audit data
    console.log('📊 Loading audit data...');
    const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

    // 2. Process and enrich data
    console.log('⚙️  Processing audit data...');
    const processedData = processAuditData(rawData, config);

    // 3. Compile template
    console.log('📝 Compiling HTML template...');
    const template = compileTemplate();
    const html = template(processedData);

    // 4. Load styles
    console.log('🎨 Loading styles...');
    const css = loadStyles();

    // 5. Combine HTML with CSS
    const fullHTML = html.replace('</head>', `<style>${css}</style></head>`);

    // 6. Create output directory
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 7. Launch Puppeteer and generate PDF
    console.log('🖨️  Generating PDF...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set content
    await page.setContent(fullHTML, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      preferCSSPageSize: true
    });

    await browser.close();

    // 8. Get file stats
    const stats = fs.statSync(outputPath);
    const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);

    // 9. Success!
    console.log('\n' + '='.repeat(80));
    console.log('✅ PDF Generated Successfully!');
    console.log('='.repeat(80));
    console.log(`📄 File: ${path.basename(outputPath)}`);
    console.log(`📁 Path: ${outputPath}`);
    console.log(`📊 Size: ${fileSizeMB} MB`);
    console.log(`📋 Company: ${rawData.params.url || 'N/A'}`);
    console.log(`⏱️  Generated: ${new Date().toLocaleString()}\n`);

    // 10. Open PDF if requested
    if (openAfter) {
      console.log('📖 Opening PDF...\n');
      const { exec } = require('child_process');
      const platform = process.platform;
      const opener = platform === 'darwin' ? 'open' : platform === 'win32' ? 'start' : 'xdg-open';
      exec(`${opener} "${outputPath}"`);
    }

    return {
      success: true,
      outputPath,
      fileSize: stats.size,
      pageCount: 'Estimated 45-50 pages'
    };

  } catch (error) {
    console.error('\n❌ Error generating PDF:', error.message);
    console.error(error.stack);
    throw error;
  }
}

/**
 * Main entry point
 */
async function main() {
  const params = parseArgs();

  // Validate input file
  if (!fs.existsSync(params.input)) {
    console.error(`❌ Input file not found: ${params.input}`);
    process.exit(1);
  }

  // Generate PDF
  await generatePDF(params.input, params.output, params.open);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generatePDF };
