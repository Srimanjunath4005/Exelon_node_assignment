const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const databasePath = path.join(__dirname, 'database.db');
let db = null;

const initializeTables = async () => {
  const sql = fs.readFileSync(path.join(__dirname, 'tables.sql')).toString();
  await db.exec(sql);
};


const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    // Initialize the tables
    await initializeTables();

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post('/cities', async (req, res) => {
  const { name, population, country, latitude, longitude } = req.body;
  try {
    const insertQuery = `
      INSERT INTO cities (name, population, country, latitude, longitude)
      VALUES('${name}', '${population}', '${country}', '${latitude}', '${longitude}');;
    `;
    await db.run(insertQuery);
    res.status(201).json({ message: 'City added successfully', city: req.body });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const { name, population, country, latitude, longitude } = req.body;
    try {
      const updateQuery = `
        UPDATE cities
        SET name = '${name}', population = '${population}', country = '${country}', latitude = '${latitude}', longitude = '${longitude}'
        WHERE id = '${id}';
      `;
      await db.run(updateQuery);
      res.json({ message: 'City updated successfully', city: req.body });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete('/cities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteQuery = `DELETE FROM cities WHERE id = '${id}';`;
        await db.run(deleteQuery);
        res.json({ message: 'City deleted successfully' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete('/cities/', async (req, res) => {
    const { name } = req.body;
    try {
        const deleteQuery = `DELETE FROM cities WHERE name = '${name}';`;
        await db.run(deleteQuery);
        res.json({ message: 'City deleted successfully' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get('/cities', async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        filter = '{}',
        sort = 'id',
        order = 'ASC',
        search = '',
        projection = '*'
      } = req.query;
  
      const filterObject = JSON.parse(filter);

      const whereClauses = [];
      Object.keys(filterObject).forEach(key => {
        whereClauses.push(`${key} = '${filterObject[key]}'`);
      });
  
      if (search) {
        whereClauses.push(`name LIKE '%${search}%'`);
      }
  
      const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
  
 
      const offset = (page - 1) * limit;

      const query = `
        SELECT ${projection}
        FROM cities
        ${whereClause}
        ORDER BY ${sort} ${order}
        LIMIT ${limit}
        OFFSET ${offset};
      `;
  
      const cities = await db.all(query);
  
      res.json(cities);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

