const authController = require('../authController');
const User = require('../../models/User');

jest.mock('../../models/User');

describe('Auth Controller (basic)', () => {
  afterEach(() => jest.clearAllMocks());

  test('registerUser returns 400 if missing fields', async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await authController.registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('loginUser returns 400 for invalid credentials', async () => {
    const req = { body: { email: 'x', password: 'y' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    User.findOne.mockResolvedValue(null);
    await authController.loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
