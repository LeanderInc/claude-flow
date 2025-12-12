# AI Marketing Automation with Claude Flow

This directory contains examples for building AI-powered marketing automation systems using Claude Flow's multi-agent swarm orchestration.

## 🚀 Quick Start

### Prerequisites

```bash
# Ensure claude-flow is installed
npm install -g claude-flow@alpha

# Or use with npx
npx claude-flow@alpha --version
```

### Setup MCP Server (Optional but Recommended)

```bash
# Add claude-flow MCP server to Claude Desktop
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Verify installation
npx claude-flow@alpha features detect
```

## 📚 Examples

### 1. Simple Marketing Swarm (`01-simple-swarm.js`)

Basic 3-agent swarm for content marketing:
- **Content Strategist**: Audience analysis and strategy
- **Copywriter**: Content creation
- **Social Media Manager**: Distribution and engagement

```bash
node examples/marketing-automation/01-simple-swarm.js
```

**Use Cases:**
- Blog post creation
- Product launch content
- Brand messaging
- Quick campaigns

---

### 2. Email Sequence Automation (`02-email-sequence-swarm.js`)

Sequential workflow for email drip campaigns:
- **Content Strategist**: Email sequence planning
- **Copywriter**: Email content creation
- **Email Automation Specialist**: Automation setup
- **Analytics Specialist**: Tracking and reporting

```bash
node examples/marketing-automation/02-email-sequence-swarm.js
```

**Features:**
- 5-email onboarding sequence
- Automated triggers
- Segmentation strategy
- Performance tracking
- JSON report generation

**Use Cases:**
- User onboarding
- Lead nurturing
- Re-engagement campaigns
- Product education

---

### 3. Social Media Blitz (`03-social-media-blitz.js`)

Parallel multi-platform campaign execution:
- **4 Platform Agents**: LinkedIn, Twitter, Instagram, Facebook
- **Content Strategist**: Overall strategy
- **Analytics Specialist**: Performance monitoring

```bash
node examples/marketing-automation/03-social-media-blitz.js
```

**Features:**
- Parallel execution (mesh topology)
- Platform-specific content
- Real-time coordination
- Cross-platform analytics

**Use Cases:**
- Product launches
- Event promotion
- Brand campaigns
- Viral marketing

---

## 🏗️ Architecture

### Swarm Topologies

1. **Mesh** (Parallel Execution)
   - Best for: Multi-platform campaigns, parallel tasks
   - Examples: Social media blitz, content distribution

2. **Hierarchical** (Sequential Workflows)
   - Best for: Email sequences, staged campaigns
   - Examples: Drip campaigns, funnel optimization

3. **Adaptive** (Dynamic Adjustment)
   - Best for: Complex campaigns with changing requirements
   - Examples: A/B testing, optimization campaigns

### Agent Types

| Agent | Role | Best For |
|-------|------|----------|
| `content-strategist` | Planning & Strategy | Campaign planning, audience research |
| `copywriter` | Content Creation | Blogs, emails, ads, social posts |
| `social-media-manager` | Distribution | Platform management, scheduling |
| `email-automation-specialist` | Email Marketing | Sequences, segmentation, automation |
| `analytics-specialist` | Measurement | Tracking, reporting, optimization |
| `seo-optimizer` | Search Optimization | Keywords, rankings, technical SEO |
| `editor` | Quality Control | Proofreading, brand consistency |

## 🧠 Memory & Coordination

All examples use claude-flow's distributed memory system:

```bash
# Store campaign context
npx claude-flow@alpha memory store --key "campaign/context" --value '{"goal": "..."}'

# Retrieve shared context
npx claude-flow@alpha memory retrieve --key "campaign/context"

# List all campaign memory
npx claude-flow@alpha memory list --scope campaign
```

### Memory Scopes

- `marketing-campaign`: General campaign data
- `social-blitz`: Social media campaigns
- `email-sequence`: Email automation data
- `analytics`: Performance metrics

## 🪝 Hooks Integration

Examples use hooks for automation:

```bash
# Pre-task: Load context and prepare
npx claude-flow@alpha hooks pre-task --description "Email sequence stage 1"

# Post-edit: Train neural patterns
npx claude-flow@alpha hooks post-edit --train-neural true

# Post-task: Export metrics
npx claude-flow@alpha hooks post-task --export-metrics true

# Session management
npx claude-flow@alpha hooks session-end --export-metrics true
```

## 📊 Monitoring & Analytics

### Check Swarm Status
```bash
npx claude-flow@alpha swarm status
```

### List Active Agents
```bash
npx claude-flow@alpha agent list
```

### View Performance Metrics
```bash
npx claude-flow@alpha swarm metrics --format json
```

### Neural Pattern Analysis
```bash
npx claude-flow@alpha neural patterns --scope marketing
```

## 🎯 Use Case Templates

### Content Marketing Campaign
```javascript
const campaign = {
  agents: ['content-strategist', 'copywriter', 'seo-optimizer', 'editor'],
  workflow: 'sequential',
  output: ['blog-post', 'social-snippets', 'email-teaser']
};
```

### Product Launch
```javascript
const launch = {
  agents: [
    'content-strategist',
    'copywriter',
    'social-media-manager',
    'email-automation-specialist',
    'analytics-specialist'
  ],
  workflow: 'parallel-sequential',
  duration: '2 weeks'
};
```

### Lead Nurturing
```javascript
const nurture = {
  agents: ['email-automation-specialist', 'copywriter', 'analytics-specialist'],
  workflow: 'sequential',
  triggers: ['signup', 'download', 'inactivity'],
  duration: '30 days'
};
```

## 🔧 Configuration

Agent definitions: `config/marketing/agents.json`
Swarm configuration: `config/marketing/swarm-config.json`

### Custom Agent Configuration

```json
{
  "custom-agent": {
    "type": "specialized",
    "role": "Your Custom Role",
    "capabilities": ["capability-1", "capability-2"],
    "memory": {
      "enabled": true,
      "persistence": "long-term"
    }
  }
}
```

## 🚀 Advanced Features

### Neural Training
Enable automatic pattern learning:
```bash
npx claude-flow@alpha neural train --scope marketing --auto true
```

### Performance Optimization
```bash
npx claude-flow@alpha benchmark run --workflow email-sequence
```

### GitHub Integration
```bash
npx claude-flow@alpha github swarm --repo your-org/marketing-repo
```

## 📈 Performance Tips

1. **Use Parallel Execution**: For independent tasks (mesh topology)
2. **Enable Memory Coordination**: Share context between agents
3. **Implement Hooks**: Automate pre/post task operations
4. **Monitor Metrics**: Track performance and optimize
5. **Train Neural Patterns**: Learn from successful campaigns

## 🐛 Troubleshooting

### Agents not communicating
```bash
# Check memory synchronization
npx claude-flow@alpha memory usage

# Verify swarm status
npx claude-flow@alpha swarm status
```

### Poor performance
```bash
# Run diagnostics
npx claude-flow@alpha swarm metrics

# Analyze bottlenecks
npx claude-flow@alpha perf analyze
```

## 📚 Additional Resources

- [Main Documentation](../../docs/)
- [SPARC Methodology](../../docs/sparc/)
- [Agent Coordination](../../docs/agents/)
- [Memory System](../../docs/memory/)
- [Hooks Guide](../../docs/hooks/)

## 🤝 Contributing

Found a bug or want to add examples?
- Issues: https://github.com/ruvnet/claude-flow/issues
- PRs: https://github.com/ruvnet/claude-flow/pulls

---

**Built with Claude Flow** 🚀
Orchestrating AI agents for marketing automation excellence.
