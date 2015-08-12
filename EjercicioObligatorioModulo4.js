
var express = require('express');
var app = express();

//Pagina 1: Preguntas
//GET /preguntas

app.get('/preguntas',function(req,res){
  res.send('<html><body>'
    +'<h1>Preguntas</h1>'
    +'<form method="get" action="/respuesta">'
    +'¿Quién descubrió América?: <br>'
    +'<input type="text" name="pregunta1" /><br>'
    +'<input type="submit" value="Enviar" /><br>'
    +'</form>'
    +'<form method="get" action="/respuesta">'
    +'¿Capital de Portugal?: <br>'
    +'<input type="text" name="pregunta2" /><br>'
    +'<input type="submit" value="Enviar" /><br>'
    +'</form>'
    +'</body></html>'
    );
});

//Pagina 2: Respuestas
//GET /respueta

app.get('/respuesta',function(req,res){
  //Aqui ponemos una sentencia para saber cual es la pregunta que el usuario contesto
  //En este caso puede ser la #1 o #2 y evalua si colocaron la respuesta 
  //correcta y seguido imprime en pantalla que es correcto en caso de serlo y en caso
  //incorrecto manda al else.
  if (req.query.pregunta1 === "Cristobal Colon" || req.query.pregunta2 === "Lisboa"){
    res.send ('<html><body>'
    +'<h1>Tu respuesta es correcta'
     +'</h1>'
    +'<form method="get" action="/Preguntas">'
    +'<input type="submit" value="Regresar" /><br>'
    +'</form>'
    +'</body></html>');
  }
  //Aqui llegamos en caso de que coloquemos una respuesta incorrecta y evaluamos
  //si es la pregunta #1 o la #2 en este caso seria la else.
  else{
    if(req.query.pregunta1){
      res.send('<html><body>'
    +'<h1>Tu respuesta es incorrecta, la respuesta correcta'
     +' es Cristobal Colon</h1>'
    +'<form method="get" action="/Preguntas">'
    +'<input type="submit" value="Regresar" /><br>'
    +'</form>'
    +'</body></html>'); 
    }
    else{
    
    res.send('<html><body>'
    +'<h1>Tu respuesta es incorrecta, la respuesta correcta'
     +' es Lisboa</h1>'
    +'<form method="get" action="/Preguntas">'
    +'<input type="submit" value="Regresar" /><br>'
    +'</form>'
    +'</body></html>');}  
  }
  
  
});

//Le decimos a la app que este pendiente del puerto 80.

app.listen(80);
