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
function Principal(direccion) {
    localStorage.setItem('mensaje','1');
    switch (direccion) {
        case 'P':
            window.location.href = '../EscogerMundo.html';
            break;
        case 'N1':
            window.location.href = '../MundoHistoria/Nivel1/Nivel1.html';
            break;
        default:
            break;
    }
}


//Fin de funciones para viajar entre archivos