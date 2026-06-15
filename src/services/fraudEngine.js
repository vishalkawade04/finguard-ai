const RISKY_LOCATION_KEYWORDS = [
  "high risk",
  "sanctioned",
  "unknown",
  "unverified",
  "international",
  "cross border",
  "dark web",
  "nigeria",
  "russia",
  "north korea",
  "iran"
];

function calculateRisk(transaction = {}, context = {}) {

  // Collect reasons in a Set to avoid duplicates and ensure deterministic ordering
  const riskReasonSet = new Set();
  const amount = Number(transaction.amount || 0);
  const location = String(transaction.location || "").trim();
  const transactionDate =
    transaction.createdAt
      ? new Date(transaction.createdAt)
      : new Date();

  const recentUserTransactions =
    Array.isArray(context.recentUserTransactions)
      ? context.recentUserTransactions
      : [];

  const duplicateTransactions =
    Array.isArray(context.duplicateTransactions)
      ? context.duplicateTransactions
      : [];

  // Use helper functions to accumulate score and reasons (now using the Set)
  let riskScore = 0;
  riskScore += calculateAmountRisk(amount, riskReasonSet);
  riskScore += calculateDuplicateRisk(duplicateTransactions, riskReasonSet);
  riskScore += calculateRecentActivityRisk(recentUserTransactions, riskReasonSet);
  riskScore += calculateVelocityRisk(recentUserTransactions, transactionDate, riskReasonSet);
  riskScore += calculateLocationRisk(location, riskReasonSet);
  riskScore += calculateOffHoursRisk(transactionDate, riskReasonSet);

  // Clamp and normalize riskScore to an integer between 0 and 100
  riskScore = Math.max(0, Math.min(100, Math.round(riskScore)));

  // Convert Set to sorted array for deterministic outputs
  const riskReason = Array.from(riskReasonSet).sort();

  const riskLevel = getRiskLevel(riskScore);
  const explanation = buildExplanation({ amount, location, riskScore, riskLevel, riskReason });
  const recommendedAction = getRecommendedAction(riskLevel);

  return { riskScore, riskLevel, riskReason, explanation, recommendedAction };
}

function calculateAmountRisk(amount, riskReason) {
  if (amount >= 100000) {
    riskReason.add('Very high transaction amount');
    return 35;
  }

  if (amount >= 50000) {
    riskReason.add('High transaction amount');
    return 25;
  }

  if (amount >= 10000) {
    riskReason.add('Elevated transaction amount');
    return 15;
  }

  return 0;
}

function calculateDuplicateRisk(duplicateTransactions, riskReason) {
  if (!Array.isArray(duplicateTransactions) || duplicateTransactions.length === 0) {
    return 0;
  }

  riskReason.add('Duplicate transaction pattern detected');
  return duplicateTransactions.length >= 2 ? 30 : 22;
}

function calculateRecentActivityRisk(recentUserTransactions, riskReason) {
  const count = Array.isArray(recentUserTransactions) ? recentUserTransactions.length : 0;

  if (count >= 5) {
    riskReason.add('Unusually high recent user activity');
    return 25;
  }

  if (count >= 3) {
    riskReason.add('Multiple recent user transactions');
    return 15;
  }

  return 0;
}

function calculateVelocityRisk(recentUserTransactions, transactionDate, riskReason) {
  const oneMinuteAgo = new Date(transactionDate.getTime() - 60 * 1000);
  const transactionsInLastMinute = Array.isArray(recentUserTransactions)
    ? recentUserTransactions.filter((item) => {
        const createdAt = item && item.createdAt ? new Date(item.createdAt) : null;
        return createdAt && createdAt >= oneMinuteAgo;
      })
    : [];

  if (transactionsInLastMinute.length >= 3) {
    riskReason.add('High transaction velocity within one minute');
    return 25;
  }

  if (transactionsInLastMinute.length >= 2) {
    riskReason.add('Elevated transaction velocity within one minute');
    return 15;
  }

  return 0;
}

function calculateLocationRisk(location, riskReason) {
  if (!location) {
    riskReason.add('Missing transaction location');
    return 15;
  }

  const normalizedLocation = String(location).toLowerCase();
  const isRiskyLocation = RISKY_LOCATION_KEYWORDS.some((keyword) => normalizedLocation.includes(keyword));

  if (!isRiskyLocation) return 0;

  riskReason.add('Risky or unverified transaction location');
  return 20;
}

function calculateOffHoursRisk(transactionDate, riskReason) {
  const hour = transactionDate.getHours();
  if (hour >= 0 && hour < 6) {
    riskReason.add('Off-hours transaction timing');
    return 15;
  }
  return 0;
}

function getRiskLevel(riskScore) {

  if (riskScore >= 75) {

    return "High";

  }

  if (riskScore >= 45) {

    return "Medium";

  }

  return "Low";
}

function getRecommendedAction(riskLevel) {
  if (riskLevel === 'High') return 'Block or hold this transaction for manual fraud review.';
  if (riskLevel === 'Medium') return 'Approve with additional verification or monitor the customer session.';
  return 'Approve and continue passive monitoring.';
}

function buildExplanation(risk) {
  if (!Array.isArray(risk.riskReason) || risk.riskReason.length === 0) {
    return 'This transaction is low risk because no fraud risk rules were triggered.';
  }

  const reasonText = risk.riskReason.map((reason) => String(reason).toLowerCase()).join(', ');
  return `This transaction is ${String(risk.riskLevel).toLowerCase()} risk with a risk score of ${risk.riskScore} because ${reasonText}.`;
}

module.exports = calculateRisk;
module.exports.getRecommendedAction = getRecommendedAction;
