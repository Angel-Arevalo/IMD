var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    }else if(leer == "0") {
        window.location.href = '../../Log-in/Login.html';
    }  
})

function Trip(params) {
    localStorage.setItem('mensaje','1');
    if(params == "N1") {
        window.location.href = "../Tutorial/Nivel1/Nivel1.html";
    }if (params == "N2") {
        window.location.href = "../Tutorial/Nivel2/Nivel2.html";
    }if (params == "N3") {
        window.location.href = "../Tutorial/Nivel3/Nivel3.html";
    }if (params == "N4") {
        window.location.href = "../Tutorial/Nivel4/Nivel4.html";
    }if (params == "N5") {
        window.location.href = "../Tutorial/Nivel5/Nivel5.html";
    }
}
function Principal() {
    localStorage.setItem('mensaje','1');
    window.location.href = '../EscogerMundo.html';
}