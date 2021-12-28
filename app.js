const parrafo = document.querySelector('.simularEscritura');
const oraciones= [
    "Es ridículo vivir 100 años y sólo ser capaces de recordar 30 millones de bytes. O sea, menos que un compact disc. La condición humana se hace más obsoleta cada minuto",
    "Nunca confíes en un ordenador que no puedas lanzar por una ventana",
    "Hardware: las partes de un ordenador que pueden ser pateadas",
    "Todos los sistemas operativos que hay ahí fuera son más o menos iguales. Todos somos una mierda",
    "¿Internet? ¿Todavía anda eso por ahí?",
    "El logro más impresionante de la industria del software es su continua anulación de los constantes y asombrosos logros de la industria del hardware",
    "No se trata bits, bytes y protocolos, sino de beneficios, pérdidas y márgenes",
    "La mayoría de las patentes son una mierda. Dedicar tiempo a leerlas",
    "Controlar la complejidad es la esencia de la programación",
    "Cualquier idiota puede usar un ordenador. De hecho, muchos lo hacen"
]
let i =0;
let oracion=0;
const velocidadEscritura = 60;
const delayEscritura = 3000;

document.addEventListener('DOMContentLoaded', function(){
    cargarApp();
    
});

function cargarApp(){
    escribiendo();
}


function escribiendo() {
    if(i<oraciones[oracion].length){
        parrafo.innerHTML=parrafo.innerHTML.substring(0,i) + oraciones[oracion].charAt(i) +"|";
        i++;
        setTimeout(() => {
            escribiendo();
            
        }, velocidadEscritura);
    }
    else{
        i=0;
        if(oracion<oraciones.length-1)oracion++;
        else oracion=0;
        setTimeout(() => {
            escribiendo();
            
        }, delayEscritura);
    }
    
}