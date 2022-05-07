const createTable = (connection) => {
    const insertQuery = `CREATE TABLE Cines(
        CineId INT NOT NULL AUTO_INCREMENT,
        Nombre VARCHAR(50),
        Direccion VARCHAR(50),
        PRIMARY KEY (CineId)
    );`;
    connection.query(insertQuery, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(result);
    });
}

const getCinemas = (connection) => {
    const getQuery = `SELECT * FROM Cines`;
    return new Promise((res, rej)=> {
        connection.query(getQuery, (err, result) => {
            if (err) {
                rej(err);
                return;
            }
            res(result);
        });
    })
}

const insertCinema = (connection, data) => {
    const {nombre, direccion} = data;
    const insertQuery = `INSERT INTO Cines (Nombre, Direccion) VALUES ('${nombre}','${direccion}')`;
    return new Promise((res, rej)=> {
        connection.query(insertQuery, (err, result) => {
            if (err) {
                rej(err);
                return;
            }
            res(result);
        });
    })
}

const updateCinema = (connection, data, id) => {
    const {nombre, direccion} = data;
    const updateQuery = `UPDATE Cines SET Nombre='${nombre}', Direccion='${direccion}' WHERE CineId = ${id}`;
    return new Promise((res, rej)=> {
        connection.query(updateQuery, (err, result) => {
            if (err) {
                rej(err);
                return;
            }
            res(result);
        });
    })
}

const deleteCinema = (connection, id) => {
    const deleteQuery = `DELETE FROM Cines WHERE CineId = ${id}`;
    return new Promise((res, rej)=> {
        connection.query(deleteQuery, (err, result) => {
            if (err) {
                rej(err);
                return;
            }
            res(result);
        });
    })
}

module.exports = {createTable, getCinemas, insertCinema, updateCinema, deleteCinema}