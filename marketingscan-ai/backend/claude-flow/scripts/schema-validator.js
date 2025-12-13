#!/usr/bin/env node

/**
 * MarketingScan AI - Schema Validator
 *
 * Validates agent outputs against expected schemas.
 */

const fs = require('fs');
const path = require('path');

// Base schema that all agents must follow
const BASE_AGENT_SCHEMA = {
  type: 'object',
  required: ['agentName', 'score', 'summary', 'findings', 'recommendations'],
  properties: {
    agentName: {
      type: 'string',
      enum: [
        'customer-insights-analyst',
        'seo-optimizer',
        'cro-specialist',
        'content-strategist',
        'paid-search-manager',
        'paid-social-manager',
        'brand-strategist',
        'analytics-specialist'
      ]
    },
    score: {
      type: 'number',
      minimum: 0,
      maximum: 100
    },
    summary: {
      type: 'string',
      minLength: 50,
      maxLength: 500
    },
    findings: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['category', 'issue', 'severity', 'impact'],
        properties: {
          category: { type: 'string' },
          issue: { type: 'string' },
          severity: {
            type: 'string',
            enum: ['high', 'medium', 'low']
          },
          impact: { type: 'string' }
        }
      }
    },
    recommendations: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['action', 'priority', 'effort', 'cost', 'estimatedImpact'],
        properties: {
          action: { type: 'string' },
          priority: {
            type: 'string',
            enum: ['quick-win', 'short-term', 'long-term']
          },
          effort: {
            type: 'string',
            enum: ['low', 'medium', 'high']
          },
          cost: { type: 'string' },
          estimatedImpact: { type: 'string' }
        }
      }
    },
    metrics: {
      type: 'object',
      properties: {
        currentState: { type: 'object' },
        potentialState: { type: 'object' },
        gap: { type: 'object' }
      }
    }
  }
};

// Agent-specific schemas
const AGENT_SCHEMAS = {
  'customer-insights-analyst': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'targetAudience', 'competitors', 'marketPosition']
  },
  'seo-optimizer': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'technicalSEO', 'onPageSEO', 'keywords', 'backlinks']
  },
  'cro-specialist': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'conversionFunnel', 'userExperience', 'persuasionElements', 'abTestIdeas']
  },
  'content-strategist': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'contentInventory', 'contentQuality', 'contentGaps', 'contentPillars']
  },
  'paid-search-manager': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'searchOpportunities', 'campaignStructure', 'budgetBidding']
  },
  'paid-social-manager': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'platformRecommendations', 'audienceTargeting', 'creativeStrategy', 'budgetPerformance']
  },
  'brand-strategist': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'brandPositioning', 'messagingArchitecture', 'visualIdentity', 'brandExperience']
  },
  'analytics-specialist': {
    ...BASE_AGENT_SCHEMA,
    required: [...BASE_AGENT_SCHEMA.required, 'overallScore', 'scoreBreakdown', 'criticalIssues', 'prioritizedRecommendations', 'executiveSummary', 'metricsDashboard']
  }
};

// Simple schema validator
function validateSchema(data, schema) {
  const errors = [];

  // Check required fields
  if (schema.required) {
    schema.required.forEach(field => {
      if (data[field] === undefined || data[field] === null) {
        errors.push(`Missing required field: ${field}`);
      }
    });
  }

  // Validate properties
  if (schema.properties) {
    Object.keys(schema.properties).forEach(prop => {
      const propSchema = schema.properties[prop];
      const value = data[prop];

      if (value === undefined) return;

      // Type check
      if (propSchema.type) {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        if (actualType !== propSchema.type) {
          errors.push(`Field '${prop}' should be ${propSchema.type}, got ${actualType}`);
        }
      }

      // Enum check
      if (propSchema.enum && !propSchema.enum.includes(value)) {
        errors.push(`Field '${prop}' must be one of: ${propSchema.enum.join(', ')}`);
      }

      // Number range checks
      if (propSchema.type === 'number') {
        if (propSchema.minimum !== undefined && value < propSchema.minimum) {
          errors.push(`Field '${prop}' must be >= ${propSchema.minimum}`);
        }
        if (propSchema.maximum !== undefined && value > propSchema.maximum) {
          errors.push(`Field '${prop}' must be <= ${propSchema.maximum}`);
        }
      }

      // String length checks
      if (propSchema.type === 'string') {
        if (propSchema.minLength && value.length < propSchema.minLength) {
          errors.push(`Field '${prop}' must be at least ${propSchema.minLength} characters`);
        }
        if (propSchema.maxLength && value.length > propSchema.maxLength) {
          errors.push(`Field '${prop}' must be at most ${propSchema.maxLength} characters`);
        }
      }

      // Array checks
      if (propSchema.type === 'array') {
        if (propSchema.minItems && value.length < propSchema.minItems) {
          errors.push(`Field '${prop}' must have at least ${propSchema.minItems} items`);
        }

        // Validate array items
        if (propSchema.items && Array.isArray(value)) {
          value.forEach((item, idx) => {
            const itemErrors = validateSchema(item, propSchema.items);
            itemErrors.forEach(err => {
              errors.push(`${prop}[${idx}]: ${err}`);
            });
          });
        }
      }
    });
  }

  return errors;
}

// Validate agent output
function validateAgentOutput(agentName, output) {
  const schema = AGENT_SCHEMAS[agentName];

  if (!schema) {
    return [`Unknown agent: ${agentName}`];
  }

  return validateSchema(output, schema);
}

// Validate file
function validateFile(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const agentName = data.agentName;

    if (!agentName) {
      return {
        valid: false,
        errors: ['Missing agentName field']
      };
    }

    const errors = validateAgentOutput(agentName, data);

    return {
      valid: errors.length === 0,
      errors
    };

  } catch (error) {
    return {
      valid: false,
      errors: [`Failed to parse file: ${error.message}`]
    };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node schema-validator.js <file-path>');
    console.log('  node schema-validator.js --directory <dir-path>');
    process.exit(1);
  }

  if (args[0] === '--directory') {
    const dirPath = args[1];
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));

    console.log(`\n🔍 Validating ${files.length} files in ${dirPath}\n`);

    let totalValid = 0;
    let totalInvalid = 0;

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const result = validateFile(filePath);

      if (result.valid) {
        console.log(`✅ ${file}`);
        totalValid++;
      } else {
        console.log(`❌ ${file}`);
        result.errors.forEach(err => {
          console.log(`   - ${err}`);
        });
        totalInvalid++;
      }
    });

    console.log(`\n📊 Summary: ${totalValid} valid, ${totalInvalid} invalid\n`);

  } else {
    const filePath = args[0];
    const result = validateFile(filePath);

    console.log(`\n🔍 Validating ${filePath}\n`);

    if (result.valid) {
      console.log('✅ Valid schema');
    } else {
      console.log('❌ Invalid schema\n');
      result.errors.forEach(err => {
        console.log(`  - ${err}`);
      });
    }
    console.log('');
  }
}

module.exports = { validateAgentOutput, validateFile, validateSchema };
