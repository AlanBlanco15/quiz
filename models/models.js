var path = require('path');


// Postgres DATABASE_URL = postgres:user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = ( url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

/////
var Sequelize = require('sequelize');

// Usar BBDD SQlite o Posrtgres:
var sequelize = new Sequelize(DB_name,user,pwd,
                              { 
                                dialect: protocol,
                                protocol:protocol,
                                port:port,
                                host:host, 
                                storage: storage, // solo sqlite
                                omitNull:true // solo postgres
                              }
                              );


// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);


exports.Quiz = Quiz;

sequelize.sync().success(function() {
	Quiz.count().success(function(count){
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma'
		});
	Quiz.create({ pregunta: 'Capital de Portugal',
				    respuesta: 'Lisboa'
		})
	.success(function(){console.log('Base de datos inicializada')});
		};
	});
});