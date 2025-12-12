#!/usr/bin/env node

/**
 * Email Sequence Automation Swarm
 *
 * Creates an automated email drip campaign with:
 * - Strategy planning
 * - Email copywriting
 * - Sequence automation
 * - Analytics tracking
 *
 * Usage: node examples/marketing-automation/02-email-sequence-swarm.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

const EMAIL_SEQUENCE_CONFIG = {
  campaign: {
    name: 'SaaS Onboarding Sequence',
    duration: '7 days',
    emails: 5,
    goal: 'Convert trial users to paid customers'
  },
  workflow: {
    stages: [
      {
        name: 'strategy',
        agent: 'content-strategist',
        task: 'Create email sequence strategy for SaaS onboarding',
        duration: '15 minutes'
      },
      {
        name: 'copywriting',
        agent: 'copywriter',
        task: 'Write 5 email sequence: Welcome, Feature Tour, Case Study, Pricing, Urgency',
        duration: '30 minutes'
      },
      {
        name: 'automation',
        agent: 'email-automation-specialist',
        task: 'Set up automation triggers and segmentation rules',
        duration: '20 minutes'
      },
      {
        name: 'analytics',
        agent: 'analytics-specialist',
        task: 'Configure tracking and create performance dashboard',
        duration: '15 minutes'
      }
    ]
  }
};

async function runEmailSequenceSwarm() {
  console.log('📧 Initializing Email Sequence Automation Swarm...\n');
  console.log(`Campaign: ${EMAIL_SEQUENCE_CONFIG.campaign.name}`);
  console.log(`Goal: ${EMAIL_SEQUENCE_CONFIG.campaign.goal}\n`);

  try {
    // Step 1: Initialize hierarchical swarm (better for sequential workflows)
    console.log('🏗️  Step 1: Initializing hierarchical swarm...');
    await execAsync('npx claude-flow@alpha swarm init --topology hierarchical --workflow email-sequence');
    console.log('✅ Swarm initialized\n');

    // Step 2: Set up shared memory for campaign context
    console.log('🧠 Step 2: Setting up shared campaign memory...');
    await execAsync(`npx claude-flow@alpha memory store --key "campaign/context" --value '${JSON.stringify(EMAIL_SEQUENCE_CONFIG.campaign)}'`);
    console.log('✅ Campaign context stored\n');

    // Step 3: Execute workflow stages sequentially
    console.log('⚙️  Step 3: Executing email sequence workflow...\n');

    for (const stage of EMAIL_SEQUENCE_CONFIG.workflow.stages) {
      console.log(`  🔹 Stage: ${stage.name}`);
      console.log(`     Agent: ${stage.agent}`);
      console.log(`     Task: ${stage.task}`);

      // Spawn agent with hooks for coordination
      await execAsync(
        `npx claude-flow@alpha hooks pre-task --description "${stage.name}" && ` +
        `npx claude-flow@alpha agent spawn --type ${stage.agent} --task "${stage.task}" && ` +
        `npx claude-flow@alpha hooks post-task --task-id ${stage.name}`
      );

      console.log(`     ✅ Completed\n`);
    }

    // Step 4: Generate campaign report
    console.log('📊 Step 4: Generating campaign report...');
    const { stdout: metrics } = await execAsync('npx claude-flow@alpha swarm metrics --format json');
    const { stdout: memory } = await execAsync('npx claude-flow@alpha memory list --scope campaign');

    const report = {
      campaign: EMAIL_SEQUENCE_CONFIG.campaign,
      metrics: JSON.parse(metrics),
      memory: JSON.parse(memory),
      timestamp: new Date().toISOString()
    };

    await fs.writeFile(
      'examples/marketing-automation/reports/email-sequence-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('✅ Report saved to examples/marketing-automation/reports/email-sequence-report.json\n');

    console.log('🎉 Email Sequence Swarm completed successfully!');
    console.log('\n📧 Email sequence created with:');
    console.log(`   - ${EMAIL_SEQUENCE_CONFIG.campaign.emails} emails`);
    console.log(`   - ${EMAIL_SEQUENCE_CONFIG.campaign.duration} duration`);
    console.log(`   - Full automation setup`);
    console.log(`   - Analytics tracking enabled`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Create reports directory
await fs.mkdir('examples/marketing-automation/reports', { recursive: true });

// Run the swarm
runEmailSequenceSwarm();
