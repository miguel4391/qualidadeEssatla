let Lista = function getDossier(callback){
	var sql = require('./dbconnection.js');
	sql.query("SELECT * FROM Qualidade.fichaDoc_slt where vinculoIes = 'E';", (err, result)=> {
		if(err){
			console.log(err);
		}else{
			console.log('Lista: ', result);
			callback(null, result);
		}
	});
}

module.exports = Lista