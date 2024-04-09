let Nota = 5, Veces = [false, false];
let Respuesta = ['c', 'b', 'a', 'a', 'b']

function Eleccion(ele) {
    if (ele == "Volver") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "Leccion1.html";
    }else {
        document.getElementById('Instrucciones').style.display = "none";
        document.getElementById('Mostrar').style.display = "block";
    }
}

function Mostrar(imagen) {
    console.log(Nota);
    if (imagen == "SistemaN" && !Veces[0]) {
        document.getElementById('Sn').style.display = "block";
        Nota -= 0.25;
        Veces[0] = true;
    }if (imagen == "sqrt" && !Veces[1]) {
        Veces[1] = true;
        Nota -= 0.25;
        document.getElementById('sqrt').style.display = "block";
    }
}