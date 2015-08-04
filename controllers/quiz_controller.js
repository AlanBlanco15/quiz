var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
    models.Quiz.find(quizId).then(
    	function(quiz){
            if (quiz) {
                req.quiz = quiz;
                next();
            }else { next(new Error('No existe quizId=' + quizId));}
        }
        ).catch(function(error){next(error);});
};

//GET /quizes
exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta})
	})
	
};



exports.show = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz});
	//})
};

//get answer
exports.answer = function(req,res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		var resultado = "Incorrecto"
		if (req.query.respuesta === quiz.respuesta){
		//res.render('quizes/answer', 
			resultado = 'Correcto'
			//{ quiz: quiz, respuesta: 'Correcto'});
	} //else{
		res.render('quizes/answer', { quiz: quiz, respuesta: resultado});

	//}

	//})
	
};


exports.index = function(req, res){
	models.Quiz.findAll().then(
		function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes});
	}
	).catch(function(error) {next(error);})
};