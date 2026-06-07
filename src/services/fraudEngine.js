function calculateRisk(transaction) {

  let score = 0;
  let reasons = [];

  if (transaction.amount > 50000) {
    score += 50;
    reasons.push("Large transaction amount");
  }

  const hour = new Date().getHours();

  if (hour < 6) {
    score += 20;
    reasons.push("Transaction at unusual time");
  }

  if (transaction.amount > 100000) {
    score += 30;
    reasons.push("Very high transaction amount");
  }

  return {
    score,
    level:
      score >= 80
        ? "High"
        : score >= 40
        ? "Medium"
        : "Low",
    reasons
  };
}

module.exports = calculateRisk;
