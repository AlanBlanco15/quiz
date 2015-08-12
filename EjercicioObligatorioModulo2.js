function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
 
  return {
    titulo: function()                    { return _titulo; },
    meter:  function(nombre, tf) { _contenido[nombre]=tf; },
    tf:     function(nombre)         { return _contenido[nombre]; },
    borrar: function(nombre)     { delete _contenido[nombre]; },
    toJSON: function()              { return JSON.stringify(_contenido);},
    listar: function()    {
                            var _caractJson = new Array(",",'"',":","{","}");
                            var _caractNuevos = new Array("\n","",",","","");
                            var _contenidoJSON = JSON.stringify(_contenido);
                            for (var i = 0; i < _caractJson.length; i++) {
                                    var _contenidoJSON = _contenidoJSON.split(_caractJson[i]).join(_caractNuevos[i]);
                            };
                            return _contenidoJSON;
                          }
  }
}
var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               José: 157845123,
               Jesús: 178512355
             });
console.log(amigos.listar());