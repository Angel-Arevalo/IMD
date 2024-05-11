/* Variables necesarias */
let Jugando = false;
let Variables = Array.from(document.getElementsByClassName('CuadradoPequeño'));
let TrueValues = [false];
let DivOld, DivNew, mover, degree = 0;
/* Fin de variables necesarias */

/* Funciones */
function RenameAndFill(List, numberOfList) {
    for (let i = 0; i < List.length; i++) {
        if (List[i].id == ' ') {
            List[i].id = List[i].id + `${i}`;
        }
        List[i].style.background = Backgrounds[numberOfList][i % 2];
    }
}

function Jugar(IndexOfList) {
    if (!Jugando) {
        if (IndexOfList < 9) degree = 36.87;
        else degree = -53.13;
        DivOld = Variables[IndexOfList];
        let positions = DivOld.getBoundingClientRect();
        DivOld.removeAttribute('onclick');

        /* Configuración del nuevo div */
        DivNew = DivOld.cloneNode(true);
        DivNew.id = 'Mover';
        DivNew.style.position = 'absolute';
        DivNew.style.top = positions.top + "px";
        DivNew.style.left = positions.left + "px";
        DivNew.style.transform = `rotate(${degree}deg)`;
        document.body.appendChild(DivNew);
        /* Fin de configuración del nuevo div */

        DivOld.style.background = "rgb(87, 81, 87)";

        mover = new Mover(document.getElementById('Mover'), degree);
        Jugando = true;
    } else alert("Ya está moviendo una figura")
}

/* Incio de eventos */
document.addEventListener('keydown', function (evento) {

    if (evento.key == "ArrowRight" &&
        !mover.FiguraMoviendose) {
        mover.cambiarInclinacion(1);
    } else if (evento.key == "ArrowLeft" &&
        !mover.FiguraMoviendose) {
        mover.cambiarInclinacion(-1);
    } else if (evento.key == 's') {
        mover.soltar();
    }
})
/* Fin de eventos */
/* Fin de las funciones */
let lista = [document.getElementsByClassName('CuadradoPequeño'),
document.getElementsByClassName('CuadradoPequeño1')
];

let Backgrounds = [["rgb(192, 43, 192)", "rgb(192, 124, 192)"],
[`rgb(${192 + 50}, 93, ${192 + 50})`,
`rgb(${192 + 50}, 174, ${192 + 50})`]
];

for (let i = 0; i < 2; i++) {
    RenameAndFill(lista[i], i);
}

for (let i = 0; i < Variables.length; i++) {
    TrueValues[i] = false;
}