var fs = require('fs');
		

var destino = process.argv[2];
var archivos = process.argv.splice(3, process.argv.length);
var archivo = archivos.shift();
	if(archivo !=undefined)
	{
		fs.readFile(archivo, appendArchivo);
	}
	function leerArchivo(error){
			if(error)
			{
				throw error;
			}
			var nuevo_archivo = archivos.shift();
				if(nuevo_archivo !=undefined)
				{
					fs.readFile(nuevo_archivo,appendArchivo);
				}
	}
	function appendArchivo(error,d){
			if(error)
			{
				throw error;
			}
			fs.appendFile(destino,d,leerArchivo);
		}
	console.log('Ficheros integrados');