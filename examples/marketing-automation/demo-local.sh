#!/bin/bash

###############################################################################
# Claude Flow - Marketing Automation Local Demo
# Uses the local claude-flow CLI instead of npx
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Use local CLI
CLI="node /home/user/claude-flow/bin/claude-flow.js"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║     🚀 Claude Flow - Marketing Automation Demo 🚀              ║${NC}"
echo -e "${BLUE}║              (Using Local Installation)                        ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

pause() {
    echo ""
    read -p "Press ENTER to continue..."
    echo ""
}

# Step 1: Show version
echo -e "${GREEN}Step 1: Checking claude-flow version...${NC}"
$CLI --version
echo -e "${GREEN}✅ Claude Flow is ready!${NC}"
pause

# Step 2: Show available commands
echo -e "${GREEN}Step 2: Available Commands...${NC}"
echo "Swarm commands:"
echo "  • $CLI swarm init       - Initialize swarm"
echo "  • $CLI swarm status     - Check swarm status"
echo "  • $CLI agent spawn      - Create agents"
echo "  • $CLI memory init      - Enable memory"
echo ""
pause

# Step 3: Initialize Swarm
echo -e "${GREEN}Step 3: Initializing Marketing Swarm...${NC}"
echo "Command: $CLI swarm init --topology mesh --max-agents 5"
echo ""
echo -e "${YELLOW}Note: In a real scenario, this would initialize a mesh topology swarm${NC}"
echo -e "${YELLOW}with 5 agent slots for parallel execution.${NC}"
pause

# Step 4: Memory Setup
echo -e "${GREEN}Step 4: Setting up Shared Memory...${NC}"
echo "Command: $CLI memory init --scope marketing-demo"
echo ""
echo -e "${YELLOW}This enables agents to share context:${NC}"
echo "  - Campaign product: AI Marketing Automation Platform"
echo "  - Target audience: B2B SaaS companies"
echo "  - Campaign goal: Generate leads and brand awareness"
pause

# Step 5: Agent Overview
echo -e "${GREEN}Step 5: Marketing Agents Overview...${NC}"
echo ""
echo "📊 Content Strategist"
echo "   → Plans campaigns, analyzes audience, creates strategy"
echo ""
echo "✍️  Copywriter"
echo "   → Creates blogs, emails, social posts, ad copy"
echo ""
echo "📱 Social Media Manager"
echo "   → Manages multi-platform distribution and engagement"
echo ""
echo "📧 Email Automation Specialist"
echo "   → Sets up drip campaigns and sequences"
echo ""
echo "📈 Analytics Specialist"
echo "   → Tracks performance and generates insights"
echo ""
echo "🔍 SEO Optimizer"
echo "   → Optimizes content for search engines"
echo ""
echo "✏️  Editor"
echo "   → Reviews quality and ensures brand consistency"
pause

# Step 6: Example Agent Commands
echo -e "${GREEN}Step 6: Example Agent Commands...${NC}"
echo ""
echo "Spawn a copywriter:"
echo "  $CLI agent spawn --type copywriter \\"
echo "    --task 'Write LinkedIn post about AI marketing'"
echo ""
echo "Spawn social media manager:"
echo "  $CLI agent spawn --type social-media-manager \\"
echo "    --task 'Create Twitter campaign for product launch'"
echo ""
echo "Spawn content strategist:"
echo "  $CLI agent spawn --type content-strategist \\"
echo "    --task 'Plan Q1 content calendar'"
pause

# Step 7: Monitoring Commands
echo -e "${GREEN}Step 7: Monitoring Your Swarm...${NC}"
echo ""
echo "Check swarm status:"
echo "  $CLI swarm status"
echo ""
echo "List active agents:"
echo "  $CLI agent list"
echo ""
echo "View performance metrics:"
echo "  $CLI swarm metrics"
echo ""
echo "Check shared memory:"
echo "  $CLI memory list --scope marketing-demo"
pause

# Step 8: Run Pre-built Examples
echo -e "${GREEN}Step 8: Ready-to-Run Examples...${NC}"
echo ""
echo "1. Simple 3-Agent Swarm:"
echo "   node examples/marketing-automation/01-simple-swarm.js"
echo ""
echo "2. Email Sequence Automation:"
echo "   node examples/marketing-automation/02-email-sequence-swarm.js"
echo ""
echo "3. Social Media Blitz:"
echo "   node examples/marketing-automation/03-social-media-blitz.js"
pause

# Final Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Demo Complete! 🎉                           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}What you learned:${NC}"
echo "  ✅ How to initialize marketing swarms"
echo "  ✅ 7 specialized marketing AI agents"
echo "  ✅ Memory coordination for context sharing"
echo "  ✅ Monitoring and performance tracking"
echo "  ✅ Ready-to-run example scripts"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Read the Quick Start: cat examples/marketing-automation/QUICKSTART.md"
echo "  2. Read the Full Guide: cat examples/marketing-automation/README.md"
echo "  3. Try the examples: node examples/marketing-automation/01-simple-swarm.js"
echo "  4. Check the docs: cat docs/marketing-automation-guide.md"
echo ""
echo -e "${BLUE}Happy Marketing Automation! 🚀${NC}"
