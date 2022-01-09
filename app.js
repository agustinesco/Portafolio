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
    eventListenersAContacto();
    envioDeFormulario();

}

function eventListenerANav(){
    const botones = document.querySelectorAll('.boton-nav');

    botones.forEach(boton => {
        boton.addEventListener('click', ()=>{
            const botonSeleccionado = document.querySelector('.boton-nav.seleccionado');
            if(botonSeleccionado) botonSeleccionado.classList.remove('seleccionado');
            boton.classList.add('seleccionado');
        })
    });
}

async function escribirOraciones(){
    try{
        const url ="oraciones.json"
        const resultado = await fetch(url)
        .then(respuesta => respuesta.json())
        
        escribir(resultado,0,0)
        
    }
    catch(error){
        console.log(error)
    }
    function escribir(oraciones , i, numeroOracion) {
        //escribir la palabra
        if(i<oraciones[numeroOracion].length){
            parrafo.innerHTML=parrafo.innerHTML.substring(0,i) + oraciones[numeroOracion].charAt(i) +"|";
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
            parrafo.innerHTML=parrafo.innerHTML.substring(0,parrafo.innerHTML.length-1);
    
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
            threshold:0.75
        });
    
        const sobreMi =document.querySelector('.informacion-sobreMi');
        observer.observe(sobreMi);
}

function observadorFlechaVolver() {
    let observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            const flecha = document.querySelector('.flecha-volver');
            if(entry.isIntersecting){
                flecha.classList.remove('mostrar-flecha');
            }else{
                flecha.classList.add('mostrar-flecha');
            }
        })

    })

    const header = document.querySelector('.imagen-superior');
    observer.observe(header);
}

function eventListenersAContacto(){
    const formulario = document.querySelector('.formulario');
    const botonEmail = document.querySelector('.metodo-email');
    const botonWsp = document.querySelector('.metodo-wsp');



    botonEmail.addEventListener('click', ()=>{
        if(formulario.classList.contains('mostrar')){
            formulario.classList.add('ocultar')
            setTimeout(() => {
                formulario.classList.remove('mostrar')
                formulario.classList.remove('ocultar')
            }, 1000);
        } else {
            formulario.classList.add('mostrar')
        }
    });

}

function envioDeFormulario(){
    const formulario = document.querySelector('.formulario');
    const botonEnviar = document.querySelector('#boton-enviar')

    formulario.addEventListener('submit', enviarFormulario)

    function enviarFormulario(e) {
        e.preventDefault();

        const form = new FormData(this);
        
        botonEnviar.setAttribute('href', `mailto:agustinescobar@hotmail.com.ar?subject=${form.get('nombre')} ${form.get('email')}&body=${form.get('mensaje')}`);
        console.log(botonEnviar.getAttribute('href'));
        botonEnviar.click()
    }

}