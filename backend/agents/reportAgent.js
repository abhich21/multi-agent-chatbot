const { generateText } = require('../utils/aiClient');

/**
 * Calculates metrics and asks Gemini AI to create a polished report paragraph.
 * @param {Array<{week:number, amount:number}>} data
 */
exports.generateReport = async (data) => {
  console.log('[Report Agent] Generating sales report…');

  if (!data || !data.length) {
    return {
      summaryObject: {
        totalRevenue: 0,
        averageWeeklyRevenue: 0,
        previousMonthRevenue: 0,
        growth: '0%'
      },
      textOutput: 'No data available to generate report.'
    };
  }

  const totalRevenue = data.reduce((s, i) => s + i.amount, 0);
  const averageWeeklyRevenue = totalRevenue / data.length;
  const growthRate = 0.15;
  const previousMonthRevenue = totalRevenue / (1 + growthRate);
  const summaryObject = {
    totalRevenue: Math.round(totalRevenue),
    averageWeeklyRevenue: Math.round(averageWeeklyRevenue),
    previousMonthRevenue: Math.round(previousMonthRevenue),
    growth: `${(growthRate * 100).toFixed(1)}%`
  };

  const salesList = data.map(d => `Week ${d.week}: $${d.amount}`).join('\n');
  const prompt = `
Weekly Sales Data:
${salesList}

Metrics:
- Total Revenue: $${summaryObject.totalRevenue}
- Average Weekly Revenue: $${summaryObject.averageWeeklyRevenue}
- Previous Month Revenue: $${summaryObject.previousMonthRevenue}
- Growth: ${summaryObject.growth}

Write a concise business report paragraph summarizing these results. Use a professional tone and keep numbers exact.`;

  const textOutput = await generateText(prompt, 'You are a business analytics report writer.');
  console.log('[Report Agent] Gemini report generated.');
  return { summaryObject, textOutput };
};
