const sqlite3 = require('sqlite3').verbose();

class BDDConnexion{
    static initConnexion = function (bot){
        bot.db = new sqlite3.Database('bdd.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });
    }
}

module.exports = BDDConnexion;