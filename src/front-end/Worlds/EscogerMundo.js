var leer = localStorage.getItem('mensaje');

addEventListener('load', function () {
    if (leer == "1") {
        localStorage.setItem('mensaje', '0');
    } else if (leer == "0") {
        window.location.href = '../Log-in/Login.html';
    }
})

var Username = localStorage.getItem('Nombre');
localStorage.setItem('Nombre', '');
document.getElementById("Nombre").innerHTML = Username;

function Pasar(mundo) {
    localStorage.setItem('mensaje', '1');
    localStorage.setItem('Nombre', Username);
    switch (mundo) {
        case Tutorial:
            window.location.href = '../Worlds/Tutorial/Tutorial.html';
            break;
        case Historia:
            window.location.href = '../Worlds/MundoHistoria/Menu.html';
            break
        case Pitagoras:
            window.location.href = '../Worlds/MundoPitagorico/Menu.html';
            break
    }

}
