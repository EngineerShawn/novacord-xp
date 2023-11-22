// PostgreSQL client setup
const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();
const env = process.env;


const pool = new Pool({
    connectionString: 'Your_PostgreSQL_Connection_String' // Replace with your actual connection string
});

class RewardsSchema {
    static async create(guildID, rewards) {
        const query = `INSERT INTO rewards (guild_id, rewards, last_updated) 
                       VALUES ($1, $2::jsonb, CURRENT_TIMESTAMP);`;
        await pool.query(query, [guildID, JSON.stringify(rewards)]);
    }

    static async findByGuildId(guildID) {
        const query = `SELECT * FROM rewards WHERE guild_id = $1;`;
        const res = await pool.query(query, [guildID]);
        return res.rows[0];
    }

    static async updateRewards(guildID, rewards) {
        const query = `UPDATE rewards SET rewards = $2::jsonb, last_updated = CURRENT_TIMESTAMP 
                       WHERE guild_id = $1;`;
        await pool.query(query, [guildID, JSON.stringify(rewards)]);
    }

    // Add other methods as required
}

module.exports = RewardsSchema;
