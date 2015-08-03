var models = require('../models/models.js');

//GET /quizes

exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta})
	})
	
};
//get answer
exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else{
		res.render('quizes/answer',{respuesta: 'Incorrecto'});

	}

	})
	
};