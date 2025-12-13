#!/usr/bin/env node

/**
 * MarketingScan AI - Audit Orchestration Script
 *
 * This script orchestrates the 8-agent hierarchical swarm for marketing audits.
 *
 * Usage:
 *   node run-audit.js --url "https://example.com" --industry "SaaS" --goals "Increase leads" --email "client@example.com"
 *
 * Stages:
 *   Stage 1: Customer Insights (5 min)
 *   Stage 2: SEO + CRO + Content (parallel, 8 min)
 *   Stage 3: Paid Search + Paid Social + Brand (parallel, 6 min)
 *   Stage 4: Analytics Synthesis (7 min)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const AGENTS_CONFIG = path.join(__dirname, '../agents/marketing-audit-agents.json');
const WORKFLOW_CONFIG = path.join(__dirname, '../workflows/audit-orchestration.json');
const OUTPUT_DIR = path.join(__dirname, '../../../outputs');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    params[key] = value;
  }

  // Validate required parameters
  const required = ['url', 'industry', 'goals', 'email'];
  const missing = required.filter(r => !params[r]);

  if (missing.length > 0) {
    console.error(`❌ Missing required parameters: ${missing.join(', ')}`);
    console.log('\nUsage:');
    console.log('  node run-audit.js --url "https://example.com" --industry "SaaS" --goals "Increase leads" --email "client@example.com"');
    process.exit(1);
  }

  return params;
}

// Load configurations
function loadConfigs() {
  try {
    const agents = JSON.parse(fs.readFileSync(AGENTS_CONFIG, 'utf8'));
    const workflow = JSON.parse(fs.readFileSync(WORKFLOW_CONFIG, 'utf8'));
    return { agents, workflow };
  } catch (error) {
    console.error('❌ Failed to load configuration files:', error.message);
    process.exit(1);
  }
}

// Initialize session and memory
function initializeSession(params) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sessionId = `marketing-audit-${timestamp}`;

  console.log(`\n🚀 Initializing MarketingScan AI Audit`);
  console.log(`📊 Session ID: ${sessionId}`);
  console.log(`🌐 Company URL: ${params.url}`);
  console.log(`🏢 Industry: ${params.industry}`);
  console.log(`🎯 Goals: ${params.goals}`);
  console.log(`📧 Email: ${params.email}\n`);

  // Initialize swarm memory
  try {
    execSync(`npx claude-flow@alpha hooks session-restore --session-id "${sessionId}"`, {
      stdio: 'inherit'
    });
  } catch (error) {
    console.warn('⚠️  Session initialization warning (continuing):', error.message);
  }

  return sessionId;
}

// Execute a single agent
async function executeAgent(agent, context, sessionId) {
  console.log(`\n🤖 Executing: ${agent.name}`);
  console.log(`⏱️  Expected duration: ${agent.duration}`);
  console.log(`📁 Outputs: ${agent.outputs.join(', ')}`);

  const startTime = Date.now();

  // Pre-task hook
  try {
    execSync(agent.hooks.pre, { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️  Pre-task hook warning:', error.message);
  }

  // Build agent prompt with context substitution
  let prompt = agent.prompt;
  Object.keys(context).forEach(key => {
    const placeholder = `{{${key}}}`;
    const value = typeof context[key] === 'object'
      ? JSON.stringify(context[key])
      : context[key];
    prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
  });

  // Execute agent using Claude Code Task tool simulation
  // In production, this would use: await Task(agent.name, prompt, agent.type)
  console.log(`\n📝 Agent Prompt Preview:`);
  console.log(`${prompt.substring(0, 200)}...\n`);

  // Simulate agent execution (replace with actual Task tool in production)
  const mockOutput = {
    agentName: agent.id,
    score: Math.floor(Math.random() * 30) + 60, // Random score 60-90
    summary: `Mock summary for ${agent.name}`,
    findings: [
      { category: 'Test Category', issue: 'Sample issue', severity: 'medium', impact: 'Sample impact' }
    ],
    recommendations: [
      { action: 'Sample recommendation', priority: 'quick-win', effort: 'low', cost: '$0-500', estimatedImpact: '10% improvement' }
    ]
  };

  // Save output
  const outputPath = path.join(OUTPUT_DIR, sessionId, agent.outputs[0]);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(mockOutput, null, 2));

  // Post-task hook
  try {
    execSync(agent.hooks.post, { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️  Post-task hook warning:', error.message);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ ${agent.name} completed in ${duration}s`);
  console.log(`💾 Output saved: ${outputPath}`);

  return mockOutput;
}

// Execute stage with parallel support
async function executeStage(stage, agents, context, sessionId) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📍 ${stage.name}`);
  console.log(`⏱️  Expected duration: ${stage.duration}`);
  console.log(`🔄 Parallel execution: ${stage.parallelExecution ? 'Yes' : 'No'}`);
  console.log(`${'='.repeat(80)}`);

  const stageAgents = agents.filter(a => stage.agents.includes(a.id));

  if (stage.parallelExecution) {
    // Execute agents in parallel
    console.log(`\n⚡ Executing ${stageAgents.length} agents in parallel...`);
    const results = await Promise.all(
      stageAgents.map(agent => executeAgent(agent, context, sessionId))
    );
    return results;
  } else {
    // Execute agents sequentially
    const results = [];
    for (const agent of stageAgents) {
      const result = await executeAgent(agent, context, sessionId);
      results.push(result);
    }
    return results;
  }
}

// Main orchestration function
async function runAudit(params) {
  const { agents, workflow } = loadConfigs();
  const sessionId = initializeSession(params);

  // Build initial context
  const context = {
    companyUrl: params.url,
    industry: params.industry,
    goals: params.goals,
    email: params.email,
    timestamp: new Date().toISOString()
  };

  const auditStartTime = Date.now();
  const allResults = {};

  try {
    // Execute each stage
    for (const stage of workflow.workflow.stages) {
      const stageResults = await executeStage(stage, agents.agents, context, sessionId);

      // Update context with stage results
      stageResults.forEach((result, index) => {
        const agentId = stage.agents[index];
        allResults[agentId] = result;

        // Add results to context for next stages
        if (agentId === 'customer-insights-analyst') {
          context.audienceAnalysis = result;
        } else if (agentId === 'seo-optimizer') {
          context.seoAudit = result;
        } else if (agentId === 'cro-specialist') {
          context.croAudit = result;
        } else if (agentId === 'content-strategist') {
          context.contentAudit = result;
        } else if (agentId === 'paid-search-manager') {
          context.paidSearchAudit = result;
        } else if (agentId === 'paid-social-manager') {
          context.paidSocialAudit = result;
        } else if (agentId === 'brand-strategist') {
          context.brandAudit = result;
        }
      });
    }

    const totalDuration = ((Date.now() - auditStartTime) / 1000 / 60).toFixed(2);

    // Save final consolidated report
    const finalReportPath = path.join(OUTPUT_DIR, sessionId, 'complete-audit.json');
    const finalReport = {
      sessionId,
      params,
      executionTime: `${totalDuration} minutes`,
      results: allResults,
      generatedAt: new Date().toISOString()
    };
    fs.writeFileSync(finalReportPath, JSON.stringify(finalReport, null, 2));

    console.log(`\n${'='.repeat(80)}`);
    console.log(`✅ AUDIT COMPLETE`);
    console.log(`${'='.repeat(80)}`);
    console.log(`⏱️  Total execution time: ${totalDuration} minutes`);
    console.log(`📊 Final report: ${finalReportPath}`);
    console.log(`🎯 Overall marketing score: ${allResults['analytics-specialist']?.overallScore || 'N/A'}/100`);
    console.log(`\n📧 Report will be sent to: ${params.email}`);

    return finalReport;

  } catch (error) {
    console.error('\n❌ Audit failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Entry point
if (require.main === module) {
  const params = parseArgs();
  runAudit(params).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runAudit, executeAgent, executeStage };
