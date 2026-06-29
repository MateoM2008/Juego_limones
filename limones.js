let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=30;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;


function iniciar(){
    intervalo=setInterval(bajarLimon,velocidadCaida);//primerparametro: una funcion. S egundo parametro: tiempo en milisegundos
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="#1A9C9C"
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="#ecff15"
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10
    actualizarPantalla();
}

function moverDerecha(){
    personajeX=personajeX+10
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function dibujarLimon(){
    ctx.fillStyle="#14FF2F"
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX && limonX < personajeX+ANCHO_PERSONAJE && limonY + ALTURA_LIMON > personajeY && limonY < personajeY + ALTURA_PERSONAJE){
        //alert("Atrapado")
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpam("txtPuntaje",puntaje)
        if(puntaje==3){
            velocidadCaida=150;
        }else if(puntaje==6){
            velocidadCaida=100;
        }else if(puntaje==10){  
            alert("YA TIENES LOS LIMONES PARA TU LIMONADA")
            clearInterval(intervalo);
        }
    }
}

function aparecerLimon(){
    limonX=generarAleatoria(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON == canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpam("txtVidas",vidas)
        if(vidas==0){
            alert("GAME OVER")
            clearInterval(intervalo);
        }
    }
}


function reiniciar(){
    vidas=3
    puntaje=0;
    mostrarEnSpam("txtVidas",vidas)
    mostrarEnSpam("txtPuntaje",puntaje)
    velocidadCaida=200;
    personajeX=canvas.width/2;
    personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE)
    iniciar();
}