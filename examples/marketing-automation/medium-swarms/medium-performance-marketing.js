#!/usr/bin/env node

/**
 * Medium-Swarm: Full Performance Marketing (6 agents)
 *
 * Complete performance marketing campaign:
 * - Paid Search Manager
 * - Paid Social Manager
 * - CRO Specialist
 * - Copywriter
 * - Creative Director
 * - Analytics Specialist
 *
 * Perfect for integrated paid acquisition campaigns
 *
 * Usage: node examples/marketing-automation/medium-swarms/medium-performance-marketing.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const CAMPAIGN = {
  product: 'InvoiceFlow SaaS',
  description: 'Automated invoicing for freelancers',
  pricing: '$29/month',
  ltv: '$348', // 12-month average
  targetCPA: '$120',
  monthlyBudget: '$15,000',
  allocation: {
    googleAds: '$9,000', // 60%
    meta: '$4,500', // 30%
    linkedin: '$1,500'  // 10%
  },
  goals: {
    trials: 125, // per month
    paidConversions: 25 // 20% trial-to-paid
  }
};

async function runPerformanceMarketing() {
  console.log('💰 Medium-Swarm: Full Performance Marketing\n');
  console.log(`Product: ${CAMPAIGN.product}`);
  console.log(`Description: ${CAMPAIGN.description}`);
  console.log(`Pricing: ${CAMPAIGN.pricing}`);
  console.log(`Monthly Budget: ${CAMPAIGN.monthlyBudget}\n`);
  console.log(`Budget Allocation:`);
  console.log(`  - Google Ads: ${CAMPAIGN.allocation.googleAds} (60%)`);
  console.log(`  - Meta Ads: ${CAMPAIGN.allocation.meta} (30%)`);
  console.log(`  - LinkedIn: ${CAMPAIGN.allocation.linkedin} (10%)\n`);
  console.log(`Goals:`);
  console.log(`  - ${CAMPAIGN.goals.trials} trial signups/month`);
  console.log(`  - ${CAMPAIGN.goals.paidConversions} paid conversions/month`);
  console.log(`  - Target CPA: ${CAMPAIGN.targetCPA}\n`);

  try {
    // Step 1: Initialize performance marketing swarm
    console.log('🏗️  Step 1: Initializing performance marketing swarm...');
    await execAsync('npx claude-flow@alpha swarm init --topology mesh --max-agents 6');
    console.log('✅ Swarm initialized with mesh topology (parallel execution)\n');

    // Step 2: Store campaign brief
    console.log('🧠 Step 2: Loading campaign brief...');
    await execAsync(`npx claude-flow@alpha memory init --scope performance-campaign`);
    await execAsync(`npx claude-flow@alpha memory store --key "campaign/brief" --value '${JSON.stringify(CAMPAIGN)}'`);
    console.log('✅ Campaign brief loaded\n');

    // Step 3: Phase 1 - Campaign Setup (Parallel)
    console.log('⚙️  Phase 1: Campaign Structure Setup (Parallel)\n');

    console.log('  🔍 Spawning paid search manager...');
    const searchPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type paid-search-manager ` +
      `--task "Build Google Ads campaign for ${CAMPAIGN.product}: ${CAMPAIGN.description}. Budget: ${CAMPAIGN.allocation.googleAds}/month. Target CPA: ${CAMPAIGN.targetCPA}. Deliver: full campaign structure, 75+ keywords, 4 RSAs, negative keywords, ad extensions, bid strategy. Goal: ${Math.round(CAMPAIGN.goals.trials * 0.6)} trials/month from search"`
    );

    console.log('  📱 Spawning paid social manager...');
    const socialPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type paid-social-manager ` +
      `--task "Build paid social campaign for ${CAMPAIGN.product}. Platforms: Facebook/Instagram (${CAMPAIGN.allocation.meta}), LinkedIn (${CAMPAIGN.allocation.linkedin}). Target: freelancers, solopreneurs. Create: campaign structure, audience targeting, retargeting funnels, creative recommendations. Goal: ${Math.round(CAMPAIGN.goals.trials * 0.4)} trials/month"`
    );

    await Promise.all([searchPromise, socialPromise]);
    console.log('  ✅ Paid campaigns structured\n');

    // Step 4: Phase 2 - Creative & Copy (Parallel)
    console.log('⚙️  Phase 2: Creative & Copy Production (Parallel)\n');

    console.log('  🎨 Spawning creative director...');
    const creativePromise = execAsync(
      `npx claude-flow@alpha agent spawn --type creative-director ` +
      `--task "Create ad creative concepts for ${CAMPAIGN.product}. Platforms: Facebook/Instagram (Feed, Stories, Reels), LinkedIn (Sponsored Content). Concepts needed: 5 image variations, 2 video storyboards. Messaging: Save time on invoicing, Get paid faster. Target: freelancers/solopreneurs"`
    );

    console.log('  ✍️  Spawning copywriter...');
    const copyPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type copywriter ` +
      `--task "Write ad copy for ${CAMPAIGN.product} performance campaign. Create: Google RSA headlines (15) & descriptions (4), Facebook/Instagram ad copy (5 variations), LinkedIn ad copy (3 variations). Focus on pain: late payments, manual invoicing. Solution: automated, professional invoices in seconds"`
    );

    await Promise.all([creativePromise, copyPromise]);
    console.log('  ✅ Creative & copy ready\n');

    // Step 5: Phase 3 - Optimization & Analytics (Parallel)
    console.log('⚙️  Phase 3: Optimization & Analytics Setup (Parallel)\n');

    console.log('  🔧 Spawning CRO specialist...');
    const croPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type conversion-rate-optimizer ` +
      `--task "Optimize ${CAMPAIGN.product} landing page for ${CAMPAIGN.targetCPA} CPA. Current page converts at 8%. Analyze: form friction (email + credit card required), CTA copy, trust signals, mobile experience. Provide 7 A/B tests to hit ${CAMPAIGN.targetCPA} CPA target. Budget: ${CAMPAIGN.monthlyBudget}"`
    );

    console.log('  📊 Spawning analytics specialist...');
    const analyticsPromise = execAsync(
      `npx claude-flow@alpha agent spawn --type analytics-specialist ` +
      `--task "Set up performance marketing analytics for ${CAMPAIGN.product}. Track: Google Ads, Meta Ads, LinkedIn Ads. Metrics: impressions, CTR, CPC, conversions, CPA, ROAS, LTV:CAC ratio. Create unified dashboard. Budget: ${CAMPAIGN.monthlyBudget}. Goals: ${CAMPAIGN.goals.trials} trials at ${CAMPAIGN.targetCPA} CPA"`
    );

    await Promise.all([croPromise, analyticsPromise]);
    console.log('  ✅ Optimization & analytics configured\n');

    // Step 6: Summary
    console.log('📊 Performance Marketing Campaign Summary\n');
    const { stdout } = await execAsync('npx claude-flow@alpha swarm metrics');
    console.log(stdout);

    console.log('\n🎉 Performance Marketing Swarm Complete!\n');
    console.log('📋 Campaign Deliverables:');
    console.log('   ✓ Google Ads campaign (75+ keywords, 4 RSAs)');
    console.log('   ✓ Meta Ads campaign (Facebook/Instagram)');
    console.log('   ✓ LinkedIn Ads campaign');
    console.log('   ✓ 5 image creative concepts + 2 video storyboards');
    console.log('   ✓ Complete ad copy library');
    console.log('   ✓ Landing page CRO recommendations (7 tests)');
    console.log('   ✓ Unified analytics dashboard\n');

    console.log('💰 Budget & Performance Projections:');
    console.log(`   Total Budget: ${CAMPAIGN.monthlyBudget}/month`);
    console.log(`   Target CPA: ${CAMPAIGN.targetCPA}`);
    console.log(`   Expected Trials: ${CAMPAIGN.goals.trials}/month`);
    console.log(`   Expected Paid: ${CAMPAIGN.goals.paidConversions}/month`);
    console.log(`   LTV: ${CAMPAIGN.ltv}`);
    console.log(`   LTV:CAC Ratio: ${(348 / 120).toFixed(2)}:1 ✅\n`);

    console.log('📊 Performance by Channel:');
    console.log(`   Google Ads: ~${Math.round(CAMPAIGN.goals.trials * 0.6)} trials (${CAMPAIGN.allocation.googleAds})`);
    console.log(`   Meta Ads: ~${Math.round(CAMPAIGN.goals.trials * 0.3)} trials (${CAMPAIGN.allocation.meta})`);
    console.log(`   LinkedIn: ~${Math.round(CAMPAIGN.goals.trials * 0.1)} trials (${CAMPAIGN.allocation.linkedin})\n`);

    console.log('🚀 Launch Checklist:');
    console.log('   □ Set up conversion tracking (GA4, pixels)');
    console.log('   □ Create all ad creative assets');
    console.log('   □ Implement landing page A/B tests');
    console.log('   □ Launch campaigns with 20% daily budget cap');
    console.log('   □ Monitor performance first 3 days');
    console.log('   □ Optimize based on early data (days 7-14)');
    console.log('   □ Scale winners, pause losers (day 30)\n');

    console.log('📈 30-Day Optimization Plan:');
    console.log('   Week 1: Learning phase, gather data');
    console.log('   Week 2: First optimizations (pause underperformers)');
    console.log('   Week 3: Scale winning campaigns +20%');
    console.log('   Week 4: Test new creatives, expand keywords\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runPerformanceMarketing();
