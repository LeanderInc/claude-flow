#!/usr/bin/env node

/**
 * Test: Paid Social Manager Agent
 *
 * Tests the paid social manager with a multi-platform campaign task
 *
 * Usage: node examples/marketing-automation/test-agents/test-paid-social-manager.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testPaidSocialManager() {
  console.log('🧪 Testing: Paid Social Manager Agent\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const testTask = `
Create a LinkedIn + Facebook/Instagram ads campaign for an HR software:

**Product:**
- Name: TalentHub
- Category: Applicant Tracking System (ATS) for recruiters
- Target: HR managers at mid-size companies (100-1000 employees)
- Price: $199/month flat rate (unlimited users)
- Benefit: Hire 3x faster with AI-powered candidate matching

**Campaign Goals:**
- Generate free trial signups
- Target CPA: $75
- Total budget: $10,000/month ($7k LinkedIn, $3k Meta)
- Target: 133 trial signups/month

**Platform Strategy:**
- LinkedIn: Primary (more B2B intent)
- Facebook/Instagram: Retargeting + lookalikes

**Deliverables:**
1. LinkedIn Campaign Structure
   - Campaign objectives
   - Ad formats (Sponsored Content, InMail, Text Ads)
   - Targeting criteria (titles, industries, company sizes)
   - 3 ad variations per format
   - Budget allocation

2. Meta Campaign Structure (Facebook/Instagram)
   - Campaign objectives
   - Ad formats (Feed, Stories, Reels)
   - Audience strategy (cold, warm, retargeting)
   - 5 ad creative concepts
   - Budget allocation

3. Creative Recommendations
   - Image specs and concepts
   - Video ideas (if applicable)
   - Copy frameworks for each platform
   - CTA variations

4. Retargeting Strategy
   - Audience definitions
   - Funnel stages
   - Ad messaging by stage

5. Performance Projections
   - Expected CTR by platform
   - Expected conversion rates
   - Projected trial signups
`;

  try {
    console.log('📋 Test Task:');
    console.log('   Build LinkedIn + Meta ads for HR software');
    console.log('   Target: 133 trials/month at $75 CPA with $10k budget\n');

    console.log('🤖 Spawning paid-social-manager agent...\n');

    const command = `npx claude-flow@alpha agent spawn --type paid-social-manager --task "${testTask}"`;

    console.log('💡 Command:');
    console.log(`   ${command}\n`);

    console.log('⏳ Running test...\n');
    console.log('Expected Output:');
    console.log('   ✓ Complete LinkedIn campaign structure');
    console.log('   ✓ Complete Meta campaign structure');
    console.log('   ✓ Targeting criteria (titles, industries)');
    console.log('   ✓ 3+ ad variations per format');
    console.log('   ✓ Creative recommendations');
    console.log('   ✓ Retargeting funnel strategy');
    console.log('   ✓ Budget allocation ($7k LI, $3k Meta)');
    console.log('   ✓ Performance projections\n');

    console.log('🎯 Test Scenario Success Criteria:');
    console.log('   ✓ LinkedIn targeting focuses on HR decision-makers');
    console.log('   ✓ Meta used primarily for retargeting');
    console.log('   ✓ Ad copy emphasizes "3x faster hiring"');
    console.log('   ✓ Projected trials meet 133/month goal');
    console.log('   ✓ Budget split aligns with platform intent\n');

    console.log('📊 Example LinkedIn Targeting:');
    console.log('   Job Titles:');
    console.log('     - HR Manager, Director of HR, VP HR');
    console.log('     - Talent Acquisition Manager');
    console.log('     - Recruiting Manager');
    console.log('   Industries:');
    console.log('     - Technology, SaaS, Healthcare, Finance');
    console.log('   Company Size:');
    console.log('     - 100-500, 501-1000 employees');
    console.log('   Seniority:');
    console.log('     - Manager, Director, VP level\n');

    console.log('📊 Example Retargeting Funnel:');
    console.log('   Stage 1 (Cold): Problem-aware');
    console.log('     → Ad: "Tired of sorting through 500 resumes?"');
    console.log('   Stage 2 (Warm): Solution-aware (visited website)');
    console.log('     → Ad: "See how TalentHub cuts hiring time by 67%"');
    console.log('   Stage 3 (Hot): Product-aware (viewed pricing)');
    console.log('     → Ad: "Start your free trial - no credit card"');
    console.log('   Stage 4 (Urgent): Cart abandoners');
    console.log('     → Ad: "You were 1 click away from faster hiring"\n');

    console.log('✅ Paid Social Manager test scenario prepared\n');
    console.log('💡 To run this test with real agent:');
    console.log('   Uncomment the execAsync line and run the script\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testPaidSocialManager();
