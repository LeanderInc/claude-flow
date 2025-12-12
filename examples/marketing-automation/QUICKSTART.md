# Marketing Automation - Quick Start Guide

Get your first AI marketing swarm running in 5 minutes!

## ⚡ 1-Minute Setup

```bash
# 1. Verify installation
npx claude-flow@alpha --version

# 2. Initialize your first swarm
npx claude-flow@alpha swarm init --topology mesh --max-agents 5

# 3. Spawn your first marketing agent
npx claude-flow@alpha agent spawn --type copywriter --task "Write a compelling product description for an AI marketing tool"

# 4. Check status
npx claude-flow@alpha swarm status
```

## 🎯 Your First Marketing Campaign (5 Minutes)

### Step 1: Create a Social Media Post

```bash
# Initialize swarm
npx claude-flow@alpha swarm init --topology mesh

# Spawn agents for multi-platform content
npx claude-flow@alpha agent spawn --type content-strategist \
  --task "Create strategy for AI product launch on social media"

npx claude-flow@alpha agent spawn --type copywriter \
  --task "Write LinkedIn post about AI marketing automation benefits"

npx claude-flow@alpha agent spawn --type social-media-manager \
  --task "Create Twitter thread explaining AI marketing in 5 tweets"

# Monitor progress
npx claude-flow@alpha agent list
```

### Step 2: Build an Email Sequence

```bash
# Initialize hierarchical swarm (better for sequences)
npx claude-flow@alpha swarm init --topology hierarchical

# Create email sequence
npx claude-flow@alpha agent spawn --type copywriter \
  --task "Write 3-email welcome sequence for SaaS trial users"

npx claude-flow@alpha agent spawn --type email-automation-specialist \
  --task "Set up automation triggers for welcome sequence"

# Check results
npx claude-flow@alpha task status
```

### Step 3: Run Complete Campaign

```bash
# Run the pre-built example
node examples/marketing-automation/01-simple-swarm.js

# Or use the social media blitz
node examples/marketing-automation/03-social-media-blitz.js
```

## 🧠 Enable Memory Coordination

Share context between agents:

```bash
# Initialize memory system
npx claude-flow@alpha memory init --scope my-campaign

# Store campaign details
npx claude-flow@alpha memory store \
  --key "campaign/product" \
  --value "AI Marketing Automation Platform"

npx claude-flow@alpha memory store \
  --key "campaign/audience" \
  --value "B2B SaaS companies, 50-500 employees"

# Agents can now access this context automatically!
```

## 📊 Monitor Your Swarm

```bash
# Real-time status
npx claude-flow@alpha swarm status

# List all agents
npx claude-flow@alpha agent list

# View performance metrics
npx claude-flow@alpha swarm metrics

# Check memory usage
npx claude-flow@alpha memory list --scope my-campaign
```

## 🎨 Common Marketing Tasks

### Blog Post Creation
```bash
npx claude-flow@alpha swarm init --topology hierarchical && \
npx claude-flow@alpha agent spawn --type content-strategist \
  --task "Research and outline blog post about AI marketing trends 2024" && \
npx claude-flow@alpha agent spawn --type copywriter \
  --task "Write 1500-word blog post based on outline" && \
npx claude-flow@alpha agent spawn --type seo-optimizer \
  --task "Optimize blog post for keyword: 'AI marketing automation'" && \
npx claude-flow@alpha agent spawn --type editor \
  --task "Review and polish final blog post"
```

### Product Launch Campaign
```bash
npx claude-flow@alpha swarm init --topology mesh && \
npx claude-flow@alpha agent spawn --type content-strategist \
  --task "Create product launch campaign strategy" && \
npx claude-flow@alpha agent spawn --type copywriter \
  --task "Write launch announcement, landing page, and email" && \
npx claude-flow@alpha agent spawn --type social-media-manager \
  --task "Create social media launch calendar for all platforms" && \
npx claude-flow@alpha agent spawn --type analytics-specialist \
  --task "Set up tracking and success metrics"
```

### Ad Copy Generation
```bash
npx claude-flow@alpha agent spawn --type copywriter \
  --task "Create 10 variations of Google Ads copy for AI marketing tool" && \
npx claude-flow@alpha agent spawn --type editor \
  --task "Review ad copy for clarity and compliance"
```

## 🪝 Enable Automation with Hooks

```bash
# Auto-format content after creation
npx claude-flow@alpha hooks post-edit --auto-format true

# Train neural patterns from successful campaigns
npx claude-flow@alpha hooks post-task --train-neural true

# Export metrics after each session
npx claude-flow@alpha hooks session-end --export-metrics true
```

## 🔧 Useful Commands

| Command | Description |
|---------|-------------|
| `npx claude-flow@alpha swarm init` | Start new swarm |
| `npx claude-flow@alpha agent spawn` | Create new agent |
| `npx claude-flow@alpha agent list` | Show all agents |
| `npx claude-flow@alpha swarm status` | Swarm overview |
| `npx claude-flow@alpha memory store` | Save context |
| `npx claude-flow@alpha memory retrieve` | Get context |
| `npx claude-flow@alpha task status` | Check task progress |
| `npx claude-flow@alpha swarm metrics` | Performance stats |

## 🎓 Next Steps

1. ✅ **Run the examples**
   ```bash
   node examples/marketing-automation/01-simple-swarm.js
   node examples/marketing-automation/02-email-sequence-swarm.js
   node examples/marketing-automation/03-social-media-blitz.js
   ```

2. ✅ **Customize agents**
   - Edit `config/marketing/agents.json`
   - Add your own agent types
   - Define custom capabilities

3. ✅ **Build your workflow**
   - Edit `config/marketing/swarm-config.json`
   - Create custom workflows
   - Set up automation rules

4. ✅ **Integrate with your tools**
   - Connect to email platforms
   - Link social media APIs
   - Set up analytics tracking

## 💡 Pro Tips

1. **Use Mesh for Parallel Tasks**: Social media, multi-platform campaigns
2. **Use Hierarchical for Sequences**: Email drips, funnel stages
3. **Enable Memory**: Agents work better with shared context
4. **Monitor Metrics**: Optimize based on performance data
5. **Train Patterns**: Let AI learn from your successful campaigns

## 🐛 Troubleshooting

**Agents not starting?**
```bash
npx claude-flow@alpha features detect
npx claude-flow@alpha swarm status
```

**Performance issues?**
```bash
npx claude-flow@alpha swarm metrics
npx claude-flow@alpha perf analyze
```

**Memory not syncing?**
```bash
npx claude-flow@alpha memory usage
```

## 🆘 Need Help?

- 📖 Full docs: `examples/marketing-automation/README.md`
- 💬 Issues: https://github.com/ruvnet/claude-flow/issues
- 🌐 Main docs: https://github.com/ruvnet/claude-flow

---

**You're ready to automate your marketing with AI! 🚀**

Start with the simple swarm, then build from there. The AI agents handle the work, you focus on strategy.
