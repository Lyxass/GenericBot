
class UserDAO {

    static getNumberKickById = function (db, id,callback) {
        let sql = "SELECT kick FROM user WHERE id = ? ";
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("Resultat :" +row + " " + err);
            if(row === undefined){
                console.log(id + " n'existe pas ! : ");
                UserDAO.insertUser(db,id,0,() =>{
                    UserDAO.getNumberKickById(db,id,callback);
                    return;
                });

            } else{
                callback(null,row.kick);
                return;
            }

        });
    }

    static setNumberKickById = function (db, id, newValue,callback) {
        let sql = "UPDATE user set kick = ? WHERE id = ? ";
        db.run(sql, [newValue,id], (err) => {
            if (err) {
                console.log(err)
                return;
            }
            callback(null,null);
        });


    }

    static insertUser = function(db, id, newValue,callback){
        console.log("Insertion de " + id);
        let sql = "INSERT INTO user VALUES(?,?) ";
        db.run(sql, [id,newValue], (err) => {
            if (err) {
                console.log(err)
                return;
            }
            callback(null,null);
        });
    }


}
module.exports = UserDAO;