var mysql = require('mysql2');

var connection = mysql.createPool({
    host    : '127.0.0.1',
    user    : 'sigqdev',
    password: 'S1gq@tla',
    database: 'Qualidade',
	waitForConnection: true,
	connectionLimmit: 10,
	queueLimmit: 0
});


module.exports = connection;
