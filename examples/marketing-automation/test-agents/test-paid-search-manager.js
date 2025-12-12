#!/usr/bin/env node

/**
 * Test: Paid Search Manager Agent
 *
 * Tests the paid search manager with a Google Ads campaign task
 *
 * Usage: node examples/marketing-automation/test-agents/test-paid-search-manager.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testPaidSearchManager() {
  console.log('🧪 Testing: Paid Search Manager Agent\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  const testTask = `
Create a Google Ads Search campaign for a B2B SaaS CRM:

**Product:**
- Name: SalesPro CRM
- Target: Small B2B companies (10-100 employees)
- Price: $49/user/month
- Main benefit: Simple CRM, not bloated like Salesforce
- USP: Set up in 5 minutes, no training needed

**Campaign Goals:**
- Generate qualified demo requests
- Target CPA: $150
- Budget: $5,000/month
- Target: 33 demos/month

**Current Situation:**
- No existing Google Ads account
- Competitors: HubSpot, Salesforce, Pipedrive
- Landing page: exists (demo request form)

**Deliverables:**
1. Campaign structure (campaigns, ad groups, keywords)
2. Keyword list with match types (minimum 50 keywords)
3. Negative keyword list (20+)
4. 3 Responsive Search Ads (RSAs) with all headlines/descriptions
5. Ad extension recommendations (sitelinks, callouts, structured snippets)
6. Bid strategy recommendation
7. Audience targeting suggestions
8. Conversion tracking setup requirements
9. First 30-day optimization plan

**Provide:**
- Expected CTR range
- Expected conversion rate
- Projected demo volume at $5k budget
`;

  try {
    console.log('📋 Test Task:');
    console.log('   Build Google Ads campaign for B2B SaaS CRM');
    console.log('   Target: 33 demos/month at $150 CPA with $5k budget\n');

    console.log('🤖 Spawning paid-search-manager agent...\n');

    const command = `npx claude-flow@alpha agent spawn --type paid-search-manager --task "${testTask}"`;

    console.log('💡 Command:');
    console.log(`   ${command}\n`);

    console.log('⏳ Running test...\n');
    console.log('Expected Output:');
    console.log('   ✓ Complete campaign structure');
    console.log('   ✓ 50+ keywords with match types');
    console.log('   ✓ 20+ negative keywords');
    console.log('   ✓ 3 RSAs (15 headlines, 4 descriptions each)');
    console.log('   ✓ All ad extensions');
    console.log('   ✓ Bid strategy (Target CPA)');
    console.log('   ✓ Audience recommendations');
    console.log('   ✓ Conversion tracking plan');
    console.log('   ✓ 30-day optimization roadmap\n');

    console.log('🎯 Test Scenario Success Criteria:');
    console.log('   ✓ Keywords align with "simple CRM" positioning');
    console.log('   ✓ Negative keywords block unqualified searches');
    console.log('   ✓ RSAs highlight 5-minute setup USP');
    console.log('   ✓ Projected demos meet 33/month goal');
    console.log('   ✓ Budget allocation is realistic\n');

    console.log('📊 Example Campaign Structure:');
    console.log('   Campaign 1: Brand - SalesPro CRM');
    console.log('     Ad Group: SalesPro Branded (Exact match)');
    console.log('   Campaign 2: Generic - CRM Software');
    console.log('     Ad Group 1: Simple CRM (Phrase, BMM)');
    console.log('     Ad Group 2: Small Business CRM');
    console.log('     Ad Group 3: Easy CRM Setup');
    console.log('   Campaign 3: Competitor - Alternative to [Competitor]');
    console.log('     Ad Group 1: Salesforce Alternative');
    console.log('     Ad Group 2: HubSpot Alternative\n');

    console.log('📊 Example RSA Headlines:');
    console.log('   H1: Simple CRM for Small Business');
    console.log('   H2: Set Up in 5 Minutes');
    console.log('   H3: No Training Required');
    console.log('   H4: $49/User/Month - No Contracts');
    console.log('   H5: Better Than Salesforce for SMBs\n');

    console.log('✅ Paid Search Manager test scenario prepared\n');
    console.log('💡 To run this test with real agent:');
    console.log('   Uncomment the execAsync line and run the script\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testPaidSearchManager();
