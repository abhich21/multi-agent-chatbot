const Sales = require("../models/salesModel");

exports.fetchData = async (userMessage) => {
  console.log(`[Sales Agent] Fetching revenue data for message: "${userMessage}"`);

  const monthMatch = userMessage.match(
    /january|february|march|april|may|june|july|august|september|october|november|december/i
  );
  const month = monthMatch
    ? monthMatch[0].charAt(0).toUpperCase() + monthMatch[0].slice(1).toLowerCase()
    : "October";

  const docs = await Sales.find({
    month: { $regex: new RegExp(`^${month}$`, "i") },
  })
    .sort({ week: 1 })
    .lean();

  if (!docs || docs.length === 0) {
    console.warn(`[Sales Agent] No sales data found for ${month}.`);
    return [];
  }

  console.log(`[Sales Agent] Found ${docs.length} records for ${month}.`);
  return docs.map((d) => ({ week: d.week, amount: d.amount }));
};
