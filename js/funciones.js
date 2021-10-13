var guiones;
var palabraA;
var palabra;
var resultado=document.getElementById("resultado");
var letra=document.getElementById("letra");
var cajaFallos=document.getElementById("cajaFallos");

document.getElementById("files").addEventListener("change", seleccionImagenes, false);
letra.addEventListener("keyup", buscarCaracter, false);

//Lee imágenes del directorio seleccionado
function seleccionImagenes(evt){
    var files=evt.target.files;

    //Bucle que recorre las imágenes obtenidas de la carpeta seleccionada
    for(var i=0, f; f=files[i]; i++){
        //Si f no es de tipo image, no continua y vuelve al inicio del bucle
        if(!f.type.match('image.*')){
            continue;
        }
        var reader=new FileReader();

        reader.onload=(function(elFichero){
            return function(e){
                var cadena = escape(elFichero.name);
                var ppunto = cadena.indexOf(".");
                var nimagen = cadena.substring(0, ppunto);

                //Creo imagen
                imm = document.createElement("img");
                imm.src = e.target.result;
                imm.alt = elFichero.name;
                imm.title = nimagen;
                
                //Evento que solo coge el nombre de la última imagen
                imm.onclick=crearGuiones(nimagen);

                document.getElementById("contenedorImagen").insertBefore(imm, null);
                
            };
            
            })(f);
            
            reader.readAsDataURL(f);
            
    }
    
}

//Reemplaza cada caracter de la palabra insertada por guiones y los muestra en el espacio de resultado
function crearGuiones(nimagen){
    palabraA=nimagen.toUpperCase();
    guiones=palabraA.replace(/[a-z]/gi, "-");
    resultado.innerHTML=guiones;
    buscarCaracter;
    
    
}

//Busca el caracter insertado en la palabra y si lo encuentra, sustituye el guion por dicho caracter.
function buscarCaracter(){
    if (letra.value==""){
        return;
    };

    var caracterBuscar=(letra.value).toUpperCase();
    var posicion=palabraA.indexOf(caracterBuscar);
    var es_acierto=false;

    while(posicion>-1){
        //Cambia el guion por el caracter introducido
        guiones=guiones.substring(0, posicion)+caracterBuscar+guiones.substr(posicion+1, guiones.length);
        
        //Copia en resultado los guiones con la letra acertada
        resultado.innerHTML=guiones;

        //Para seguir buscando, la posición tiene que aumentar (+1)
        posicion=palabraA.indexOf(caracterBuscar, posicion+1);
        es_acierto=true;
    }

    //Borra la última letra tecleada en el input
    letra.value=null;
   
    //En caso de que el caracter insertado no coincida con ninguno de la palabra, lo muestra en párrafos  
    if (!palabraA.includes(caracterBuscar)){
        var fallos=document.createElement("p");
        var letraFallada=document.createTextNode(caracterBuscar);
        fallos.appendChild(letraFallada);
        cajaFallos.appendChild(fallos);
        }
}





