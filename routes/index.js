var express = require('express');

var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//autoload

router.param('quizId', quizController.load);

//definicion de rutas de /quizes
router.get('/quizes',  quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/question' , quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);



router.get('/author' , function (req,  res){
	res.render('author', {autor :[{nombre: 'alan blanco san miguel' , foto: '/images/autor.jpg'}]});

});

module.exports = router;
