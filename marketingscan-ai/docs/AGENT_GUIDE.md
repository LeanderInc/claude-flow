# MarketingScan AI - Agent Guide

## Overview

MarketingScan AI uses a hierarchical swarm of 8 specialized agents to perform comprehensive marketing audits. This guide explains what each agent analyzes, how scores are calculated, and provides example outputs.

## Agent Architecture

```
Stage 1 (5 min)
└── Customer Insights Analyst

Stage 2 (8 min - Parallel)
├── SEO Optimizer
├── CRO Specialist
└── Content Strategist

Stage 3 (6 min - Parallel)
├── Paid Search Manager
├── Paid Social Manager
└── Brand Strategist

Stage 4 (7 min)
└── Analytics Specialist (synthesizes all)
```

**Total Execution Time:** ~45 minutes

---

## Stage 1: Foundation Analysis

### 1. Customer Insights Analyst

**Type:** `researcher`
**Duration:** 5 minutes
**Output:** `audience-analysis.json`

#### What It Analyzes

1. **Target Audience**
   - Primary customer segments (demographics, psychographics)
   - Customer pain points and needs
   - Buyer journey stages
   - Decision-making factors

2. **Competitive Landscape**
   - Top 5 direct competitors
   - Competitor positioning and messaging
   - Market gaps and opportunities
   - Competitive advantages/disadvantages

3. **Market Position**
   - Current brand perception
   - Market share estimation
   - Industry trends
   - Unique value proposition clarity

#### Scoring Methodology

The agent provides a qualitative assessment (0-100) based on:
- **Audience Clarity (30%):** How well-defined the target audience is
- **Competitive Positioning (40%):** Strength of competitive differentiation
- **Market Opportunity (30%):** Size and accessibility of market opportunities

#### Example Output

```json
{
  "agentName": "customer-insights-analyst",
  "score": 72,
  "summary": "The company has a well-defined target audience in the B2B SaaS space with clear pain points around workflow automation. However, competitive differentiation is weak with 5 major competitors offering similar features. Market opportunities exist in the mid-market segment.",
  "targetAudience": {
    "primarySegments": [
      {
        "segment": "Mid-market B2B SaaS companies",
        "size": "~50,000 potential customers",
        "characteristics": ["50-500 employees", "Tech-savvy", "Growth-focused"]
      }
    ],
    "painPoints": ["Manual workflows", "Data silos", "Scaling challenges"],
    "buyerJourney": {
      "awareness": ["Google search", "Industry blogs", "Social media"],
      "consideration": ["Product demos", "Case studies", "Free trials"],
      "decision": ["ROI calculator", "Implementation support", "Security audit"]
    }
  },
  "competitors": [
    {
      "name": "Competitor A",
      "url": "https://competitor-a.com",
      "strengths": ["Market leader", "Strong brand", "Enterprise features"],
      "weaknesses": ["High pricing", "Complex setup", "Poor support"],
      "positioning": "Enterprise-focused automation platform"
    }
  ],
  "findings": [
    {
      "category": "Target Audience",
      "issue": "Limited audience segmentation on website",
      "severity": "medium",
      "impact": "Missing opportunities to connect with specific buyer personas"
    }
  ],
  "recommendations": [
    {
      "action": "Create persona-specific landing pages for each market segment",
      "priority": "short-term",
      "effort": "medium",
      "cost": "$2000-5000",
      "estimatedImpact": "20-30% increase in qualified leads"
    }
  ]
}
```

---

## Stage 2: Channel Analysis (Parallel)

### 2. SEO Optimizer

**Type:** `code-analyzer`
**Duration:** 8 minutes
**Output:** `seo-audit.json`

#### What It Analyzes

1. **Technical SEO**
   - Site speed and Core Web Vitals
   - Mobile responsiveness
   - XML sitemap and robots.txt
   - HTTPS and security
   - Structured data/schema markup
   - Crawlability issues

2. **On-Page SEO**
   - Title tags and meta descriptions
   - Header tag hierarchy (H1-H6)
   - URL structure
   - Internal linking
   - Image optimization
   - Content quality and keyword usage

3. **Keyword Strategy**
   - Current keyword rankings
   - Keyword opportunities (gaps)
   - Search intent alignment
   - Competitor keyword analysis

4. **Backlink Profile**
   - Domain authority
   - Quality of backlinks
   - Toxic links
   - Link building opportunities

#### Scoring Methodology

- **Technical SEO (35%):** Core Web Vitals, mobile, crawlability
- **On-Page SEO (30%):** Content optimization, structure
- **Keywords (20%):** Ranking keywords, opportunities
- **Backlinks (15%):** Domain authority, link quality

