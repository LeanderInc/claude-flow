# Agent Testing Guide - Claude Flow Marketing Automation

Complete guide for testing all 13 marketing agents individually and in swarms.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Testing Philosophy](#testing-philosophy)
3. [Individual Agent Tests](#individual-agent-tests)
4. [Micro-Swarm Tests](#micro-swarm-tests)
5. [Medium-Swarm Tests](#medium-swarm-tests)
6. [Full-Swarm Tests](#full-swarm-tests)
7. [Testing Roadmap](#testing-roadmap)
8. [Evaluation Criteria](#evaluation-criteria)

---

## Overview

This guide walks you through testing the 13 marketing agents from individual capabilities to full multi-agent swarm coordination.

### The 13 Agents

**Original 7 Agents:**
1. Content Strategist
2. Copywriter
3. Social Media Manager
4. Email Automation Specialist
5. Analytics Specialist
6. SEO Optimizer
7. Editor

**New 6 Agents:**
8. Conversion Rate Optimizer
9. Brand Strategist
10. Creative Director
11. Paid Search Manager
12. Paid Social Manager
13. Customer Insights Analyst

---

## Testing Philosophy

### Progressive Testing Approach

```
Individual (1 agent) → Micro (3 agents) → Medium (6 agents) → Full (13 agents)
```

**Why this approach?**
- Validates each agent works independently
- Tests coordination in small teams first
- Scales complexity gradually
- Identifies integration issues early

### Test Levels

| Level | Agents | Purpose | Duration |
|-------|--------|---------|----------|
| **Individual** | 1 | Validate core capabilities | 5-10 min |
| **Micro** | 3 | Test basic coordination | 15-20 min |
| **Medium** | 6 | Test multi-stage workflows | 30-45 min |
| **Full** | 13 | Test complete campaigns | 60-90 min |

---

## Individual Agent Tests

Located in: `examples/marketing-automation/test-agents/`

### Test 1: Conversion Rate Optimizer

**File:** `test-cro-specialist.js`

**Scenario:**
- Analyze SaaS landing page with 1.2% conversion rate
- Provide prioritized A/B test recommendations
- Form optimization (8 fields → reduce)
- Mobile improvements (55% traffic)

**Expected Output:**
- ✓ 5 high-impact A/B tests (prioritized)
- ✓ Form field reduction strategy
- ✓ Mobile-specific optimizations
- ✓ Trust signal recommendations
- ✓ Projected conversion lift

**Run:**
```bash
node examples/marketing-automation/test-agents/test-cro-specialist.js
```

**Success Criteria:**
- [ ] Recommendations prioritized by impact
- [ ] Specific, actionable tests
- [ ] Expected conversion lift percentages
- [ ] Mobile-first approach evident

---

### Test 2: Brand Strategist

**File:** `test-brand-strategist.js`

**Scenario:**
- Develop brand strategy for AI email marketing startup
- Competitors: Mailchimp, HubSpot
- Target: Small businesses (10-100 employees)

**Expected Output:**
- ✓ Brand positioning statement
- ✓ Voice/tone guidelines with examples
- ✓ 3 brand pillars
- ✓ 5 personality traits
- ✓ 3 tagline variations
- ✓ Messaging framework

**Run:**
```bash
node examples/marketing-automation/test-agents/test-brand-strategist.js
```

**Success Criteria:**
- [ ] Clear differentiation from competitors
- [ ] Voice guidelines are actionable
- [ ] Brand pillars align with audience pains
- [ ] Taglines are memorable

---

### Test 3: Creative Director

**File:** `test-creative-director.js`

**Scenario:**
- Create TikTok video campaign for productivity app
- Target: Gen Z/Millennials
- Goal: 1M impressions, app downloads

**Expected Output:**
- ✓ 3 video concepts (15-30 seconds)
- ✓ Shot-by-shot storyboards
- ✓ Visual style guide
- ✓ Music/sound recommendations
- ✓ Hook scripts (first 3 seconds)
- ✓ UGC creator brief

**Run:**
```bash
node examples/marketing-automation/test-agents/test-creative-director.js
```

**Success Criteria:**
- [ ] Concepts are TikTok-native
- [ ] Hooks grab attention <3 seconds
- [ ] Before/after transformation clear
- [ ] UGC brief is actionable

---

### Test 4: Paid Search Manager

**File:** `test-paid-search-manager.js`

**Scenario:**
- Build Google Ads campaign for B2B SaaS CRM
- Budget: $5,000/month
- Target: 33 demos/month at $150 CPA

**Expected Output:**
- ✓ Complete campaign structure
- ✓ 50+ keywords with match types
- ✓ 20+ negative keywords
- ✓ 3 RSAs (full headlines/descriptions)
- ✓ Ad extensions
- ✓ Bid strategy
- ✓ 30-day optimization plan

**Run:**
```bash
node examples/marketing-automation/test-agents/test-paid-search-manager.js
```

**Success Criteria:**
- [ ] Keywords align with positioning
- [ ] Negative keywords block waste
- [ ] RSAs highlight USPs
- [ ] Projected demos meet goal

---

### Test 5: Paid Social Manager

**File:** `test-paid-social-manager.js`

**Scenario:**
- LinkedIn + Meta ads for HR software
- Budget: $10,000/month ($7k LinkedIn, $3k Meta)
- Target: 133 trials/month at $75 CPA

**Expected Output:**
- ✓ LinkedIn campaign structure
- ✓ Meta campaign structure
- ✓ Targeting criteria
- ✓ 3+ ad variations per format
- ✓ Retargeting funnel
- ✓ Performance projections

**Run:**
```bash
node examples/marketing-automation/test-agents/test-paid-social-manager.js
```

**Success Criteria:**
- [ ] LinkedIn targets decision-makers
- [ ] Meta used for retargeting
- [ ] Ad copy emphasizes key benefit
- [ ] Projected trials meet goal

---

### Test 6: Customer Insights Analyst

**File:** `test-customer-insights-analyst.js`

**Scenario:**
- Conduct VOC research for project management tool
- Analyze: Reddit, G2/Capterra reviews (competitors)
- Synthesize pain points, personas, JTBD

**Expected Output:**
- ✓ Top 10 pain points (with quotes)
- ✓ Jobs-to-be-Done analysis
- ✓ Feature gaps
- ✓ 3 customer personas
- ✓ VOC phrase library
- ✓ Content recommendations

**Run:**
```bash
node examples/marketing-automation/test-agents/test-customer-insights-analyst.js
```

**Success Criteria:**
- [ ] Pain points include real quotes
- [ ] JTBD identifies switching triggers
- [ ] Personas are specific
- [ ] VOC phrases use customer language

---

## Micro-Swarm Tests

Located in: `examples/marketing-automation/micro-swarms/`

### Micro Test 1: Content Team (3 agents)

**File:** `micro-content-team.js`

**Agents:**
- Content Strategist
- Copywriter
- Editor

**Scenario:**
- Create 1500-word blog post
- Topic: "ROI of AI Marketing Automation"
- Target: B2B SaaS companies

**Workflow:**
1. Strategy → Outline & SEO
2. Writing → Draft blog post
3. Editing → Polish & brand voice

**Run:**
```bash
node examples/marketing-automation/micro-swarms/micro-content-team.js
```

**Success Criteria:**
- [ ] Outline includes SEO keywords
- [ ] Blog matches word count
- [ ] Final version is polished
- [ ] Agents share context via memory

---

### Micro Test 2: Paid Ads Team (3 agents)

**File:** `micro-paid-ads-team.js`

**Agents:**
- Paid Search Manager
- CRO Specialist
- Analytics Specialist

**Scenario:**
- Launch Google Ads campaign
- Product: AI Email Assistant
- Budget: $3,000/month, Target: 60 trials

**Workflow:**
1. Paid Search → Campaign structure
2. CRO → Landing page optimization
3. Analytics → Tracking setup

**Run:**
```bash
node examples/marketing-automation/micro-swarms/micro-paid-ads-team.js
```

**Success Criteria:**
- [ ] Campaign structure complete
- [ ] CRO tests prioritized
- [ ] Tracking properly configured
- [ ] Projected performance realistic

---

### Micro Test 3: Brand Team (3 agents)

**File:** `micro-brand-team.js`

**Agents:**
- Brand Strategist
- Creative Director
- Copywriter

**Scenario:**
- Develop brand for AI social media tool
- Stage: Pre-launch startup
- Target: Solopreneurs

**Workflow:**
1. Brand Strategy → Positioning, voice
2. Creative Direction → Visual identity (parallel)
3. Copywriting → Website messaging (parallel)

**Run:**
```bash
node examples/marketing-automation/micro-swarms/micro-brand-team.js
```

**Success Criteria:**
- [ ] Brand positioning clear
- [ ] Visual direction specific
- [ ] Website copy aligned
- [ ] Parallel execution works

---

## Medium-Swarm Tests

Located in: `examples/marketing-automation/medium-swarms/`

### Medium Test 1: Product Launch (6 agents)

**File:** `medium-product-launch.js`

**Agents:**
- Brand Strategist
- Creative Director
- Content Strategist
- Social Media Manager
- Email Automation Specialist
- Analytics Specialist

**Scenario:**
- Launch "CodeReview AI"
- Target: 500 signups, 50 paid conversions
- Channels: Website, Email, Social, ProductHunt

**Workflow:**
1. Strategy & Brand (parallel)
2. Creative & Content (parallel)
3. Distribution (parallel)

**Run:**
```bash
node examples/marketing-automation/medium-swarms/medium-product-launch.js
```

**Success Criteria:**
- [ ] All 6 agents coordinate
- [ ] Deliverables for each channel
- [ ] Timeline is realistic
- [ ] Memory shared effectively

---

### Medium Test 2: Performance Marketing (6 agents)

**File:** `medium-performance-marketing.js`

**Agents:**
- Paid Search Manager
- Paid Social Manager
- CRO Specialist
- Copywriter
- Creative Director
- Analytics Specialist

**Scenario:**
- Full paid acquisition campaign
- Product: InvoiceFlow SaaS
- Budget: $15,000/month
- Target: 125 trials, 25 paid

**Workflow:**
1. Campaign Setup (parallel: search + social)
2. Creative & Copy (parallel)
3. Optimization & Analytics (parallel)

**Run:**
```bash
node examples/marketing-automation/medium-swarms/medium-performance-marketing.js
```

**Success Criteria:**
- [ ] Multi-channel coordination
- [ ] Budget allocated properly
- [ ] Creative aligned across channels
- [ ] Performance projections realistic

---

## Full-Swarm Tests

### Full Test 1: Updated Social Media Blitz (9 agents)

**File:** `03-social-media-blitz.js` (updated)

**Agents:**
- Content Strategist
- Brand Strategist
- Creative Director
- Social Media Managers (4)
- Analytics Specialist

**Scenario:**
- Multi-platform campaign (LinkedIn, Twitter, Instagram, Facebook)
- 32 total posts
- Mesh topology (parallel)

**Run:**
```bash
node examples/marketing-automation/03-social-media-blitz.js
```

**Success Criteria:**
- [ ] 9 agents coordinate effectively
- [ ] Brand consistency across platforms
- [ ] Creative direction followed
- [ ] Mesh topology performs well

---

### Full Test 2: Integrated Launch (13 agents)

**Workflow:** `integrated-launch-campaign` (swarm-config.json)

**All 13 Agents:**
- Research: Customer Insights Analyst
- Strategy: Brand Strategist
- Creative: Creative Director
- Content: Content Strategist, Copywriter, SEO Optimizer
- Quality: Editor
- Distribution: Social Media Manager, Email Automation Specialist
- Paid: Paid Search Manager, Paid Social Manager
- Optimization: CRO Specialist
- Analytics: Analytics Specialist

**Scenario:**
- Major product launch
- All channels coordinated
- Multi-stage workflow

**Run:**
```bash
npx claude-flow@alpha swarm init --workflow integrated-launch-campaign
# Then spawn agents according to workflow stages
```

**Success Criteria:**
- [ ] All 13 agents work together
- [ ] Stages execute in correct order
- [ ] Memory coordination works
- [ ] No bottlenecks or conflicts

---

## Testing Roadmap

### Phase 1: Individual Agents (Week 1)
```
Day 1-2: Test original 7 agents
Day 3-4: Test new 6 agents
Day 5:   Fix issues, refine prompts
```

### Phase 2: Micro-Swarms (Week 2)
```
Day 1: Content Team
Day 2: Paid Ads Team
Day 3: Brand Team
Day 4: Fix coordination issues
Day 5: Optimize memory usage
```

### Phase 3: Medium-Swarms (Week 3)
```
Day 1-2: Product Launch swarm
Day 3-4: Performance Marketing swarm
Day 5:   Optimize workflows
```

### Phase 4: Full-Swarms (Week 4)
```
Day 1-2: Updated Social Media Blitz
Day 3-4: Integrated Launch Campaign (all 13)
Day 5:   Final optimizations & documentation
```

---

## Evaluation Criteria

### Individual Agent Quality

**Output Quality (40 points)**
- [ ] Comprehensive (covers all requirements): 15 pts
- [ ] Actionable (specific, not vague): 15 pts
- [ ] Professional (proper formatting): 10 pts

**Domain Expertise (30 points)**
- [ ] Industry best practices applied: 15 pts
- [ ] Competitive awareness shown: 15 pts

**Usability (30 points)**
- [ ] Easy to implement recommendations: 15 pts
- [ ] Clear next steps provided: 15 pts

**Total:** 100 points per agent

---

### Swarm Coordination Quality

**Memory Sharing (25 points)**
- [ ] Context passed between agents: 10 pts
- [ ] No redundant work: 10 pts
- [ ] Proper scope usage: 5 pts

**Workflow Efficiency (25 points)**
- [ ] Parallel execution where possible: 10 pts
- [ ] Sequential order logical: 10 pts
- [ ] No bottlenecks: 5 pts

**Output Consistency (25 points)**
- [ ] Brand voice consistent: 10 pts
- [ ] Visual style aligned: 10 pts
- [ ] Messaging coherent: 5 pts

**Integration (25 points)**
- [ ] Deliverables connect properly: 10 pts
- [ ] No conflicting recommendations: 10 pts
- [ ] Ready for implementation: 5 pts

**Total:** 100 points per swarm

---

## Quick Start Testing

### Test Individual Agent
```bash
# Pick any agent test
node examples/marketing-automation/test-agents/test-cro-specialist.js
```

### Test Micro-Swarm
```bash
# Start small
node examples/marketing-automation/micro-swarms/micro-content-team.js
```

### Test Medium-Swarm
```bash
# Scale up
node examples/marketing-automation/medium-swarms/medium-product-launch.js
```

### Test Full-Swarm
```bash
# Go big
node examples/marketing-automation/03-social-media-blitz.js
```

---

## Troubleshooting

### Agent Not Responding
1. Check swarm status: `npx claude-flow@alpha swarm status`
2. Verify agent exists: `npx claude-flow@alpha agent list`
3. Check memory: `npx claude-flow@alpha memory usage`

### Poor Coordination
1. Check memory scope: `npx claude-flow@alpha memory list --scope [scope]`
2. Verify topology: Mesh for parallel, Hierarchical for sequential
3. Review agent sharing settings in `config/marketing/agents.json`

### Performance Issues
1. Run diagnostics: `npx claude-flow@alpha swarm metrics`
2. Reduce concurrent agents
3. Switch from mesh to hierarchical topology

---

## Next Steps

After testing all agents and swarms:

1. ✅ Document successful patterns
2. ✅ Create production workflows
3. ✅ Build custom agent templates
4. ✅ Integrate with actual marketing tools
5. ✅ Train team on swarm usage

---

**Ready to test!** Start with individual agents and work your way up to full swarms. 🚀
