/**
 * Data Processor - Transforms raw audit JSON into template-ready data
 */

const { format } = require('date-fns');

/**
 * Calculate overall marketing score from individual agent scores
 */
function calculateOverallScore(results) {
  const weights = {
    'customer-insights-analyst': 0.05,
    'seo-optimizer': 0.20,
    'cro-specialist': 0.15,
    'content-strategist': 0.15,
    'paid-search-manager': 0.15,
    'paid-social-manager': 0.15,
    'brand-strategist': 0.15
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.keys(weights).forEach(agentId => {
    if (results[agentId] && results[agentId].score) {
      totalScore += results[agentId].score * weights[agentId];
      totalWeight += weights[agentId];
    }
  });

  return Math.round(totalScore / totalWeight);
}

/**
 * Extract critical issues (high severity) from all agents
 */
function extractCriticalIssues(results) {
  const criticalIssues = [];

  Object.values(results).forEach(agentData => {
    if (agentData.findings) {
      agentData.findings.forEach(finding => {
        if (finding.severity === 'high') {
          criticalIssues.push(finding);
        }
      });
    }
  });

  // Return top 3 critical issues
  return criticalIssues.slice(0, 3);
}

/**
 * Extract top opportunities (quick wins) from all agents
 */
function extractTopOpportunities(results) {
  const opportunities = [];

  Object.values(results).forEach(agentData => {
    if (agentData.recommendations) {
      agentData.recommendations.forEach(rec => {
        if (rec.priority === 'quick-win') {
          opportunities.push(rec);
        }
      });
    }
  });

  // Return top 3 opportunities
  return opportunities.slice(0, 3);
}

/**
 * Build score breakdown for all categories
 */
function buildScoreBreakdown(results) {
  return [
    { label: 'SEO', score: results['seo-optimizer']?.score || 0 },
    { label: 'Conversion', score: results['cro-specialist']?.score || 0 },
    { label: 'Content', score: results['content-strategist']?.score || 0 },
    { label: 'Paid Search', score: results['paid-search-manager']?.score || 0 },
    { label: 'Paid Social', score: results['paid-social-manager']?.score || 0 },
    { label: 'Brand', score: results['brand-strategist']?.score || 0 },
    { label: 'Audience', score: results['customer-insights-analyst']?.score || 0 }
  ];
}

/**
 * Organize all recommendations into action plan phases
 */
function buildActionPlan(results) {
  const quickWins = [];
  const shortTerm = [];
  const longTerm = [];

  Object.entries(results).forEach(([agentId, agentData]) => {
    const category = getCategoryName(agentId);

    if (agentData.recommendations) {
      agentData.recommendations.forEach(rec => {
        const enrichedRec = { ...rec, category };

        if (rec.priority === 'quick-win') {
          quickWins.push(enrichedRec);
        } else if (rec.priority === 'short-term') {
          shortTerm.push(enrichedRec);
        } else if (rec.priority === 'long-term') {
          longTerm.push(enrichedRec);
        }
      });
    }
  });

  return { quickWins, shortTerm, longTerm };
}

/**
 * Get friendly category name from agent ID
 */
function getCategoryName(agentId) {
  const names = {
    'customer-insights-analyst': 'Audience & Market',
    'seo-optimizer': 'SEO',
    'cro-specialist': 'Conversion Optimization',
    'content-strategist': 'Content Strategy',
    'paid-search-manager': 'Paid Search',
    'paid-social-manager': 'Paid Social',
    'brand-strategist': 'Brand & Messaging',
    'analytics-specialist': 'Analytics'
  };

  return names[agentId] || agentId;
}

/**
 * Calculate investment summary
 */
function calculateInvestmentSummary(actionPlan) {
  // Parse cost ranges and calculate estimates
  const parseCost = (costString) => {
    if (!costString) return 0;
    const match = costString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const allItems = [
    ...actionPlan.quickWins,
    ...actionPlan.shortTerm,
    ...actionPlan.longTerm
  ];

  const totalInvestment = allItems.reduce((sum, item) => {
    return sum + parseCost(item.cost);
  }, 0);

  return {
    totalInvestment: `$${totalInvestment.toLocaleString()}-${(totalInvestment * 2).toLocaleString()}`,
    estimatedROI: '250-400%',
    paybackPeriod: '4-6 months'
  };
}

/**
 * Process raw audit data into template-ready format
 */
function processAuditData(rawData, config) {
  const results = rawData.results || {};

  // Extract company name from URL
  const companyName = rawData.params?.url
    ? new URL(rawData.params.url).hostname.replace('www.', '').split('.')[0]
    : 'Your Company';

  // Build action plan
  const actionPlan = buildActionPlan(results);

  return {
    // Branding
    branding: config.branding,

    // Company info
    params: {
      companyName: companyName.charAt(0).toUpperCase() + companyName.slice(1),
      url: rawData.params?.url || 'N/A',
      industry: rawData.params?.industry || 'N/A',
      goals: rawData.params?.goals || 'N/A'
    },

    // Report metadata
    reportDate: format(new Date(rawData.generatedAt || Date.now()), 'MMMM dd, yyyy'),
    executionTime: rawData.executionTime || 'N/A',

    // Overall score
    overallScore: calculateOverallScore(results),

    // Score breakdown
    scoreBreakdown: buildScoreBreakdown(results),

    // Critical issues and opportunities
    criticalIssues: extractCriticalIssues(results),
    topOpportunities: extractTopOpportunities(results),

    // Individual agent scores
    audienceScore: results['customer-insights-analyst']?.score || 0,
    seoScore: results['seo-optimizer']?.score || 0,
    croScore: results['cro-specialist']?.score || 0,
    contentScore: results['content-strategist']?.score || 0,
    paidSearchScore: results['paid-search-manager']?.score || 0,
    paidSocialScore: results['paid-social-manager']?.score || 0,
    brandScore: results['brand-strategist']?.score || 0,

    // Individual agent data
    audienceData: results['customer-insights-analyst'] || { findings: [], recommendations: [], summary: 'No data available' },
    seoData: results['seo-optimizer'] || { findings: [], recommendations: [], summary: 'No data available' },
    croData: results['cro-specialist'] || { findings: [], recommendations: [], summary: 'No data available' },
    contentData: results['content-strategist'] || { findings: [], recommendations: [], summary: 'No data available' },
    paidSearchData: results['paid-search-manager'] || { findings: [], recommendations: [], summary: 'No data available' },
    paidSocialData: results['paid-social-manager'] || { findings: [], recommendations: [], summary: 'No data available' },
    brandData: results['brand-strategist'] || { findings: [], recommendations: [], summary: 'No data available' },

    // Action plan
    actionPlan,

    // Investment summary
    investmentSummary: calculateInvestmentSummary(actionPlan)
  };
}

module.exports = { processAuditData };
