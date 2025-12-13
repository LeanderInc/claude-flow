#!/usr/bin/env node

/**
 * MarketingScan AI - Test Script
 *
 * Tests the audit system with 5 real websites to validate agent outputs.
 *
 * Usage:
 *   node test-audit.js [--website <number>] [--all]
 */

const { runAudit } = require('./run-audit');
const path = require('path');
const fs = require('fs');

// Test websites
const TEST_WEBSITES = [
  {
    id: 1,
    name: 'Anthropic',
    url: 'https://www.anthropic.com',
    industry: 'AI/Technology',
    goals: 'Increase enterprise adoption of Claude AI',
    email: 'test@leander.inc'
  },
  {
    id: 2,
    name: 'Shopify',
    url: 'https://www.shopify.com',
    industry: 'E-commerce SaaS',
    goals: 'Increase merchant signups and reduce churn',
    email: 'test@leander.inc'
  },
  {
    id: 3,
    name: 'HubSpot',
    url: 'https://www.hubspot.com',
    industry: 'Marketing SaaS',
    goals: 'Grow free CRM users and upsell to paid tiers',
    email: 'test@leander.inc'
  },
  {
    id: 4,
    name: 'Small Business Example',
    url: 'https://www.localbakery.com',
    industry: 'Local Services',
    goals: 'Increase local visibility and online orders',
    email: 'test@leander.inc'
  },
  {
    id: 5,
    name: 'Leander Inc',
    url: 'https://www.leander.inc',
    industry: 'AI Agency',
    goals: 'Generate qualified leads for AI consulting services',
    email: 'test@leander.inc'
  }
];

// Validation criteria
const VALIDATION_CRITERIA = {
  executionTime: 45, // minutes
  minimumScore: 0,
  maximumScore: 100,
  requiredFields: [
    'agentName',
    'score',
    'summary',
    'findings',
    'recommendations'
  ],
  requiredAgents: [
    'customer-insights-analyst',
    'seo-optimizer',
    'cro-specialist',
    'content-strategist',
    'paid-search-manager',
    'paid-social-manager',
    'brand-strategist',
    'analytics-specialist'
  ]
};

