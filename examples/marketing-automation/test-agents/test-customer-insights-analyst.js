#!/usr/bin/env node

/**
 * Test: Customer Insights Analyst Agent
 *
 * Tests the customer insights analyst with a VOC research task
 *
 * Usage: node examples/marketing-automation/test-agents/test-customer-insights-analyst.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testCustomerInsightsAnalyst() {
  console.log('🧪 Testing: Customer Insights Analyst Agent\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const testTask = `
Conduct Voice of Customer (VOC) research for a project management tool:

**Product:**
- Name: TaskFlow
- Category: Project management software
- Target: Teams of 5-50 people
- Competitors: Asana, Monday.com, ClickUp, Trello

**Research Sources:**
1. Reddit communities
   - r/projectmanagement
   - r/productivity
   - r/startups
   - Search for: complaints about Asana, Monday, ClickUp

2. Review Sites
   - G2: Asana (read 50 1-star and 2-star reviews)
   - Capterra: Monday.com (read negative reviews)
   - TrustRadius: ClickUp (focus on cons)

3. Customer Interviews (simulate)
   - Synthesize common themes from reviews

**Deliverables:**
1. Top 10 Pain Points (ranked by frequency)
   - Include specific quotes
   - Categorize (usability, pricing, features, support)

2. Jobs-to-be-Done Analysis
   - What job are users hiring these tools to do?
   - What are they switching FROM?
   - What outcome do they want?

3. Feature Gaps
   - What do users wish existed but doesn't?
   - What features do they pay for but not use?

4. Customer Personas (3)
   - Demographics
   - Pain points
   - Goals
   - Current tools
   - Buying triggers

5. Voice of Customer Phrases
   - Exact language customers use
   - How they describe problems
   - Words they use when praising/criticizing

6. Win/Loss Themes
   - Why customers choose competitors
   - Why customers switch away from competitors
   - Deal-breakers and must-haves

7. Content Recommendations
   - Blog topics based on pain points
   - SEO keywords from customer language
   - Case study angles
`;

  try {
    console.log('📋 Test Task:');
    console.log('   Conduct VOC research for project management tool');
    console.log('   Analyze Reddit, G2, Capterra reviews for competitor pain points\n');

    console.log('🤖 Spawning customer-insights-analyst agent...\n');

    const command = `npx claude-flow@alpha agent spawn --type customer-insights-analyst --task "${testTask}"`;

    console.log('💡 Command:');
    console.log(`   ${command}\n`);

    console.log('⏳ Running test...\n');
    console.log('Expected Output:');
    console.log('   ✓ Top 10 pain points (ranked, with quotes)');
    console.log('   ✓ Jobs-to-be-Done framework');
    console.log('   ✓ Feature gap analysis');
    console.log('   ✓ 3 customer personas');
    console.log('   ✓ VOC phrase library');
    console.log('   ✓ Win/loss analysis');
    console.log('   ✓ Content recommendations\n');

    console.log('🎯 Test Scenario Success Criteria:');
    console.log('   ✓ Pain points include actual customer quotes');
    console.log('   ✓ JTBD identifies switching triggers');
    console.log('   ✓ Personas are specific, not generic');
    console.log('   ✓ VOC phrases use customer language (not marketing speak)');
    console.log('   ✓ Content ideas directly address pain points\n');

    console.log('📊 Example Pain Points (with quotes):');
    console.log('   1. Overwhelming complexity (32% of reviews)');
    console.log('      💬 "Asana has so many features I never use, just want tasks"');
    console.log('      💬 "Took 2 weeks to onboard team, way too complicated"');
    console.log('   ');
    console.log('   2. Expensive for small teams (28% of reviews)');
    console.log('      💬 "$24/user is insane for a 10-person startup"');
    console.log('      💬 "Pricing forces you into annual plans"');
    console.log('   ');
    console.log('   3. Slow mobile app (19% of reviews)');
    console.log('      💬 "Mobile app crashes constantly on Android"');
    console.log('      💬 "Can\'t use it on phone, defeats the purpose"\n');

    console.log('📊 Example JTBD:');
    console.log('   Job: "Help my team track project progress without meetings"');
    console.log('   Switching FROM: Email threads, spreadsheets, Trello');
    console.log('   Outcome: Everyone knows what to do, no daily standups needed');
    console.log('   Trigger: Team grew from 5 to 15, old system broke\n');

    console.log('📊 Example Persona:');
    console.log('   Name: Sarah the Startup PM');
    console.log('   Role: Product Manager at 20-person startup');
    console.log('   Age: 28-35');
    console.log('   Pain: Current tool (Asana) is overkill, team confused');
    console.log('   Goal: Simple task tracking, fast adoption');
    console.log('   Current Tools: Asana (too complex), considering switch');
    console.log('   Buying Trigger: Team complained 3 times in 1 week');
    console.log('   Decision Factors: Ease of use > features, affordable\n');

    console.log('✅ Customer Insights Analyst test scenario prepared\n');
    console.log('💡 To run this test with real agent:');
    console.log('   Uncomment the execAsync line and run the script\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testCustomerInsightsAnalyst();
