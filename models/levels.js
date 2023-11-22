// PostgreSQL client setup
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'Your_PostgreSQL_Connection_String' // Replace with your actual connection string
});

class LevelsSchema {
    static async create(userID, guildID) {
        const query = `INSERT INTO levels (user_id, guild_id, xp, level, last_updated) 
                    VALUES ($1, $2, 0, 0, CURRENT_TIMESTAMP);`;
        await pool.query(query, [userID, guildID]);
    }

    static async findByUserIdAndGuildId(userID, guildID) {
        const query = `SELECT * FROM levels WHERE user_id = $1 AND guild_id = $2;`;
        const res = await pool.query(query, [userID, guildID]);
        return res.rows[0];
    }

    static async updateXPAndLevel(userID, guildID, xp, level) {
        const query = `UPDATE levels SET xp = $3, level = $4, last_updated = CURRENT_TIMESTAMP 
                    WHERE user_id = $1 AND guild_id = $2;`;
        await pool.query(query, [userID, guildID, xp, level]);
    }

    // Add other methods as required
}

module.exports = LevelsSchema;
