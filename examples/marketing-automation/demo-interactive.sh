#!/bin/bash

###############################################################################
# Claude Flow - Marketing Automation Interactive Demo
###############################################################################
# This script demonstrates how to use claude-flow for AI marketing automation
# Run: bash examples/marketing-automation/demo-interactive.sh
###############################################################################

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║     🚀 Claude Flow - Marketing Automation Demo 🚀              ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to pause
pause() {
    echo ""
    read -p "Press ENTER to continue..."
    echo ""
}

# Step 1: Check Installation
echo -e "${GREEN}Step 1: Checking claude-flow installation...${NC}"
npx claude-flow@alpha --version || {
    echo -e "${YELLOW}Installing claude-flow...${NC}"
    npm install -g claude-flow@alpha
}
echo -e "${GREEN}✅ Claude Flow is installed!${NC}"
pause

# Step 2: Initialize Swarm
echo -e "${GREEN}Step 2: Initializing Marketing Swarm...${NC}"
echo "Command: npx claude-flow@alpha swarm init --topology mesh --max-agents 5"
npx claude-flow@alpha swarm init --topology mesh --max-agents 5
echo -e "${GREEN}✅ Swarm initialized with mesh topology!${NC}"
pause

# Step 3: Set up Memory
echo -e "${GREEN}Step 3: Setting up shared memory for campaign...${NC}"
echo "Command: npx claude-flow@alpha memory init --scope marketing-demo"
npx claude-flow@alpha memory init --scope marketing-demo
echo ""
echo "Storing campaign context..."
npx claude-flow@alpha memory store --key "campaign/product" --value "AI Marketing Automation Platform"
npx claude-flow@alpha memory store --key "campaign/audience" --value "B2B SaaS companies"
npx claude-flow@alpha memory store --key "campaign/goal" --value "Generate leads and increase brand awareness"
echo -e "${GREEN}✅ Memory coordination enabled!${NC}"
pause

# Step 4: Spawn Marketing Agents
echo -e "${GREEN}Step 4: Spawning Marketing Agents...${NC}"
echo ""

echo -e "${BLUE}🤖 Spawning Content Strategist...${NC}"
npx claude-flow@alpha agent spawn --type content-strategist \
  --task "Analyze B2B SaaS audience and create content strategy for AI marketing platform"
echo ""

echo -e "${BLUE}🤖 Spawning Copywriter...${NC}"
npx claude-flow@alpha agent spawn --type copywriter \
  --task "Write engaging blog post: 'How AI is Revolutionizing Marketing Automation in 2024'"
echo ""

echo -e "${BLUE}🤖 Spawning Social Media Manager...${NC}"
npx claude-flow@alpha agent spawn --type social-media-manager \
  --task "Create LinkedIn post announcing our AI marketing platform launch"
echo ""

echo -e "${GREEN}✅ All agents spawned successfully!${NC}"
pause

# Step 5: Check Swarm Status
echo -e "${GREEN}Step 5: Checking Swarm Status...${NC}"
npx claude-flow@alpha swarm status
pause

# Step 6: List Agents
echo -e "${GREEN}Step 6: Listing All Active Agents...${NC}"
npx claude-flow@alpha agent list
pause

# Step 7: Check Memory
echo -e "${GREEN}Step 7: Viewing Shared Memory...${NC}"
npx claude-flow@alpha memory list --scope marketing-demo
pause

# Step 8: View Metrics
echo -e "${GREEN}Step 8: Viewing Performance Metrics...${NC}"
npx claude-flow@alpha swarm metrics
pause

# Final Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Demo Complete! 🎉                           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}What you just accomplished:${NC}"
echo "  ✅ Initialized a multi-agent marketing swarm"
echo "  ✅ Set up shared memory coordination"
echo "  ✅ Spawned 3 specialized marketing agents"
echo "  ✅ Monitored swarm performance"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Run pre-built examples:"
echo "     node examples/marketing-automation/01-simple-swarm.js"
echo "     node examples/marketing-automation/02-email-sequence-swarm.js"
echo "     node examples/marketing-automation/03-social-media-blitz.js"
echo ""
echo "  2. Customize your agents:"
echo "     Edit: config/marketing/agents.json"
echo ""
echo "  3. Create custom workflows:"
echo "     Edit: config/marketing/swarm-config.json"
echo ""
echo "  4. Read the documentation:"
echo "     cat examples/marketing-automation/README.md"
echo "     cat examples/marketing-automation/QUICKSTART.md"
echo ""
echo -e "${BLUE}Happy Marketing Automation! 🚀${NC}"
