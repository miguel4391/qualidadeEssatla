var opcao = function getOpcao(callback){
    var sql = require('./dbconnection.js');

    sql.query("SELECT * FROM Qualidade.tbOpcaoCatDocente where catEssatla=1;", function(err, result){
        if(err){
            console.log(err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = opcao;