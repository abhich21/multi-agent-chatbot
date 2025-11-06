const salesAgent = require('./salesAgent.js');
const reportAgent = require('./reportAgent.js');
const summaryAgent = require('./summaryAgent.js');

/**
 * Orchestrates the multi-agent workflow:
 * User message → Sales Agent → Report Agent → Summary Agent.
 * @param {string} userMessage
 * @returns {Promise<{finalSummary: string, agentSteps: Array<{name: string, output: string}>}>}
 */
exports.handleMessage = async (userMessage) => {
  console.log(`\n=== [AgentManager] Starting workflow for message: "${userMessage}" ===`);
  const agentSteps = [];
  let finalSummary = 'Workflow failed or incomplete.';

  try {
    // Step 1: Sales Agent — get raw sales data (DB or simulated)
    const rawSalesData = await salesAgent.fetchData(userMessage);
    agentSteps.push({
      name: 'Sales Agent',
      output: `Fetched revenue data for ${userMessage}. Weeks: ${rawSalesData.length} records.`
    });

    // Step 2: Report Agent — calculate metrics + generate LLM-based report
    const reportResult = await reportAgent.generateReport(rawSalesData);
    const { summaryObject, textOutput } = reportResult;
    agentSteps.push({
      name: 'Report Agent',
      output: textOutput
    });

    // Step 3: Summary Agent — produce concise final summary
    finalSummary = await summaryAgent.summarizeReport(reportResult);
    agentSteps.push({
      name: 'Summary Agent',
      output: finalSummary
    });

    console.log('=== [AgentManager] Workflow complete ===');
    return { finalSummary, agentSteps };
  } catch (error) {
    console.error('[AgentManager] Error:', error);
    agentSteps.push({
      name: 'System Error',
      output: `Error: ${error.message}`
    });
    return {
      finalSummary: `The workflow encountered an error: ${error.message}`,
      agentSteps
    };
  }
};