Score ranges:
- **90-100:** Excellent SEO implementation
- **70-89:** Good SEO with room for improvement
- **50-69:** Average SEO needing significant work
- **Below 50:** Poor SEO requiring immediate attention

### 3. CRO Specialist

**Type:** `analyst`
**Duration:** 7 minutes
**Output:** `cro-audit.json`

#### What It Analyzes

1. **Conversion Funnel**
   - Landing page effectiveness
   - Call-to-action clarity and placement
   - Form optimization
   - Checkout process (if e-commerce)
   - Lead capture mechanisms

2. **User Experience**
   - Navigation clarity
   - Page load times
   - Mobile UX
   - Trust signals
   - Value proposition clarity
   - Friction points

3. **Persuasion Elements**
   - Social proof usage
   - Urgency/scarcity tactics
   - Risk reversal (guarantees)
   - Personalization opportunities

4. **A/B Test Opportunities**
   - High-impact test ideas
   - Prioritized hypothesis list

#### Scoring Methodology

- **Conversion Funnel (40%):** Landing pages, CTAs, forms
- **User Experience (35%):** Navigation, UX, friction points
- **Persuasion Elements (25%):** Social proof, urgency, risk reversal

### 4. Content Strategist

**Type:** `researcher`
**Duration:** 6 minutes
**Output:** `content-audit.json`

#### What It Analyzes

1. **Content Inventory**
   - Types of content (blog, video, etc.)
   - Content volume and frequency
   - Topic coverage
   - Content age and freshness

2. **Content Quality**
   - Writing quality and readability
   - SEO optimization
   - Visual elements
   - Brand voice consistency

3. **Content Gaps**
   - Missing topics for target audience
   - Competitor content advantages
   - Buyer journey gaps (TOFU, MOFU, BOFU)
   - Format gaps (missing video, podcasts, etc.)

4. **Content Strategy**
   - Content pillars identification
   - Editorial calendar recommendations
   - Repurposing opportunities

#### Scoring Methodology

- **Content Quality (40%):** Writing, SEO, visuals
- **Content Coverage (35%):** Topic breadth, buyer journey
- **Content Strategy (25%):** Planning, consistency, repurposing

---

## Stage 3: Paid Media & Brand (Parallel)

### 5. Paid Search Manager

**Type:** `analyst`
**Duration:** 6 minutes
**Output:** `paid-search-audit.json`

#### What It Analyzes

1. **Search Ad Opportunities**
   - High-intent keywords for paid search
   - Competitor ad analysis
   - Ad copy best practices
   - Landing page alignment

2. **Campaign Structure**
   - Campaign recommendations
   - Ad group organization
   - Keyword match types
   - Negative keyword strategy

3. **Budget & Bidding**
   - Estimated budget recommendations
   - Bidding strategy suggestions
   - Expected CPC ranges
   - ROI projections

4. **Ad Extensions & Features**
   - Sitelink, call, location extensions
   - Callout extensions
   - Structured snippets

### 6. Paid Social Manager

**Type:** `analyst`
**Duration:** 6 minutes
**Output:** `paid-social-audit.json`

#### What It Analyzes

1. **Platform Recommendations**
   - Best platforms for target audience (Meta, LinkedIn, TikTok, etc.)
   - Platform-specific strategies
   - Creative format recommendations

2. **Audience Targeting**
   - Detailed audience personas per platform
   - Interest and behavior targeting
   - Lookalike audience opportunities
   - Retargeting strategies

3. **Ad Creative Strategy**
   - Creative format recommendations
   - Messaging strategy
   - Visual style guidelines
   - A/B testing opportunities

4. **Budget & Performance**
   - Platform budget allocation
   - Expected CPM, CPC, CPA by platform
   - Conversion tracking setup
   - ROI projections

### 7. Brand Strategist

**Type:** `researcher`
**Duration:** 5 minutes
**Output:** `brand-audit.json`

#### What It Analyzes

1. **Brand Positioning**
   - Unique value proposition clarity
   - Differentiation from competitors
   - Brand personality
   - Positioning statement

2. **Messaging Architecture**
   - Core brand message
   - Supporting messages
   - Tone of voice
   - Messaging consistency

3. **Visual Identity**
   - Logo effectiveness
   - Color palette consistency
   - Typography
   - Imagery style

4. **Brand Experience**
   - Website brand alignment
   - Social media presence
   - Customer touchpoint consistency
   - Brand trust signals

---

## Stage 4: Synthesis

### 8. Analytics Specialist

**Type:** `analyst`
**Duration:** 7 minutes
**Output:** `final-report.json`, `executive-summary.json`

#### What It Analyzes

