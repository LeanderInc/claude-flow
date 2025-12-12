#!/usr/bin/env node

/**
 * Micro-Swarm: Content Team (3 agents)
 *
 * A small content creation team:
 * - Content Strategist
 * - Copywriter
 * - Editor
 *
 * Perfect for blog posts, articles, whitepapers
 *
 * Usage: node examples/marketing-automation/micro-swarms/micro-content-team.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const BLOG_TASK = {
  topic: 'The ROI of AI Marketing Automation in 2024',
  wordCount: 1500,
  target: 'B2B SaaS companies',
  goal: 'Convert readers to demo requests',
  seo: {
    primaryKeyword: 'AI marketing automation ROI',
    secondaryKeywords: ['marketing automation benefits', 'AI marketing tools', 'marketing ROI metrics']
  }
};

async function runContentTeam() {
  console.log('📝 Micro-Swarm: Content Team\n');
  console.log(`Topic: ${BLOG_TASK.topic}`);
  console.log(`Word Count: ${BLOG_TASK.wordCount}`);
  console.log(`Target: ${BLOG_TASK.target}\n`);

  try {
    // Step 1: Initialize small hierarchical swarm
    console.log('🏗️  Step 1: Initializing content team swarm...');
    await execAsync('npx claude-flow@alpha swarm init --topology hierarchical --max-agents 3');
    console.log('✅ Swarm initialized\n');

    // Step 2: Set up shared memory
    console.log('🧠 Step 2: Setting up shared memory...');
    await execAsync(`npx claude-flow@alpha memory store --key "blog/topic" --value "${BLOG_TASK.topic}"`);
    await execAsync(`npx claude-flow@alpha memory store --key "blog/target" --value "${BLOG_TASK.target}"`);
    await execAsync(`npx claude-flow@alpha memory store --key "blog/seo" --value '${JSON.stringify(BLOG_TASK.seo)}'`);
    console.log('✅ Memory configured\n');

    // Step 3: Spawn agents sequentially
    console.log('⚙️  Step 3: Spawning content team...\n');

    // Stage 1: Strategy
    console.log('  🎯 Stage 1: Content Strategy');
    await execAsync(
      `npx claude-flow@alpha agent spawn --type content-strategist ` +
      `--task "Research and create outline for blog: ${BLOG_TASK.topic}. Target audience: ${BLOG_TASK.target}. Include SEO keywords: ${BLOG_TASK.seo.primaryKeyword}"`
    );
    console.log('  ✅ Strategy complete\n');

    // Stage 2: Writing
    console.log('  ✍️  Stage 2: Content Creation');
    await execAsync(
      `npx claude-flow@alpha agent spawn --type copywriter ` +
      `--task "Write ${BLOG_TASK.wordCount}-word blog post based on outline. Use conversational B2B tone. Include data and examples. Optimize for '${BLOG_TASK.seo.primaryKeyword}'"`
    );
    console.log('  ✅ Draft complete\n');

    // Stage 3: Editing
    console.log('  ✏️  Stage 3: Review & Polish');
    await execAsync(
      `npx claude-flow@alpha agent spawn --type editor ` +
      `--task "Review blog post for clarity, grammar, brand voice consistency. Ensure CTAs are compelling and SEO keywords flow naturally"`
    );
    console.log('  ✅ Final review complete\n');

    // Step 4: Check results
    console.log('📊 Step 4: Workflow Summary');
    const { stdout } = await execAsync('npx claude-flow@alpha swarm metrics');
    console.log(stdout);

    console.log('\n🎉 Content Team Swarm Complete!\n');
    console.log('📋 Deliverables:');
    console.log('   ✓ Blog outline with SEO strategy');
    console.log(`   ✓ ${BLOG_TASK.wordCount}-word blog post`);
    console.log('   ✓ Edited and polished final version');
    console.log('   ✓ Ready for publication\n');

    console.log('💡 Next Steps:');
    console.log('   - Add featured image');
    console.log('   - Schedule social media posts');
    console.log('   - Set up conversion tracking\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runContentTeam();
