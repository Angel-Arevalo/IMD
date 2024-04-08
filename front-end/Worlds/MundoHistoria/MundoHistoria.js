//funciones para Cargar página
var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    }else if(leer == "0") {
        window.location.href = '../../Log-in/Login.html';
    }  
})

//Funciones para viajar entre archivos
function Principal() {
    localStorage.setItem('mensaje','1');
    window.location.href = '../EscogerMundo.html';
}


//Fin de funciones para viajar entre archivos