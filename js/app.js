
const parrafo = document.querySelector('.simularEscritura');

const velocidadEscritura = 60;
const delayEscritura = 3000;

document.addEventListener('DOMContentLoaded', function(){
    cargarApp();
    
});

function cargarApp(){

    escribirOraciones();
    eventListenerANav();
    agregarFechaFooter();
    agregarObservadores();
    logicaDescargaCV();
    cargarProyectos();
}

async function cargarProyectos() {
    const data = await fetch('datos.json').then(respuesta => respuesta.json())
    const proyectos = data.proyectos 
    const contenedorProyecto= document.querySelector('.proyectos')
    proyectos.forEach(p => {
        console.log(p);
        contenedorProyecto.innerHTML += `
        <li class="proyecto">
            <div class="contenido">
                <h3>${p.titulo}</h3>
                <img src="imagenes/${p.imagen}" alt="">
                <p>${p.descripcion}</p>
            </div>
            <a target="_blank" class="boton-proyecto" href="${p.link}">Visitar Proyecto</a>      
        </li>
        `
    })
    

}

function eventListenerANav(){
    const botones = document.querySelectorAll('.boton-nav');
    const btnMobile = document.querySelector('.boton-mobile')
    const botonesNav = document.querySelector('.botones-nav')

    botones.forEach(boton => {
            boton.addEventListener('click', (e)=>{
            const botonSeleccionado = document.querySelector('.boton-nav.seleccionado');
            if(botonSeleccionado) botonSeleccionado.classList.remove('seleccionado');
            boton.classList.add('seleccionado');
            if(botonesNav.classList.contains('mostrar')){
                setTimeout(() => {
                    botonesNav.classList.remove('mostrar')
                    btnMobile.textContent = "menu"
                }, 700);
            }
        })
    });

    btnMobile.addEventListener('click', ()=>{

        if(botonesNav.classList.contains('mostrar')){
            botonesNav.classList.remove('mostrar')
            btnMobile.textContent = "menu"
        } else {
            botonesNav.classList.add('mostrar')
            btnMobile.textContent = "close"
        }
    })
}

async function escribirOraciones(){
    try{
        const url ="datos.json"
        const resultado = await fetch(url)
        .then(respuesta => respuesta.json())
        
        escribir(resultado.oraciones,0,0)
        
    }
    catch(error){
        console.log(error)
    }
    function escribir(oraciones , i, numeroOracion) {
        //escribir la palabra
        if(i<oraciones[numeroOracion].length){
            parrafo.textContent=parrafo.textContent.substring(0,i) + oraciones[numeroOracion].charAt(i) +"|";
            i++;
            setTimeout(() => {
                escribir(oraciones, i ,numeroOracion);
                
            }, velocidadEscritura);
        }
        //caso base, escribi la palabra y tengo que saltar a la siguiente oracion
        else{
            i=0;
            
            if(numeroOracion<oraciones.length-1)numeroOracion++;
            // llegue al final de la lista y tengo que reiniciar
            else numeroOracion=0;
            setTimeout(() => {
                borrar(oraciones,i,numeroOracion);
                
            }, delayEscritura);
        }
        
    }
    function borrar(oraciones,i,numeroOracion){
        if(parrafo.innerHTML.length>0){
            parrafo.textContent=parrafo.textContent.substring(0,parrafo.textContent.length-1);
    
            setTimeout(() => {
                    borrar(oraciones,i,numeroOracion);
            }, velocidadEscritura/2);
        }
        else setTimeout(() => {
            escribir(oraciones,i,numeroOracion);
            
        }, delayEscritura/6);
    }
    
}

function agregarFechaFooter() {

    const date = new Date()
    const año = date.getFullYear();
    const textFooter = document.querySelector('.footer-texto');
    textFooter.textContent = textFooter.textContent + " "+ año

}

function agregarObservadores() {
    observadorSobreMi();
    observadorFlechaVolver();
}

function observadorSobreMi() {
    let observer = new IntersectionObserver(
        entries=>{
            entries.forEach(entry=>{
                entry.target.classList.toggle('animar',entry.isIntersecting);
                if(entry.isIntersecting) observer.unobserve(entry.target);
            })
    
        },{
            threshold:0.50
        });
    
        const sobreMi =document.querySelector('.informacion-sobreMi');
        observer.observe(sobreMi);
}

function observadorFlechaVolver() {
    const logo = document.querySelector('.logo')
    let observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            const flecha = document.querySelector('.flecha-volver');
            if(entry.isIntersecting){
                logo.style.color = "#ffffff";
                flecha.classList.remove('mostrar-flecha');
            }else{
                flecha.classList.add('mostrar-flecha');
                logo.style.color = "#f59e0b";
            }
        })

    })

    const header = document.querySelector('.imagen-superior');
    observer.observe(header);
}

function logicaDescargaCV() {
    const link = document.createElement('A');

}
