# MarketingScan AI - Quick Start Guide ⚡

Get up and running with MarketingScan AI in 5 minutes!

## 🎯 What You've Got

You now have a complete **8-agent hierarchical swarm** configured to perform comprehensive marketing audits. Here's what was built:

### ✅ Phase 1 Complete: Agent System

1. **8 Specialized Agents** configured in `marketing-audit-agents.json`:
   - Customer Insights Analyst (Stage 1)
   - SEO Optimizer (Stage 2)
   - CRO Specialist (Stage 2)
   - Content Strategist (Stage 2)
   - Paid Search Manager (Stage 3)
   - Paid Social Manager (Stage 3)
   - Brand Strategist (Stage 3)
   - Analytics Specialist (Stage 4)

2. **Workflow Orchestration** in `audit-orchestration.json`:
   - 4-stage execution pipeline
   - Parallel execution in Stages 2 & 3
   - ~45 minute total execution time

3. **Orchestration Scripts**:
   - `run-audit.js` - Main audit runner
   - `test-audit.js` - Testing suite with 5 sample websites
   - `schema-validator.js` - Output validation

4. **Comprehensive Documentation**:
   - `AGENT_GUIDE.md` - Agent behavior & customization
   - `ARCHITECTURE.md` - Technical architecture
   - `README.md` - Project overview

---

## 🚀 Run Your First Audit

### Step 1: Install Dependencies

```bash
cd marketingscan-ai/backend/claude-flow/scripts
npm install
```

### Step 2: Set Environment Variables

```bash
# Add to your shell profile or .env file
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

### Step 3: Run a Test Audit

```bash
# Test with Anthropic's website
npm run audit -- \
  --url "https://www.anthropic.com" \
  --industry "AI/Technology" \
  --goals "Increase enterprise adoption of Claude AI" \
  --email "your-email@example.com"
```

This will:
1. ✅ Initialize the swarm session
2. ✅ Execute Stage 1 (Customer Insights) - 5 min
3. ✅ Execute Stage 2 in parallel (SEO, CRO, Content) - 8 min
4. ✅ Execute Stage 3 in parallel (Paid Search, Social, Brand) - 6 min
5. ✅ Execute Stage 4 (Analytics synthesis) - 7 min
6. ✅ Generate final report JSON

---

## 🧪 Run the Full Test Suite

Test all 5 sample websites at once:

```bash
npm test
```

This tests:
- Anthropic (AI/Technology)
- Shopify (E-commerce SaaS)
- HubSpot (Marketing SaaS)
- Small Business (Local Services)
- Leander Inc (AI Agency)

---

## 📊 Understanding the Output

Each audit generates structured JSON files:

```
outputs/
└── marketing-audit-2024-01-15T10-30-00/
    ├── audience-analysis.json       # Stage 1 output
    ├── seo-audit.json               # Stage 2 output
    ├── cro-audit.json               # Stage 2 output
    ├── content-audit.json           # Stage 2 output
    ├── paid-search-audit.json       # Stage 3 output
    ├── paid-social-audit.json       # Stage 3 output
    ├── brand-audit.json             # Stage 3 output
    ├── final-report.json            # Stage 4 output
    ├── executive-summary.json       # Stage 4 output
    └── complete-audit.json          # Consolidated report
```

### Example Output Structure

```json
{
  "agentName": "seo-optimizer",
  "score": 72,
  "summary": "Your technical SEO is solid with good Core Web Vitals (85/100), but on-page optimization needs work with missing meta descriptions on 40% of pages. Keyword opportunities exist in the mid-funnel space with 25 high-value keywords ranked 11-20.",
  "findings": [
    {
      "category": "Technical SEO",
      "issue": "Missing XML sitemap",
      "severity": "high",
      "impact": "Search engines may not discover all pages, reducing organic visibility"
    }
  ],
  "recommendations": [
    {
      "action": "Generate and submit XML sitemap to Google Search Console",
      "priority": "quick-win",
      "effort": "low",
      "cost": "$0-500",
      "estimatedImpact": "10-15% increase in indexed pages"
    }
  ],
  "metrics": {
    "currentState": {
      "organicTraffic": 5000,
      "keywordRankings": 120,
      "DA": 35
    },
    "potentialState": {
      "organicTraffic": 8000,
      "keywordRankings": 180,
      "DA": 45
    },
    "gap": {
      "trafficIncrease": "60%",
      "rankingImprovement": 60
    }
  }
}
```

---

## 🔍 Validate Outputs

Check that agent outputs meet the schema requirements:

```bash
# Validate a single output
node schema-validator.js ../../../outputs/marketing-audit-*/seo-audit.json

