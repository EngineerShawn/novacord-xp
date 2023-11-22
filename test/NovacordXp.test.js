const NovacordXp = require('../index.js');
const { Pool } = require('pg'); // Import Pool
const rewards = require('../models/rewards');
const levels = require('../models/levels');

// If you're using dotenv in your project, uncomment the following line
require('dotenv').config();

jest.mock('pg', () => {
	const mPool = {
		query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
		connect: jest.fn(),
	};
	return { Pool: jest.fn(() => mPool) };
});
jest.mock('../models/rewards', () => ({
    findOne: jest.fn(),
    // ... other mocked functions ...
}));
describe('NovacordXp', () => {
	let mockPool;

	beforeEach(() => {
		// Reset mocks before each test and set up a new mockPool
		Pool.mockClear();
		rewards.findOne.mockClear();
        mockPool = new Pool();
	});

	it('should set a database URL', async () => {
		const dbUrl = process.env.POSTGRES_URL; // Corrected to use process.env
		await NovacordXp.setURL(dbUrl);
		expect(Pool).toHaveBeenCalledWith({ connectionString: dbUrl });
	});

	it('should create a new role reward', async () => {
		const guildId = '123456';
		const level = 5;
		const roleId = 'role123';
		mockPool.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
		mockPool.query.mockResolvedValueOnce({ rowCount: 1 });

		const result = await NovacordXp.createRoleReward(guildId, level, roleId);
		expect(result).toEqual({ action: 'inserted', guildId, level, roleId });
		expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [guildId, level, roleId]);
	});

	it('should update an existing role reward', async () => {
		const guildId = '123456';
		const level = 5;
		const roleId = 'newRole123';

		const existingReward = { guild_id: guildId, level: level, role_id: 'oldRole123' };
		mockPool.query.mockResolvedValueOnce({ rows: [existingReward], rowCount: 1 });
		mockPool.query.mockResolvedValueOnce({ rowCount: 1 });

		const result = await NovacordXp.createRoleReward(guildId, level, roleId);
		expect(result).toBeTruthy();
		expect(result.action).toBe('updated');
		expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [roleId, guildId, level]);
	});

    // it('should delete a role reward', async () => {
    //     const guildId = '123456';
    //     const level = 5;
    //     const mockReward = { guildID: guildId, level: level, roleId: 'role123' };

    //     // Mocking the rewards.findOne method
    //     rewards.findOne.mockResolvedValue(mockReward);

    //     const result = await NovacordXp.deleteRoleReward(guildId, level);
    //     expect(result).toEqual({ action: 'deleted', guildId, level });
    //     expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [guildId, level]);
    // });

	// Additional test cases for createUser, deleteUser, setXp, setLevel, etc.

	// Add more test cases as needed
});