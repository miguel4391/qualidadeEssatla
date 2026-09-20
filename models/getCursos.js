var Curso = function getCurso(ies, anoLetivo, callback){
    var ano = anoLetivo.replace('_', '/');
	var sql = require('./dbconnection.js');
	sql.query("Select * from Qualidade.cursos where ies='" + ies + "' and anoLetivo like '" + ano + "';", function(err, result){
		if(err){
			console.log(err);
		}else{
			console.log('Curso', result);
			callback(null, result);
		}
	});
}

module.exports = Curso