// Validate agent output
function validateAgentOutput(agentId, output) {
  const errors = [];

  // Check required fields
  VALIDATION_CRITERIA.requiredFields.forEach(field => {
    if (!output[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Check score range
  if (output.score < VALIDATION_CRITERIA.minimumScore ||
      output.score > VALIDATION_CRITERIA.maximumScore) {
    errors.push(`Score ${output.score} out of valid range (0-100)`);
  }

  // Check findings array
  if (!Array.isArray(output.findings) || output.findings.length === 0) {
    errors.push('Findings array is empty or invalid');
  }

  // Check recommendations array
  if (!Array.isArray(output.recommendations) || output.recommendations.length === 0) {
    errors.push('Recommendations array is empty or invalid');
  }

  // Validate recommendations structure
  output.recommendations?.forEach((rec, idx) => {
    if (!rec.action || !rec.priority || !rec.effort || !rec.cost || !rec.estimatedImpact) {
      errors.push(`Recommendation ${idx} missing required fields`);
    }

    if (!['quick-win', 'short-term', 'long-term'].includes(rec.priority)) {
      errors.push(`Recommendation ${idx} has invalid priority: ${rec.priority}`);
    }

    if (!['low', 'medium', 'high'].includes(rec.effort)) {
      errors.push(`Recommendation ${idx} has invalid effort: ${rec.effort}`);
    }
  });

  return errors;
}

// Validate complete audit
function validateAudit(auditResult) {
  console.log('\n🔍 Validating audit results...\n');

  const validationReport = {
    overallStatus: 'PASS',
    errors: [],
    warnings: [],
    agentValidation: {}
  };

  // Check all required agents executed
  VALIDATION_CRITERIA.requiredAgents.forEach(agentId => {
    if (!auditResult.results[agentId]) {
      validationReport.errors.push(`Missing agent output: ${agentId}`);
      validationReport.overallStatus = 'FAIL';
    } else {
      const agentErrors = validateAgentOutput(agentId, auditResult.results[agentId]);
      validationReport.agentValidation[agentId] = {
        status: agentErrors.length === 0 ? 'PASS' : 'FAIL',
        errors: agentErrors
      };

      if (agentErrors.length > 0) {
        validationReport.overallStatus = 'FAIL';
        validationReport.errors.push(...agentErrors.map(e => `${agentId}: ${e}`));
      }
    }
  });

  // Check execution time
  const executionMinutes = parseFloat(auditResult.executionTime);
  if (executionMinutes > VALIDATION_CRITERIA.executionTime) {
    validationReport.warnings.push(
      `Execution time ${executionMinutes} min exceeds target ${VALIDATION_CRITERIA.executionTime} min`
    );
  }

  // Check final score
  const finalScore = auditResult.results['analytics-specialist']?.overallScore;
  if (finalScore === undefined) {
    validationReport.errors.push('Missing overall marketing score');
    validationReport.overallStatus = 'FAIL';
  }

  return validationReport;
}

// Print validation report
function printValidationReport(websiteName, validationReport) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 VALIDATION REPORT: ${websiteName}`);
  console.log(`${'='.repeat(80)}\n`);

  console.log(`Overall Status: ${validationReport.overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}\n`);

  // Agent-by-agent validation
  console.log('Agent Validation:\n');
  Object.keys(validationReport.agentValidation).forEach(agentId => {
    const result = validationReport.agentValidation[agentId];
    const status = result.status === 'PASS' ? '✅' : '❌';
    console.log(`  ${status} ${agentId}: ${result.status}`);

    if (result.errors.length > 0) {
      result.errors.forEach(err => {
        console.log(`      ⚠️  ${err}`);
      });
    }
  });

  // Errors
  if (validationReport.errors.length > 0) {
    console.log('\n❌ Errors:\n');
    validationReport.errors.forEach(err => {
      console.log(`  - ${err}`);
    });
  }

  // Warnings
  if (validationReport.warnings.length > 0) {
    console.log('\n⚠️  Warnings:\n');
    validationReport.warnings.forEach(warn => {
      console.log(`  - ${warn}`);
    });
  }

  console.log('');
}

// Run test for a single website
async function testWebsite(website) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🧪 TESTING: ${website.name}`);
  console.log(`${'='.repeat(80)}\n`);

  try {
    const result = await runAudit({
      url: website.url,
      industry: website.industry,
      goals: website.goals,
      email: website.email
    });

    const validationReport = validateAudit(result);
    printValidationReport(website.name, validationReport);

    return {
      website: website.name,
      status: validationReport.overallStatus,
      result,
      validationReport
    };

  } catch (error) {
    console.error(`\n❌ Test failed for ${website.name}:`, error.message);
    return {
      website: website.name,
      status: 'ERROR',
      error: error.message
    };
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 Starting MarketingScan AI Test Suite');
  console.log(`📋 Testing ${TEST_WEBSITES.length} websites\n`);

  const results = [];

  for (const website of TEST_WEBSITES) {
    const testResult = await testWebsite(website);
    results.push(testResult);

    // Brief pause between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Print summary
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 TEST SUITE SUMMARY');
  console.log('='.repeat(80) + '\n');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const errored = results.filter(r => r.status === 'ERROR').length;

  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`🚨 Errored: ${errored}\n`);

  results.forEach(r => {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '🚨';
    console.log(`${icon} ${r.website}: ${r.status}`);
  });

  // Save summary report
  const summaryPath = path.join(__dirname, '../../../outputs/test-summary.json');
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passed,
    failed,
    errored,
    results
  }, null, 2));

  console.log(`\n📁 Summary saved: ${summaryPath}\n`);

  return results;
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.includes('--all')) {
    return { mode: 'all' };
  }

  const websiteIndex = args.indexOf('--website');
  if (websiteIndex !== -1 && args[websiteIndex + 1]) {
    const id = parseInt(args[websiteIndex + 1]);
    return { mode: 'single', websiteId: id };
  }

  return { mode: 'all' };
}

// Entry point
async function main() {
  const { mode, websiteId } = parseArgs();

  if (mode === 'single') {
    const website = TEST_WEBSITES.find(w => w.id === websiteId);
    if (!website) {
      console.error(`❌ Website ${websiteId} not found. Valid IDs: 1-${TEST_WEBSITES.length}`);
      process.exit(1);
    }
    await testWebsite(website);
  } else {
    await runAllTests();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { testWebsite, runAllTests, validateAudit };
