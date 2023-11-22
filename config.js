/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-inline-comments */
/**
 * Config file for the database framework connection
 */

// config.js
// config.js
const databaseType = 'postgres'; // Change this to 'mongo' as needed


// If you do not want to use the connection string (url) comment these 2 constants out
const postgresConfig = {
    postgresUrl: process.env.POSTGRES_URL, // PostgreSQL connection string from environment variable
};
const mongoConfig = {
    mongoUrl: process.env.MONGO_URL, // MongoDB URL from environment variable
};


// Uncomment these 2 constants if you dont want to use the connection string (url) above

// const postgresConfig = {
    // user: 'postgres', // PostgreSQL user
    // password: '<PASSWORD>', // PostgreSQL password
    // host: 'localhost', // PostgreSQL host
    // port: 5432, // PostgreSQL port
    // database: 'test', // PostgreSQL database
// };
// const mongoConfig = {
    // user: 'root', // MongoDB user
    // password: '<PASSWORD>', // MongoDB password
    // host: 'localhost', // MongoDB host
    // port: 27017, // MongoDB port
    // database: 'test', // MongoDB database
    // collection: 'test', // MongoDB collection
// };


const config = {
    'postgres': postgresConfig,
    'mongo': mongoConfig,
};

module.exports = config[databaseType];

