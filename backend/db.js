const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool without specifying database initially
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  database: process.env.DB_DATABASE, 
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // Accept self-signed certificates
    // For production, it's better to provide the CA certificate
    // ca: fs.readFileSync('/path/to/ca-certificate.crt')
  }
});

// Export the pool as a promise
module.exports = pool.promise();

// Export a function to create the database and tables
module.exports.createDatabaseAndTables = async () => {
  try {
    // First create the database
    pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
    
    // Select the database
    pool.query(`USE ${process.env.DB_DATABASE}`);
    
    // Create tables
    pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        school_name VARCHAR(255),
        contact_person VARCHAR(255),
        phone_number VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        zip_code VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    pool.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL
      )
    `);
    
    console.log('Database and tables created successfully');
  } catch (error) {
    console.error('Error creating database and tables:', error);
    throw error;
  }
};
