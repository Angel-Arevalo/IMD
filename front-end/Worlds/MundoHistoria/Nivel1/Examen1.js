


function Eleccion(ele) {
    if (ele == "Volver") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "Leccion1.html";
    }else {
        document.getElementById('Instrucciones').style.display = "none";
        document.getElementById('Mostrar').style.display = "block";
    }
}