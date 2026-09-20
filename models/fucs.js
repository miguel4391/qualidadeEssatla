var Fuc = function getFucs(curso,ano, callback){
	var sql = require('./dbconnection.js');

	sql.query("select * from Qualidade.fuc_shw where curso_sigla like '" + curso + "' and anoLetivoFuc like '"+ano.replace('_','/')+"' order by ano, semestre;", function(err, result){
		if(err){
			console.log(err)
		}else{
			//console.log("Fuc", result);
			callback(null, result);
		}
	});
}

module.exports = Fuc;