1. **Overall Marketing Score (0-100)**
   - Weighted scoring across all 7 audit areas
   - SEO: 20%, CRO: 15%, Content: 15%, Paid Search: 15%, Paid Social: 15%, Brand: 15%, Audience: 5%

2. **Critical Issues**
   - Top 10 most critical issues (severity = high)
   - Grouped by category
   - Estimated business impact

3. **Recommendation Prioritization**
   - **Quick Wins:** Low effort, high impact, <30 days
   - **Short-Term:** Medium effort, high impact, 1-3 months
   - **Long-Term:** High effort, high impact, 3-6 months

4. **Executive Summary**
   - 2-paragraph overview
   - Key findings (5 bullet points)
   - Primary recommendations (5 bullet points)
   - Estimated ROI potential

5. **Metrics Dashboard**
   - Current state baseline
   - Potential state after implementation
   - Gap analysis
   - Prioritized KPIs to track

#### Overall Score Calculation

```javascript
overallScore = (
  seoScore * 0.20 +
  croScore * 0.15 +
  contentScore * 0.15 +
  paidSearchScore * 0.15 +
  paidSocialScore * 0.15 +
  brandScore * 0.15 +
  audienceScore * 0.05
)
```

#### Example Executive Summary

```json
{
  "executiveSummary": {
    "overview": "Your marketing foundation is solid with a 72/100 overall score. The primary strengths lie in brand positioning and content strategy, while significant opportunities exist in technical SEO and conversion optimization. Implementing the recommended quick wins could increase qualified leads by 30-40% within 60 days.",
    "keyFindings": [
      "Technical SEO issues are causing 40% of potential organic traffic loss",
      "Conversion rate (1.2%) is 60% below industry average (3.0%)",
      "Content strategy is strong but underutilized for lead generation",
      "Paid search presents untapped opportunity with high-intent keywords",
      "Brand positioning is clear but inconsistently communicated across channels"
    ],
    "primaryRecommendations": [
      "Fix technical SEO issues (site speed, mobile optimization) - 30 days",
      "Implement conversion rate optimization on key landing pages - 45 days",
      "Launch targeted Google Ads campaign for high-intent keywords - 15 days",
      "Create persona-specific content pillars and publishing calendar - 60 days",
      "Standardize brand messaging across all customer touchpoints - 90 days"
    ],
    "estimatedROIPotential": "35-50% increase in marketing-generated revenue within 6 months"
  }
}
```

---

## Customizing Agent Behavior

### Adjusting Agent Configuration

Edit `/backend/claude-flow/agents/marketing-audit-agents.json`:

```json
{
  "id": "seo-optimizer",
  "config": {
    "temperature": 0.5,  // Lower = more focused, higher = more creative
    "maxTokens": 4000,   // Increase for more detailed analysis
    "tools": ["web_scrape", "seo_analysis", "lighthouse_audit"]
  }
}
```

### Adding Custom Validation

Edit `schema-validator.js` to add custom validation rules:

```javascript
const CUSTOM_VALIDATION = {
  'seo-optimizer': (output) => {
    // Custom validation logic
    if (output.technicalSEO.siteSpeed.score < 50) {
      return ['Site speed score too low, requires immediate attention'];
    }
    return [];
  }
};
```

### Modifying Scoring Weights

Edit the `analytics-specialist` prompt to adjust scoring weights:

```
SEO: 25%, CRO: 20%, Content: 15%, ... (custom weights)
```

---

## Best Practices

1. **Agent Independence:** Each agent should analyze independently without requiring outputs from parallel agents
2. **Structured Output:** Always return valid JSON matching the expected schema
3. **Actionable Recommendations:** Recommendations should be specific, measurable, and implementable
4. **Score Consistency:** Scores should be relative to industry benchmarks when possible
5. **Context Awareness:** Use provided context (industry, goals, audience) to tailor analysis

---

## Troubleshooting

### Agent Fails to Complete

1. Check agent configuration in `marketing-audit-agents.json`
2. Verify input data is properly formatted
3. Check memory/context availability
4. Review hooks execution logs

### Invalid Output Schema

1. Run schema validator: `node schema-validator.js <output-file>`
2. Check required fields are present
3. Verify score is 0-100
4. Ensure arrays (findings, recommendations) are not empty

### Execution Time Exceeds 45 Minutes

1. Reduce `maxTokens` in agent configs
2. Simplify agent prompts
3. Increase `maxConcurrentAgents` in workflow config
4. Check for network/API delays

---

## Next Steps

- **Phase 2:** Frontend UI and payment integration
- **Phase 3:** PDF report generation
- **Phase 4:** n8n workflow automation
- **Phase 5:** Production deployment

For technical architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
