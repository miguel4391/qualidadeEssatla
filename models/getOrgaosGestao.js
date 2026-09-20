var orgGest = function getOrgaoGestao(callback){
    var sql = require('./dbconnection.js');

    sql.query("SELECT * FROM Qualidade.tbOpcaoOrgaoGestao where essatla = 1 order by idtbOpcaoOrgaoGestao;", function(err, result){
        if(err){
            console.log(err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = orgGest;