var express = require('express');

var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//autoload

router.param('quizId', quizController.load);
router.param('search', quizController.load);///borrar
router.param('commentId', commentController.load);


//def de rutaas de session
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

//definicion de rutas de /quizes
router.get('/quizes',  quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/question' , quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new',sessionController.loginRequired,quizController.new);
router.post('/quizes/create',sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.destroy);

//router.get('/quizes/new',       quizController.new);
//router.post('/quizes/create',    quizController.create);
//router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
//router.put('/quizes/:quizId(\\d+)',   quizController.update);
//router.delete('/quizes/:quizId(\\d+)',  quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',  commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
					sessionController.loginRequired, commentController.publish);




router.get('/author' , function (req,  res){
	res.render('author', {autor :[{nombre: 'alan blanco san miguel' , foto: '/images/autor.jpg'}], errors: []});

});

module.exports = router;
