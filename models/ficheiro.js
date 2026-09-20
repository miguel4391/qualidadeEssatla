var Ficheiro = function getFicheiros(tipo, callback){
    var sql = require('./dbconnection.js');

    sql.query("SELECT `Id`,`nome`,`tipo`,`path`,`cod`,`departamento` FROM `ficheiros` WHERE `tipo` LIKE '" + tipo + "' and emVigor = 1 and essatla=1 ORDER BY `cod`, `nome`", function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log('Ficheiros', result);
            callback(null, result);
        }
    });
}

module.exports = Ficheiro;
