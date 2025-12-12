#!/usr/bin/env node

/**
 * Simple Marketing Automation Swarm
 *
 * This example shows how to create a basic marketing swarm with 3 agents:
 * - Content Strategist
 * - Copywriter
 * - Social Media Manager
 *
 * Usage: node examples/marketing-automation/01-simple-swarm.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runSimpleMarketingSwarm() {
  console.log('🚀 Initializing Simple Marketing Automation Swarm...\n');

  try {
    // Step 1: Initialize swarm with mesh topology
    console.log('📊 Step 1: Initializing swarm topology...');
    await execAsync('npx claude-flow@alpha swarm init --topology mesh --max-agents 5');
    console.log('✅ Swarm initialized\n');

    // Step 2: Spawn marketing agents
    console.log('🤖 Step 2: Spawning marketing agents...');

    const agents = [
      {
        type: 'content-strategist',
        task: 'Analyze target audience and create content strategy for AI SaaS product launch'
      },
      {
        type: 'copywriter',
        task: 'Write engaging blog post about the benefits of AI marketing automation'
      },
      {
        type: 'social-media-manager',
        task: 'Create social media campaign for LinkedIn, Twitter, and Instagram'
      }
    ];

    // Spawn all agents in parallel
    const spawnPromises = agents.map(agent =>
      execAsync(`npx claude-flow@alpha agent spawn --type ${agent.type} --task "${agent.task}"`)
    );

    await Promise.all(spawnPromises);
    console.log('✅ All agents spawned successfully\n');

    // Step 3: Monitor swarm status
    console.log('📈 Step 3: Checking swarm status...');
    const { stdout } = await execAsync('npx claude-flow@alpha swarm status');
    console.log(stdout);

    // Step 4: Set up memory coordination
    console.log('🧠 Step 4: Enabling memory coordination...');
    await execAsync('npx claude-flow@alpha memory init --scope marketing-campaign');
    console.log('✅ Memory coordination enabled\n');

    console.log('🎉 Simple Marketing Swarm is now running!');
    console.log('\n📝 Next steps:');
    console.log('   - Monitor agents: npx claude-flow@alpha agent list');
    console.log('   - Check tasks: npx claude-flow@alpha task status');
    console.log('   - View metrics: npx claude-flow@alpha swarm metrics');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the swarm
runSimpleMarketingSwarm();
