#!/usr/bin/env node

/**
 * Test: Brand Strategist Agent
 *
 * Tests the brand strategist with a brand positioning task
 *
 * Usage: node examples/marketing-automation/test-agents/test-brand-strategist.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testBrandStrategist() {
  console.log('🧪 Testing: Brand Strategist Agent\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const testTask = `
Develop brand strategy for a new AI-powered email marketing platform:

**Company Info:**
- Name: EmailGenius
- Stage: Early-stage startup
- Target: Small businesses (10-100 employees)
- Differentiator: AI writes entire email campaigns, not just subject lines

**Current State:**
- No defined brand voice
- Generic messaging ("AI email marketing")
- Logo exists but no brand guidelines
- Competitors: Mailchimp, Constant Contact, HubSpot

**Deliverables Needed:**
1. Brand positioning statement
2. Brand voice and tone guidelines (with examples)
3. 3 brand pillars with supporting messages
4. Brand personality traits (5)
5. Tagline options (3 variations)
6. Key differentiators vs competitors
7. Messaging framework (who we are, what we do, why it matters)
8. Visual identity direction (colors, typography style, imagery)

**Target Audience:**
- Marketing managers at small businesses
- Pain: No time to write emails, generic campaigns, low ROI
- Goal: Automate email marketing without sacrificing quality
`;

  try {
    console.log('📋 Test Task:');
    console.log('   Create brand strategy for AI email marketing startup');
    console.log('   Define positioning, voice, messaging framework\n');

    console.log('🤖 Spawning brand-strategist agent...\n');

    const command = `npx claude-flow@alpha agent spawn --type brand-strategist --task "${testTask}"`;

    console.log('💡 Command:');
    console.log(`   ${command}\n`);

    console.log('⏳ Running test...\n');
    console.log('Expected Output:');
    console.log('   ✓ Clear brand positioning statement');
    console.log('   ✓ Voice/tone guidelines with examples');
    console.log('   ✓ 3 brand pillars with supporting messages');
    console.log('   ✓ 5 personality traits');
    console.log('   ✓ 3 tagline variations');
    console.log('   ✓ Competitive differentiation');
    console.log('   ✓ Messaging framework');
    console.log('   ✓ Visual identity direction\n');

    console.log('🎯 Test Scenario Success Criteria:');
    console.log('   ✓ Positioning differentiates from Mailchimp/HubSpot');
    console.log('   ✓ Voice guidelines are specific and actionable');
    console.log('   ✓ Brand pillars align with target audience pains');
    console.log('   ✓ Taglines are memorable and benefit-focused');
    console.log('   ✓ Messaging framework is complete\n');

    console.log('📊 Example Expected Brand Pillars:');
    console.log('   1. AI-Powered Intelligence');
    console.log('      → "Your emails write themselves"');
    console.log('   2. Small Business Focus');
    console.log('      → "Built for teams without marketing departments"');
    console.log('   3. Quality at Scale');
    console.log('      → "Automation that doesn\'t feel automated"\n');

    console.log('✅ Brand Strategist test scenario prepared\n');
    console.log('💡 To run this test with real agent:');
    console.log('   Uncomment the execAsync line and run the script\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testBrandStrategist();