# Validate all outputs in a session
npm run validate:dir -- ../../../outputs/marketing-audit-2024-01-15T10-30-00
```

Expected output:
```
✅ seo-audit.json
✅ cro-audit.json
✅ content-audit.json
✅ paid-search-audit.json
✅ paid-social-audit.json
✅ brand-audit.json
✅ final-report.json

📊 Summary: 7 valid, 0 invalid
```

---

## 🎨 Customize Agent Behavior

### 1. Adjust Agent Prompts

Edit `backend/claude-flow/agents/marketing-audit-agents.json`:

```json
{
  "id": "seo-optimizer",
  "prompt": "You are an SEO Optimizer... [your custom instructions]"
}
```

### 2. Change Scoring Weights

Edit the `analytics-specialist` agent prompt:

```
Weighted scoring: SEO: 25%, CRO: 20%, Content: 15%, ... (custom)
```

### 3. Modify Execution Duration

Edit `backend/claude-flow/workflows/audit-orchestration.json`:

```json
{
  "id": "stage-2-channel-analysis",
  "duration": "10 minutes",  // Increase for more thorough analysis
  "maxConcurrentAgents": 3
}
```

---

## 🐛 Troubleshooting

### "Missing ANTHROPIC_API_KEY"

```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

### "Agent execution failed"

1. Check agent configuration syntax in `marketing-audit-agents.json`
2. Verify input data is valid (URL, industry, goals, email)
3. Review error logs in console output

### "Execution time exceeds 45 minutes"

1. Currently uses **mock outputs** for testing (instant)
2. Real API calls will take the full ~45 minutes
3. Adjust `maxTokens` in agent configs to optimize

### "Invalid output schema"

```bash
npm run validate:dir -- ../../../outputs/<session-id>
```

This will show which fields are missing or invalid.

---

## 📚 Next Steps

### Phase 2: Frontend & Backend
- [ ] Build Next.js frontend with Tailwind CSS
- [ ] Create AuditForm, PaymentForm, ThankYou components
- [ ] Set up Supabase backend
- [ ] Integrate Stripe payments
- [ ] Create database migrations

### Phase 3: PDF Generation
- [ ] Design markdown report template
- [ ] Implement Puppeteer PDF generation
- [ ] Create email delivery system
- [ ] Add custom branding options

### Phase 4: Automation
- [ ] Build n8n workflow for email delivery
- [ ] Integrate with CRM (optional)
- [ ] Add analytics tracking
- [ ] Set up monitoring & alerts

### Phase 5: Production Launch
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Supabase
- [ ] Configure custom domain
- [ ] Set up SSL certificates
- [ ] Launch marketing site

---

## 🎯 Testing Checklist

Before moving to Phase 2, verify:

- [x] ✅ All 8 agents configured
- [x] ✅ Workflow orchestration created
- [x] ✅ Scripts are executable
- [x] ✅ Documentation complete
- [ ] ⏳ Single audit completes successfully (needs real API)
- [ ] ⏳ All 5 test websites pass validation (needs real API)
- [ ] ⏳ Total execution time < 45 minutes (needs real API)
- [ ] ⏳ Output schemas validate correctly (needs real API)

---

## 📖 Documentation

- **[AGENT_GUIDE.md](./docs/AGENT_GUIDE.md)** - Agent details, scoring, examples
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture, APIs, deployment
- **[README.md](./README.md)** - Project overview & setup

---

## 🆘 Quick Reference

```bash
# Run a single audit
npm run audit -- --url "URL" --industry "Industry" --goals "Goals" --email "email"

# Test all 5 websites
npm test

# Test specific website (1-5)
npm run test:single -- --website 3

# Validate outputs
npm run validate:dir -- ../../../outputs/<session-id>

# View agent configurations
cat ../agents/marketing-audit-agents.json | jq '.agents[] | {id, name, stage, duration}'

# View workflow stages
cat ../workflows/audit-orchestration.json | jq '.workflow.stages[] | {id, name, duration, agents}'
```

---

**Ready to run your first audit?** 🚀

```bash
npm run audit -- \
  --url "https://www.your-website.com" \
  --industry "Your Industry" \
  --goals "Your Business Goals" \
  --email "your-email@example.com"
```

---

**Built with ❤️ by Leander Inc using Claude Flow**
