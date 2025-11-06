const { generateText } = require('../utils/aiClient');

/**
 * Produces a short executive summary using Gemini 1.5 Flash.
 * @param {{summaryObject: object, textOutput: string}} report
 * @returns {Promise<string>}
 */
exports.summarizeReport = async (report) => {
  console.log('[Summary Agent] Generating final summary…');
  const { summaryObject, textOutput } = report;
  const { totalRevenue, averageWeeklyRevenue, growth } = summaryObject;

  const prompt = `
Based on the following report, write a one-sentence executive summary for stakeholders.
Keep it professional, clear, and preserve all numbers.

Report:
${textOutput}

Metrics:
Total Revenue $${totalRevenue}, Average Weekly $${averageWeeklyRevenue}, Growth ${growth}.
`;

  const summary = await generateText(prompt, 'You are an executive summarizer.');
  console.log('[Summary Agent] Gemini summary ready.');
  return summary;
};
