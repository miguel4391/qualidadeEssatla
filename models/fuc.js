var Fuc = function getFucs(curso, uc, ano, callback){
	var sql = require('./dbconnection.js');

	sql.query("select * from fuc_shw where nomeCE like '" + curso + "' and nomeUCPt like '" + uc + "' and anoLetivoFuc = '" + ano + "';", function(err, result){
		if(err){
			console.log(err)
		}else{
			console.log("Fuc", result);
			callback(null, result);
		}
	});
}

module.exports = Fuc;
