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

  const riskReason = [];
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

  let riskScore = calculateAmountRisk(amount, riskReason);

  riskScore += calculateDuplicateRisk(duplicateTransactions, riskReason);
  riskScore += calculateRecentActivityRisk(recentUserTransactions, riskReason);
  riskScore += calculateVelocityRisk(recentUserTransactions, transactionDate, riskReason);
  riskScore += calculateLocationRisk(location, riskReason);
  riskScore += calculateOffHoursRisk(transactionDate, riskReason);

  riskScore = Math.min(riskScore, 100);

  const riskLevel = getRiskLevel(riskScore);
  const explanation =
    buildExplanation({
      amount,
      location,
      riskScore,
      riskLevel,
      riskReason
    });
  const recommendedAction = getRecommendedAction(riskLevel);

  return {
    riskScore,
    riskLevel,
    riskReason,
    explanation,
    recommendedAction
  };
}

function calculateAmountRisk(amount, riskReason) {

  if (amount >= 100000) {

    riskReason.push("Very high transaction amount");
    return 35;

  }

  if (amount >= 50000) {

    riskReason.push("High transaction amount");
    return 25;

  }

  if (amount >= 10000) {

    riskReason.push("Elevated transaction amount");
    return 15;

  }

  return 0;
}

function calculateDuplicateRisk(duplicateTransactions, riskReason) {

  if (duplicateTransactions.length === 0) {

    return 0;

  }

  riskReason.push("Duplicate transaction pattern detected");
  return duplicateTransactions.length >= 2 ? 30 : 22;
}

function calculateRecentActivityRisk(recentUserTransactions, riskReason) {

  if (recentUserTransactions.length >= 5) {

    riskReason.push("Unusually high recent user activity");
    return 25;

  }

  if (recentUserTransactions.length >= 3) {

    riskReason.push("Multiple recent user transactions");
    return 15;

  }

  return 0;
}

function calculateVelocityRisk(recentUserTransactions, transactionDate, riskReason) {

  const oneMinuteAgo = new Date(transactionDate.getTime() - 60 * 1000);
  const transactionsInLastMinute =
    recentUserTransactions.filter((item) => {
      const createdAt = item.createdAt ? new Date(item.createdAt) : null;
      return createdAt && createdAt >= oneMinuteAgo;
    });

  if (transactionsInLastMinute.length >= 3) {

    riskReason.push("High transaction velocity within one minute");
    return 25;

  }

  if (transactionsInLastMinute.length >= 2) {

    riskReason.push("Elevated transaction velocity within one minute");
    return 15;

  }

  return 0;
}

function calculateLocationRisk(location, riskReason) {

  if (!location) {

    riskReason.push("Missing transaction location");
    return 15;

  }

  const normalizedLocation = location.toLowerCase();
  const isRiskyLocation =
    RISKY_LOCATION_KEYWORDS.some((keyword) =>
      normalizedLocation.includes(keyword)
    );

  if (!isRiskyLocation) {

    return 0;

  }

  riskReason.push("Risky or unverified transaction location");
  return 20;
}

function calculateOffHoursRisk(transactionDate, riskReason) {

  const hour = transactionDate.getHours();

  if (hour >= 0 && hour < 6) {

    riskReason.push("Off-hours transaction timing");
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

  if (riskLevel === "High") {

    return "Block or hold this transaction for manual fraud review.";

  }

  if (riskLevel === "Medium") {

    return "Approve with additional verification or monitor the customer session.";

  }

  return "Approve and continue passive monitoring.";
}

function buildExplanation(risk) {

  if (risk.riskReason.length === 0) {

    return "This transaction is low risk because no fraud risk rules were triggered.";

  }

  const reasonText =
    risk.riskReason
      .map((reason) => reason.toLowerCase())
      .join(", ");

  return `This transaction is ${risk.riskLevel.toLowerCase()} risk with a risk score of ${risk.riskScore} because ${reasonText}.`;
}

module.exports = calculateRisk;
module.exports.getRecommendedAction = getRecommendedAction;
