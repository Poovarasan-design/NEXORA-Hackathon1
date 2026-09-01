import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let pool = null;
let useFallback = false;
const fallbackFilePath = path.resolve(process.cwd(), 'registrations_fallback.json');

// Local in-memory / JSON fallback store initialization
let fallbackMemoryStore = [];
if (fs.existsSync(fallbackFilePath)) {
  try {
    const raw = fs.readFileSync(fallbackFilePath, 'utf8');
    fallbackMemoryStore = JSON.parse(raw);
  } catch (err) {
    fallbackMemoryStore = [];
  }
}

async function initDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nexora_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 3000
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('[DB] Connected to MySQL Database successfully.');
    
    // Ensure table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        team_leader_name VARCHAR(255) NOT NULL,
        college_name VARCHAR(255) NOT NULL,
        department_year VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        whatsapp_number VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        team_size INT NOT NULL,
        theme VARCHAR(255) NOT NULL,
        team_members JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure team_members column exists if table was created previously without it
    try {
      await connection.query(`ALTER TABLE registrations ADD COLUMN team_members JSON NULL`);
    } catch (e) {
      // Column already exists
    }

    connection.release();
  } catch (err) {
    console.warn('[DB Warning] MySQL connection failed. Operating in JSON fallback mode:', err.message);
    useFallback = true;
  }
}

initDB();

export async function saveRegistration(data) {
  const membersJson = JSON.stringify(data.teamMembers || []);

  if (!useFallback && pool) {
    try {
      const sql = `
        INSERT INTO registrations 
        (team_name, team_leader_name, college_name, department_year, phone_number, whatsapp_number, email, team_size, theme, team_members) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.teamName,
        data.teamLeaderName,
        data.collegeName,
        data.departmentYear,
        data.phoneNumber,
        data.whatsappNumber,
        data.email,
        data.teamSize,
        data.theme,
        membersJson
      ];
      const [result] = await pool.execute(sql, values);
      return { id: result.insertId, ...data, createdAt: new Date() };
    } catch (dbErr) {
      console.error('[DB Error] Failed to write to MySQL, saving to fallback:', dbErr.message);
    }
  }

  // Fallback storage
  const newEntry = {
    id: fallbackMemoryStore.length + 1,
    team_name: data.teamName,
    team_leader_name: data.teamLeaderName,
    college_name: data.collegeName,
    department_year: data.departmentYear,
    phone_number: data.phoneNumber,
    whatsapp_number: data.whatsappNumber,
    email: data.email,
    team_size: data.teamSize,
    theme: data.theme,
    team_members: data.teamMembers || [],
    created_at: new Date().toISOString()
  };
  fallbackMemoryStore.push(newEntry);
  try {
    fs.writeFileSync(fallbackFilePath, JSON.stringify(fallbackMemoryStore, null, 2));
  } catch (fsErr) {
    console.error('Failed writing fallback storage file:', fsErr);
  }
  return newEntry;
}

export async function getRegistrations() {
  if (!useFallback && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM registrations ORDER BY created_at DESC');
      return rows;
    } catch (err) {
      console.error('[DB Error] Falling back to memory store for reading:', err.message);
    }
  }
  return fallbackMemoryStore;
}
