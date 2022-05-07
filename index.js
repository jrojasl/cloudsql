/**Express */
const express = require('express');
/**Inicializar express */
const app = express();
/**MySQL */
const mysql = require('mysql');
const { getCinemas, insertCinema, updateCinema, deleteCinema, createTable } = require('./execSql');

/**Comunicación por JSON */
app.use(express.json());
/**Conecction to mysql */
const connection = mysql.createConnection({
    host: 'bzytc2wljpjc4c4ih8vb-mysql.services.clever-cloud.com',
    user: 'ukqxavkir6knzgj4',
    password: '7NHM38WFD51eTWaTlUCP',
    database: 'bzytc2wljpjc4c4ih8vb',
});

connection.connect(err => {
  if (err) {
      console.error('error connecting: ' + err.stack);
      throw err;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/cines', async (req, res)=> {
    try {
        const result = await getCinemas(connection)
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.post('/cines', async (req, res)=> {
    try {
        const result = await insertCinema(connection, req.body)
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.put('/cines/:id', async (req, res)=> {
    const {id} =req.params;
    try {
        const result = await updateCinema(connection, req.body, id)
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete('/cines/:id', async (req, res)=> {
    const {id} =req.params;
    try {
        const result = await deleteCinema(connection, id)
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

/**Listen */
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});