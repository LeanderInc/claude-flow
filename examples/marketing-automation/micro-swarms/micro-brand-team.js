#!/usr/bin/env node

/**
 * Micro-Swarm: Brand Team (3 agents)
 *
 * Brand development team:
 * - Brand Strategist
 * - Creative Director
 * - Copywriter
 *
 * Perfect for brand development, positioning, messaging
 *
 * Usage: node examples/marketing-automation/micro-swarms/micro-brand-team.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const BRAND_PROJECT = {
  company: 'SocialSpark',
  product: 'AI-powered social media scheduling tool',
  stage: 'Pre-launch startup',
  target: 'Solopreneurs and small creator businesses',
  competitors: ['Buffer', 'Hootsuite', 'Later'],
  differentiator: 'AI creates AND schedules content, not just schedules',
  needsToDeliver: [
    'Brand positioning statement',
    'Brand voice guidelines',
    'Messaging framework',
    'Visual identity direction',
    'Tagline (3 options)'
  ]
};

async function runBrandTeam() {
  console.log('🎨 Micro-Swarm: Brand Team\n');
  console.log(`Company: ${BRAND_PROJECT.company}`);
  console.log(`Product: ${BRAND_PROJECT.product}`);
  console.log(`Stage: ${BRAND_PROJECT.stage}\n`);

  try {
    // Step 1: Initialize swarm
    console.log('🏗️  Step 1: Initializing brand team...');
    await execAsync('npx claude-flow@alpha swarm init --topology hierarchical --max-agents 3');
    console.log('✅ Swarm initialized\n');

    // Step 2: Store brand brief
    console.log('🧠 Step 2: Loading brand brief...');
    await execAsync(`npx claude-flow@alpha memory store --key "brand/company" --value "${BRAND_PROJECT.company}"`);
    await execAsync(`npx claude-flow@alpha memory store --key "brand/differentiator" --value "${BRAND_PROJECT.differentiator}"`);
    await execAsync(`npx claude-flow@alpha memory store --key "brand/target" --value "${BRAND_PROJECT.target}"`);
    console.log('✅ Brand brief loaded\n');

    // Step 3: Execute brand development workflow
    console.log('⚙️  Step 3: Brand Development Workflow...\n');

    // Stage 1: Brand Strategy
    console.log('  🎯 Stage 1: Brand Strategy & Positioning');
    await execAsync(
      `npx claude-flow@alpha agent spawn --type brand-strategist ` +
      `--task "Develop complete brand strategy for ${BRAND_PROJECT.company}: ${BRAND_PROJECT.product}. Target: ${BRAND_PROJECT.target}. Differentiation: ${BRAND_PROJECT.differentiator}. Deliver: positioning statement, voice/tone guidelines, 3 brand pillars, personality traits, messaging framework, 3 tagline options. Competitors: ${BRAND_PROJECT.competitors.join(', ')}"`
    );
    console.log('  ✅ Brand strategy complete\n');

    // Stage 2: Creative Direction (runs in parallel with copywriting)
    console.log('  🎨 Stage 2a: Visual Identity Direction');
    const creativePromise = execAsync(
      `npx claude-flow@alpha agent spawn --type creative-director ` +
      `--task "Create visual identity direction for ${BRAND_PROJECT.company}. Develop: color palette recommendations, typography style (modern/playful), imagery direction, logo concept ideas, social media aesthetic. Align with brand positioning from strategist. Target audience: ${BRAND_PROJECT.target}"`
    );

    console.log('  ✍️  Stage 2b: Brand Messaging Copy');
    const copyPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type copywriter ` +
      `--task "Write brand messaging copy for ${BRAND_PROJECT.company}. Create: website hero copy, value proposition statements, about us page copy, mission statement. Use brand voice from strategist. Differentiator: ${BRAND_PROJECT.differentiator}"`
    );

    // Wait for both to complete
    await Promise.all([creativePromise, copyPromise]);
    console.log('  ✅ Creative direction & messaging complete\n');

    // Step 4: Summary
    console.log('📊 Step 4: Brand Development Summary\n');
    const { stdout } = await execAsync('npx claude-flow@alpha swarm metrics');
    console.log(stdout);

    console.log('\n🎉 Brand Team Swarm Complete!\n');
    console.log('📋 Brand Deliverables:');
    console.log('   ✓ Brand positioning statement');
    console.log('   ✓ Voice and tone guidelines with examples');
    console.log('   ✓ 3 brand pillars with supporting messages');
    console.log('   ✓ Brand personality traits (5)');
    console.log('   ✓ Messaging framework (who/what/why)');
    console.log('   ✓ 3 tagline options');
    console.log('   ✓ Visual identity direction');
    console.log('   ✓ Website messaging copy\n');

    console.log('💡 Next Steps:');
    console.log('   1. Review and select tagline');
    console.log('   2. Create full brand guidelines document');
    console.log('   3. Design logo based on creative direction');
    console.log('   4. Build website with messaging');
    console.log('   5. Train team on brand voice\n');

    console.log('🎨 Example Brand Pillars:');
    console.log('   1. AI-Powered Creativity');
    console.log('      → "Content creation on autopilot"');
    console.log('   2. Solopreneur Focus');
    console.log('      → "Built for one-person teams"');
    console.log('   3. Time Freedom');
    console.log('      → "Spend less time posting, more time creating"\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runBrandTeam();
