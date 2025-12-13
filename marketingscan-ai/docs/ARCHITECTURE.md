# MarketingScan AI - Technical Architecture

## System Overview

MarketingScan AI is an AI-powered marketing audit SaaS platform that generates comprehensive 40-50 page PDF reports for businesses. The system uses a hierarchical swarm of 8 specialized AI agents orchestrated through Claude Flow.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
│  ┌──────────────┬──────────────┬─────────────────────────┐ │
│  │ AuditForm.tsx│PaymentForm.tsx│  ThankYou.tsx          │ │
│  └──────────────┴──────────────┴─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supabase Backend                           │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │ Edge Functions       │   Database (PostgreSQL)      │   │
│  │ - trigger-audit      │   - audits table             │   │
│  │ - generate-pdf       │   - customers table          │   │
│  │ - webhook-stripe     │   - payments table           │   │
│  └──────────────────────┴──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Claude Flow Agent Swarm                        │
│                                                             │
│  Stage 1 (5 min)                                           │
│  └─ Customer Insights Analyst                              │
│                                                             │
│  Stage 2 (8 min - Parallel)                                │
│  ├─ SEO Optimizer                                          │
│  ├─ CRO Specialist                                         │
│  └─ Content Strategist                                     │
│                                                             │
│  Stage 3 (6 min - Parallel)                                │
│  ├─ Paid Search Manager                                    │
│  ├─ Paid Social Manager                                    │
│  └─ Brand Strategist                                       │
│                                                             │
│  Stage 4 (7 min)                                           │
│  └─ Analytics Specialist (Synthesis)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   n8n Workflow Automation                   │
│  - Email notification with PDF report                       │
│  - CRM integration (optional)                               │
│  - Analytics tracking                                       │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Payments:** Stripe Elements
- **Hosting:** Vercel

### Backend
- **Platform:** Supabase
- **Database:** PostgreSQL
- **Auth:** Supabase Auth (email/password)
- **Storage:** Supabase Storage (for PDFs)
- **Edge Functions:** Deno runtime

### AI Orchestration
- **Framework:** Claude Flow (v2.0.0+)
- **LLM:** Claude 3.5 Sonnet (Anthropic)
- **Agent Pattern:** Hierarchical swarm with parallel execution
- **Memory:** Claude Flow memory management
- **Hooks:** Pre/post task automation

### Automation
- **Workflow Engine:** n8n (self-hosted or cloud)
- **Email:** SendGrid or Resend
- **PDF Generation:** Puppeteer + Markdown templates

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend:** Supabase Cloud
- **n8n:** Railway or self-hosted VPS
- **Domain:** Custom domain via Vercel/Cloudflare

## Data Models

