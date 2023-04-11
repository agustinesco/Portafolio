document.addEventListener('DOMContentLoaded', function(){
    cargarApp();
    
});

function cargarApp(){

    escribirCaracteristicas();
    eventListenerANav();
    agregarFechaFooter();
    agregarObservadores();
    cargarProyectosTecnologias();
    logicaContactame();
}

async function cargarProyectosTecnologias() {
    const data = await fetch('datos.json').then(respuesta => respuesta.json())
    const proyectos = data.proyectos 
    const tecnologias = data.iconosTecnologias

    proyectos.forEach(p => {
        var plantilla =  `
        <li class="proyecto">
            <div class="contenido">
                <h3>${p.titulo}</h3>
                <img src="imagenes/${p.imagen}" alt="">
                <p>${p.descripcion}</p>
            </div>
            <a target="_blank" class="boton-proyecto" href="${p.link}">Visitar Proyecto</a>      
        </li>
        `

        $('.proyectos').append(plantilla);
    })
    tecnologias.forEach(t => {
        const icono = document.createElement('IMG');
        icono.classList.add('icono');
        icono.setAttribute('src', `imagenes/iconos/${t}`)
        
        $('.iconos-tecnologias').append(icono)
    })

}


function eventListenerANav(){
    const btnMobile = $('.boton-mobile')
    const botonesNav = $('.botones-nav')
    
    $('.boton-nav').click((e)=>{
        //si ya hay otro seleccionado lo saco
        const seleccionado = $('.boton-nav.seleccionado')
        if(seleccionado) seleccionado.removeClass('seleccionado');

        //Agregar seleccionado al boton
        $(e.target).addClass('seleccionado');

        //logica en mobile
        if(botonesNav.hasClass('mostrar')){
            setTimeout(() => {
                botonesNav.removeClass('mostrar')
                btnMobile.text("menu"); 
            }, 700);
        }
    })

    $('.boton-mobile').click(()=>{
        if(botonesNav.hasClass('mostrar')){
            botonesNav.removeClass('mostrar')
            btnMobile.text("menu") 
        } else {
            botonesNav.addClass('mostrar')
            btnMobile.text('close')
        }
    })
}

async function escribirCaracteristicas(){
    const car = $('.caracteristicas')
    const velocidadEscritura = 40;
    const delayBorrado = 1000;
    const delayEscritura = 3000;
    try{
        const url ="datos.json"
        const resultado = await fetch(url)
        .then(respuesta => respuesta.json())
        var caracteristicas = resultado.caracteristicas;

        escribir(0);
    }
    catch(error){
        console.log(error)
    }

    function escribir(i){
        car.text('');

        i == caracteristicas.length-1 ? escribirPalabra(0,1) : escribirPalabra(i,1);
    }

    function escribirPalabra(indice, letra){
        car.text(caracteristicas[indice].substring(0,letra))
        
        if(letra === caracteristicas[indice].length){
            setTimeout(()=>{
                borrarPalabra(indice)
            },delayEscritura)
        } else {
            setTimeout(()=>{
                escribirPalabra(indice, letra+1);
            },velocidadEscritura)
            
        }
    }

    function borrarPalabra(indice){
        car.text(car.text().substring(0,car.text().length-1));

        if(car.text().length == 0){
            setTimeout(()=>{
                escribir(indice+1)
            },delayBorrado);
        } else {
            setTimeout(() => {
                borrarPalabra(indice)
            }, velocidadEscritura);
        }
        
    }

}

function agregarFechaFooter() {

    const date = new Date()
    const año = date.getFullYear();
    let footer_element = $('.footer-texto')
    footer_element.text(footer_element.text() + " " + año);

}

function agregarObservadores() {
    observadorSobreMi();
    observadorFlechaVolver();

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
        
            observer.observe($(".informacion-sobreMi")[0]);
    }
    
    function observadorFlechaVolver() {
        let observer = new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    $('.logo').css("color","#ffffff"); 
                    $('.flecha-volver').removeClass('mostrar-flecha');
                }else{
                    $('.flecha-volver').addClass('mostrar-flecha');
                    $('.logo').css("color","#f59e0b");
                }
            })
    
        })
    
        const header = document.querySelector('.imagen-superior');
        observer.observe($('.imagen-superior')[0]);
    }
}

function logicaContactame(){
    $(".contenedor-formulario").slideUp();
    $('.metodo-correo').click(()=>{
        $(".contenedor-formulario").slideToggle(700);
        $(".contenedor-formulario").scrollTop();
    })
}

