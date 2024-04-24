let lista = [], mover, jugando = false;

document.addEventListener('keydown', function (evento) {

    if (evento.key == 'v' && !mover.Moviendose) {
        mover.rotar();
    }
})


function CrearObjeto(objeto) {
    if (!jugando) {
        console.log(document.getElementById(objeto + 'h'));
        let div = document.createElement('div');
        let divPadre = document.getElementById(objeto);
        let propiedades = divPadre.getBoundingClientRect();
        console.log(divPadre.getBoundingClientRect());

        div = divPadre.cloneNode(true);
        div.id = 'Mover';

        divPadre.style.background = "rgb(127, 127, 164)";
        div.style.background = "rgb(230, 230, 134)";
        div.style.border = "none";
        div.style.position = "absolute";
        div.style.top = (propiedades.top) + "px";
        div.style.left = propiedades.left + "px";
        div.style.right = propiedades.right + "px";
        div.style.bottom = propiedades.bottom + "px";

        //remover atributos
        div.removeAttribute('onclick');
        divPadre.removeAttribute('onclick')

        document.body.appendChild(div);

        mover = new Mover(document.getElementById('Mover'), document.getElementById(objeto + 'h'));
        jugando = true;
    } else alert("Ya hay un elemento en movimiento");

}