### Database Schema

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  company_url TEXT,
  industry TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  session_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL, -- pending, processing, completed, failed
  company_url TEXT NOT NULL,
  industry TEXT NOT NULL,
  business_goals TEXT,
  overall_score INTEGER,
  agent_outputs JSONB, -- Stores all agent results
  final_report JSONB,
  executive_summary JSONB,
  pdf_url TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audit_id UUID REFERENCES audits(id),
  customer_id UUID REFERENCES customers(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL, -- pending, succeeded, failed, refunded
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audits_customer_id ON audits(customer_id);
CREATE INDEX idx_audits_session_id ON audits(session_id);
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_payments_audit_id ON payments(audit_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_intent_id);
```

### Agent Output Schema

All agents return JSON following this structure:

```typescript
interface AgentOutput {
  agentName: string;
  score: number; // 0-100
  summary: string; // 3-sentence executive summary
  findings: Finding[];
  recommendations: Recommendation[];
  metrics?: {
    currentState: Record<string, any>;
    potentialState: Record<string, any>;
    gap: Record<string, any>;
  };
  // Agent-specific fields...
}

interface Finding {
  category: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
}

interface Recommendation {
  action: string;
  priority: 'quick-win' | 'short-term' | 'long-term';
  effort: 'low' | 'medium' | 'high';
  cost: string;
  estimatedImpact: string;
}
```

## Agent Orchestration Flow

### 1. Initialization

```javascript
// Supabase Edge Function: trigger-audit
async function triggerAudit(request) {
  // 1. Validate payment
  const payment = await verifyStripePayment(paymentIntentId);

  // 2. Create customer and audit records
  const customer = await createOrUpdateCustomer(email, companyName);
  const audit = await createAudit(customerId, companyUrl, industry, goals);

  // 3. Trigger Claude Flow orchestration
  const result = await fetch('https://your-server.com/run-audit', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${CLAUDE_FLOW_API_KEY}` },
    body: JSON.stringify({
      auditId: audit.id,
      sessionId: audit.session_id,
      companyUrl,
      industry,
      goals,
      email
    })
  });

  return { auditId: audit.id, status: 'processing' };
}
```

### 2. Agent Execution

```javascript
// run-audit.js orchestration
async function executeStage(stage, agents, context, sessionId) {
  // Initialize hooks
  await runHook(`npx claude-flow@alpha hooks session-restore --session-id "${sessionId}"`);

  if (stage.parallelExecution) {
    // Parallel execution using Claude Code Task tool
    const results = await Promise.all(
      agents.map(agent => {
        return Task(agent.name, buildPrompt(agent, context), agent.type);
      })
    );
    return results;
  } else {
    // Sequential execution
    const results = [];
    for (const agent of agents) {
      const result = await Task(agent.name, buildPrompt(agent, context), agent.type);
      results.push(result);
    }
    return results;
  }
}
```

### 3. Memory Coordination

```javascript
// Agent hooks for memory management
async function runAgentWithMemory(agent, context, sessionId) {
  // Pre-task: Restore context
  await runHook(`npx claude-flow@alpha hooks pre-task --description "${agent.name}"`);

  // Execute agent
  const result = await Task(agent.name, prompt, agent.type);

  // Post-task: Store results in memory
  await runHook(`npx claude-flow@alpha hooks post-edit --memory-key "swarm/${agent.id}/result"`);
  await runHook(`npx claude-flow@alpha hooks notify --message "${agent.name} completed"`);

  return result;
}
```

### 4. Report Synthesis

```javascript
// analytics-specialist agent synthesizes all results
const finalReport = {
  overallScore: calculateWeightedScore(agentOutputs),
  scoreBreakdown: {
    seo: { score: agentOutputs.seo.score, weight: 20 },
    cro: { score: agentOutputs.cro.score, weight: 15 },
    // ... other agents
  },
  criticalIssues: extractHighSeverityFindings(agentOutputs),
  prioritizedRecommendations: {
    quickWins: filterByPriority(allRecommendations, 'quick-win'),
    shortTerm: filterByPriority(allRecommendations, 'short-term'),
    longTerm: filterByPriority(allRecommendations, 'long-term')
  },
  executiveSummary: generateExecutiveSummary(agentOutputs),
  metricsDashboard: buildMetricsDashboard(agentOutputs)
};
```

## API Endpoints

### Frontend → Supabase Edge Functions

```typescript
// POST /api/trigger-audit
interface TriggerAuditRequest {
  companyUrl: string;
  industry: string;
  goals: string;
  email: string;
  paymentIntentId: string;
}

interface TriggerAuditResponse {
  auditId: string;
  status: 'processing' | 'error';
  estimatedCompletionTime: string; // ISO 8601
}

// GET /api/audit-status/:auditId
interface AuditStatusResponse {
  auditId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: {
    currentStage: string;
    completedAgents: string[];
    totalAgents: number;
  };
  result?: {
    overallScore: number;
    pdfUrl: string;
    executiveSummary: object;
  };
}

// POST /api/create-payment-intent
interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  email: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}
```

### Claude Flow Orchestration API

```typescript
// POST /run-audit
interface RunAuditRequest {
  auditId: string;
  sessionId: string;
  companyUrl: string;
  industry: string;
  goals: string;
  email: string;
}

interface RunAuditResponse {
  sessionId: string;
  status: 'completed' | 'failed';
  executionTime: string;
  results: {
    [agentId: string]: AgentOutput;
  };
  finalReport: FinalReport;
}
```

## Security Considerations

### 1. API Authentication

```javascript
// Supabase Edge Function authentication
export async function handler(req: Request) {
  // Verify Supabase JWT
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  const { data: user, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Proceed with request...
}
```

### 2. Rate Limiting

```javascript
// Rate limit audit requests
const rateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60000, // 1 minute
  keyGenerator: (req) => req.headers.get('x-forwarded-for')
});

if (!rateLimiter.checkLimit(clientIP)) {
  return new Response('Too many requests', { status: 429 });
}
```

### 3. Input Validation

```javascript
// Validate and sanitize inputs
import { z } from 'zod';

const AuditInputSchema = z.object({
  companyUrl: z.string().url().max(500),
  industry: z.string().min(1).max(100),
  goals: z.string().min(1).max(1000),
  email: z.string().email()
});

const validatedInput = AuditInputSchema.parse(requestBody);
```

### 4. Secure Storage

```javascript
// Store sensitive data encrypted
import { createCipheriv, randomBytes } from 'crypto';

function encryptSensitiveData(data: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}
```

## Scaling Considerations

### 1. Agent Concurrency

```javascript
// Limit concurrent audits
const CONCURRENT_AUDIT_LIMIT = {
  standard: 5,
  priority: 10,
  enterprise: 20
};

// Queue system for overflow
if (currentAudits >= limit) {
  await addToQueue(auditRequest, priority);
}
```

### 2. Caching Strategy

```javascript
// Cache competitor analysis for 7 days
const cacheKey = `competitor-analysis:${industry}:${hash(companyUrl)}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const analysis = await runCompetitorAnalysis();
await redis.setex(cacheKey, 7 * 24 * 60 * 60, JSON.stringify(analysis));
```

### 3. Database Optimization

```sql
-- Partition audits table by status
CREATE TABLE audits_completed PARTITION OF audits
  FOR VALUES IN ('completed');

CREATE TABLE audits_processing PARTITION OF audits
  FOR VALUES IN ('processing', 'pending');

-- Archive old audits
CREATE TABLE audits_archive (LIKE audits INCLUDING ALL);
```

## Monitoring & Observability

### 1. Agent Performance Tracking

```javascript
// Track agent execution metrics
await supabase.from('agent_metrics').insert({
  agent_id: agent.id,
  session_id: sessionId,
  execution_time_ms: executionTime,
  token_count: result.tokenCount,
  success: true,
  error: null
});
```

### 2. Error Handling

```javascript
// Comprehensive error handling
try {
  const result = await executeAgent(agent, context, sessionId);
} catch (error) {
  await logError({
    agent: agent.id,
    sessionId,
    error: error.message,
    stack: error.stack,
    context: JSON.stringify(context)
  });

  // Retry logic
  if (retries < MAX_RETRIES) {
    return await retryAgent(agent, context, sessionId, retries + 1);
  }

  throw error;
}
```

### 3. Logging

```javascript
// Structured logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

logger.info({
  event: 'audit.started',
  auditId,
  sessionId,
  companyUrl
});
```

## Deployment

### Development Environment

```bash
# Frontend (Next.js)
cd frontend
npm install
npm run dev  # http://localhost:3000

# Backend (Supabase local)
npx supabase start
npx supabase db push

# Agent orchestration
cd backend/claude-flow/scripts
node run-audit.js --url "https://example.com" --industry "SaaS" --goals "Growth" --email "test@example.com"
```

### Production Environment

```bash
# 1. Deploy frontend to Vercel
vercel deploy --prod

# 2. Deploy Supabase Edge Functions
npx supabase functions deploy trigger-audit
npx supabase functions deploy generate-pdf

# 3. Set up n8n workflows
# Import n8n-workflows/audit-automation.json

# 4. Configure environment variables
# SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY, etc.
```

### Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Supabase Edge Functions
STRIPE_SECRET_KEY=sk_live_...
CLAUDE_FLOW_API_KEY=your-api-key
SENDGRID_API_KEY=your-sendgrid-key

# Claude Flow
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

## Cost Estimation

### Per Audit Costs

- **AI (Claude API):** ~$2.50 per audit (8 agents × ~4000 tokens each)
- **Supabase:** $0.02 per audit (database + storage)
- **n8n/Email:** $0.05 per audit
- **Stripe fees:** 2.9% + $0.30 per transaction

**Total cost per audit:** ~$3-4

### Pricing Strategy

- **Standard Audit:** $197 (margin: ~$193)
- **Priority Audit (< 24hr):** $297 (margin: ~$293)
- **Enterprise (custom):** $497+ (margin: ~$493+)

## Future Enhancements

1. **Real-time Progress Updates:** WebSocket connection for live agent progress
2. **Custom Agent Configuration:** Allow customers to customize agent focus areas
3. **Competitor Benchmarking:** Compare results against industry benchmarks
4. **Ongoing Monitoring:** Monthly re-audits with trend analysis
5. **White-label Solution:** Brand-customizable reports for agencies
6. **API Access:** RESTful API for programmatic access to audits

---

## Support & Maintenance

- **Bug Reports:** GitHub Issues
- **Feature Requests:** GitHub Discussions
- **Documentation:** /docs directory
- **CI/CD:** GitHub Actions for automated testing and deployment

For agent-specific documentation, see [AGENT_GUIDE.md](./AGENT_GUIDE.md)
