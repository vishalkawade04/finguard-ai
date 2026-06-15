const calculateRisk = require('../fraudEngine');

describe('Fraud engine deterministic scoring', () => {
  test('Low amount should be Low risk', () => {
    const tx = { amount: 100, location: 'Mumbai' };
    const res = calculateRisk(tx, { recentUserTransactions: [], duplicateTransactions: [] });
    expect(res.riskLevel).toBe('Low');
    expect(typeof res.riskScore).toBe('number');
  });

  test('Very high amount => High risk', () => {
    const tx = { amount: 150000, location: 'Mumbai' };
    const res = calculateRisk(tx, { recentUserTransactions: [], duplicateTransactions: [] });
    // Very high amounts should trigger the amount reason and significantly increase score
    expect(res.riskReason).toEqual(expect.arrayContaining([expect.stringMatching(/Very high transaction amount/i)]));
    expect(res.riskScore).toBeGreaterThanOrEqual(30);
  });

  test('Duplicate transactions increase score', () => {
    const tx = { amount: 500, location: 'Mumbai' };
    const context = { duplicateTransactions: [{}, {}], recentUserTransactions: [] };
    const res = calculateRisk(tx, context);
    expect(res.riskReason).toEqual(expect.arrayContaining([expect.stringMatching(/Duplicate/)]));
  });

  test('Off-hours transaction adds risk', () => {
    const night = new Date();
    night.setHours(2);
    const tx = { amount: 200, location: 'Mumbai', createdAt: night.toISOString() };
    const res = calculateRisk(tx, { recentUserTransactions: [], duplicateTransactions: [] });
    expect(res.riskReason.some(r => /Off-hours/i.test(r))).toBe(true);
  });
});
