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
    //envioDeFormulario();

}

function eventListenerANav(){
    const botones = document.querySelectorAll('.boton-nav');
    const btnMobile = document.querySelector('.boton-mobile')

    botones.forEach(boton => {
            boton.addEventListener('click', (e)=>{
            console.log(e.target.classList);
            const botonSeleccionado = document.querySelector('.boton-nav.seleccionado');
            if(botonSeleccionado) botonSeleccionado.classList.remove('seleccionado');
            boton.classList.add('seleccionado');
        })
    });

    btnMobile.addEventListener('click', ()=>{
        const botonesNav = document.querySelector('.botones-nav')

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
    const logo = document.querySelector('.logo')
    let observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            const flecha = document.querySelector('.flecha-volver');
            if(entry.isIntersecting){
                logo.style.color = "#ffffff";
                flecha.classList.remove('mostrar-flecha');
            }else{
                flecha.classList.add('mostrar-flecha');
                console.log(logo.style.color);
                logo.style.color = "#f59e0b";
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
            setTimeout(() => {
                formulario.scrollIntoView(true, "smooth");
            }, 300);
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