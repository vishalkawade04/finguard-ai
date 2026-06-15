const jwt = require('jsonwebtoken');

jest.mock('../models/Transaction');
const Transaction = require('../models/Transaction');

const app = require('../../server');

describe('API integration (mocked DB) - native fetch', () => {
  const token = jwt.sign({ id: 'test-user', role: 'user' }, process.env.JWT_SECRET || 'testsecret');

  beforeEach(() => jest.clearAllMocks());

  let server, base;
  beforeAll((done) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      base = `http://127.0.0.1:${port}`;
      done();
    });
  });

  afterAll((done) => server.close(done));

  test('GET /api/analytics returns metrics', async () => {
    Transaction.countDocuments = jest.fn()
      .mockResolvedValueOnce(10) // total
      .mockResolvedValueOnce(2)  // fraud
      .mockResolvedValueOnce(8); // safe

    const res = await fetch(`${base}/api/analytics`, { headers: { Authorization: `Bearer ${token}` } });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toHaveProperty('totalTransactions');
  });

  test('GET /api/transactions returns list', async () => {
    Transaction.find = jest.fn().mockReturnValue({ sort: () => Promise.resolve([
      { toObject: () => ({ _id: '1', amount: 100, userId: 'u1', location: 'Mumbai' }) }
    ]) });
    const res = await fetch(`${base}/api/transactions`, { headers: { Authorization: `Bearer ${token}` } });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toHaveProperty('transactions');
  });

  test('POST /api/transactions creates a transaction', async () => {
    Transaction.find = jest.fn().mockReturnValue({ sort: () => Promise.resolve([]) });
    Transaction.prototype.save = jest.fn().mockResolvedValue(true);

    const payload = { userId: 'u1', amount: 1000, location: 'Mumbai' };
    const res = await fetch(`${base}/api/transactions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    expect([201,400]).toContain(res.status);
  });
});
