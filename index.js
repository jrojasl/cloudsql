/**Express */
const express = require('express');
/**Inicializar express */
const app = express();
/**MySQL */
const mysql = require('mysql');
const { getCinemas, insertCinema, updateCinema, deleteCinema, createTable } = require('./execSql');
const { admin } = require('./firebase');
var serviceAccount = require("./reviewappja-firebase-adminsdk-6gi82-dc58c7328a.json");
const { getFirestore } = require('firebase-admin/firestore');

const { connect, TeatroModel } = require('./mongo');

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
/**Connect mongo */
connect();

admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

const firestore = getFirestore();

app.get('/places', async (req, res) => {
    try {
        const snap = await firestore.collection('places').get()
        res.json(snap.docs.map(doc => doc.data()));
    } catch (error) {
        res.status(400).json(error);
    }
})

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
app.get('/teatros', async(req,res)=>{
    try {
        // Creo variable donde guardo los teatros
        const teatros= await TeatroModel.find()
        res.json(teatros);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.post('/teatros', async(req, res) =>{
    const {nombre, direccion} = req.body;
    try {
        const result = await TeatroModel.create({nombre,direccion})
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
app.put('/teatros/:id', async(req, res)=> {
    const {nombre, direccion} = req.body;
    const {id} = req.params;
    try {
        const result = await TeatroModel.findByIdAndUpdate(id,{nombre,direccion});
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }

});
app.delete('/teatros/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await TeatroModel.findByIdAndDelete(id);
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})

/**Listen */
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});