//Funciones para viajar entre archivos
function Viajar(direccion) {
    localStorage.setItem('mensaje','1');
    if (direccion == 'P') {
        window.location.href = "../EscogerMundo.html";
    }else if (direccion == 'Leccion 1') {
        window.location.href = "Nivel1/Leccion.html";
    }else if(direccion == 'Examen 1') {
        window.location.href = "Nivel1/Examen.html";
    }else if(direccion == 'Nivel 1') {
        window.location.href = "Nivel1/Nivel.html";
    }else if(direccion == 'Leccion 2') {
        window.location.href = "Nivel2/Leccion.html";
    }else if(direccion == 'Examen 2') {
        window.location.href = "Nivel2/Examen.html";
    }else if(direccion == 'Nivel 2') {
        window.location.href = "Nivel2/Nivel.html";
    }else if(direccion == 'Leccion 3') {
        window.location.href = "Nivel3/Leccion.html";
    }else if(direccion == 'Examen 3') {
        window.location.href = "Nivel3/Examen.html";
    }else if(direccion == 'Nivel 3') {
        window.location.href = "Nivel3/Nivel.html";
    }else if(direccion == 'Leccion 4') {
        window.location.href = "Nivel4/Leccion.html";
    }else if(direccion == 'Examen 4') {
        window.location.href = "Nivel4/Examen.html";
    }else if(direccion == 'Nivel 4') {
        window.location.href = "Nivel4/Nivel.html";
    }
}


//Fin de funciones para viajar entre archivos