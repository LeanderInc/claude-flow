#!/usr/bin/env node

/**
 * Test: Creative Director Agent
 *
 * Tests the creative director with a video campaign concept task
 *
 * Usage: node examples/marketing-automation/test-agents/test-creative-director.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testCreativeDirector() {
  console.log('🧪 Testing: Creative Director Agent\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const testTask = `
Create a TikTok video campaign concept for a productivity app:

**Campaign Goal:**
- Generate 1M impressions with Gen Z/Millennial audience
- Drive app downloads
- Make productivity feel exciting, not boring

**App Details:**
- Name: FocusFlow
- Feature: AI that blocks distractions during work sessions
- Benefit: 2x productivity in half the time
- Style: Modern, playful, not corporate

**Deliverables:**
1. 3 video concepts (15-30 seconds each)
2. Shot-by-shot storyboards for each concept
3. Visual style guide (colors, effects, transitions)
4. Music/sound recommendations
5. Hook scripts (first 3 seconds)
6. Call-to-action variations
7. UGC creator brief (what to tell influencers)
8. Hashtag strategy
9. Asset specifications for TikTok

**Target Platforms:**
- Primary: TikTok
- Secondary: Instagram Reels, YouTube Shorts

**Tone:**
- Fun, relatable, not preachy
- Trending sounds/memes OK
- Before/after transformation style
`;

  try {
    console.log('📋 Test Task:');
    console.log('   Create TikTok video campaign for productivity app');
    console.log('   3 concepts with storyboards and creative direction\n');

    console.log('🤖 Spawning creative-director agent...\n');

    const command = `npx claude-flow@alpha agent spawn --type creative-director --task "${testTask}"`;

    console.log('💡 Command:');
    console.log(`   ${command}\n`);

    console.log('⏳ Running test...\n');
    console.log('Expected Output:');
    console.log('   ✓ 3 distinct video concepts');
    console.log('   ✓ Shot-by-shot storyboards');
    console.log('   ✓ Visual style guide');
    console.log('   ✓ Music/sound recommendations');
    console.log('   ✓ Hook scripts (3-second openers)');
    console.log('   ✓ CTA variations');
    console.log('   ✓ UGC creator brief');
    console.log('   ✓ Hashtag strategy');
    console.log('   ✓ Platform-specific specs\n');

    console.log('🎯 Test Scenario Success Criteria:');
    console.log('   ✓ Concepts are TikTok-native (not adapted TV ads)');
    console.log('   ✓ Hooks grab attention in <3 seconds');
    console.log('   ✓ Before/after transformation clearly shown');
    console.log('   ✓ Trending sounds/formats referenced');
    console.log('   ✓ UGC brief is actionable for creators\n');

    console.log('📊 Example Video Concept:');
    console.log('   Concept 1: "POV: You discover FocusFlow"');
    console.log('   Shot 1 (0-3s): Close-up of distracted person, phone buzzing');
    console.log('   Shot 2 (3-8s): Downloads app, activates focus mode');
    console.log('   Shot 3 (8-12s): Montage of productive work (sped up)');
    console.log('   Shot 4 (12-15s): Surprised face looking at clock (2 hours passed)');
    console.log('   Shot 5 (15-18s): App screen showing "2x productivity achieved"');
    console.log('   Shot 6 (18-20s): Download CTA with link in bio\n');

    console.log('✅ Creative Director test scenario prepared\n');
    console.log('💡 To run this test with real agent:');
    console.log('   Uncomment the execAsync line and run the script\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testCreativeDirector();
