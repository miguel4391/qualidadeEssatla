var Curso = function getCurso(ce, callback){
	var sql = require('./dbconnection.js');
	sql.query("Select * from Qualidade.cursos where sigla='" + ce + "';", function(err, result){
		if(err){
			console.log(err);
		}else{
			console.log('Curso', result);
			callback(null, result);
		}
	});
}

module.exports = Curso
