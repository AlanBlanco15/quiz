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
		res.render('quizes/show', { quiz: req.quiz, errors: []});
	//})
};

//get answer
exports.answer = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		var resultado = "Incorrecto";
		if (req.query.respuesta === req.quiz.respuesta){
		//res.render('quizes/answer', 
			resultado = 'Correcto'
			//{ quiz: quiz, respuesta: 'Correcto'});
	} //else{
		res.render(
			'quizes/answer', 
			{ quiz: req.quiz, 
			  respuesta: resultado,
			  errors: []
			}
			);

	//}

	//})
	
};


exports.index = function(req, res){
	models.Quiz.findAll().then(
		function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes, errors: []});
	}
	).catch(function(error) {next(error);})
};




exports.new = function(req, res) {
	var quiz = models.Quiz.build(//crea objeto quiz)
	{ pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', { quiz: quiz, errors: []});
};


exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz//save guarfar en bd
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){ res.redirect('/quizes')})
			}
		}
	//guardar en db
	//quiz
	);
};


exports.edit = function( req , res) {
	var quiz = req.quiz;

	res.render('quizes/edit', { quiz: quiz, errors: []});
};

exports.update = function(req, res) {
	 req.quiz.pregunta = req.body.quiz.pregunta;
	 req.quiz.respuesta = req.body.quiz.resultado;

	 req.quiz
	 .validate()
	 .then(
	 	function(err){
	 		if (err) {
	 			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
	 		} else {
	 			req.quiz
	 			.save( {fields: ["pregunta", "respuesta"]})
	 			.then( function(){ res.redirect('/quizes');});
	 		}
	 	});
};




exports.destroy = function( req, res) {
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');

	}).catch(function(error){next(error)});
};