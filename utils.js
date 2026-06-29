function generarAleatoria(min,max){
    let random= Math.random();
    let numero=random*(max-min);
    let numeroEntero=Math.ceil(numero);
    numeroEntero=numeroEntero+min;
    return numeroEntero;
}
function mostrarEnSpam(idSpam,valor){
        let componente=document.getElementById(idSpam);
        componente.textContent=valor;
}