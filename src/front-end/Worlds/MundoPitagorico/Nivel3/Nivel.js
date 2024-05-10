/* Funciones */

function RenameAndFill(List) {
    for (let i = 0; i < List.length; i++) {
        List[i].id = List[i].id + `${i}`;
    }
}

/* Fin de las funciones */
let lista = [document.getElementsByClassName('CuadradoPequeño'),
            document.getElementsByClassName('CuadradoPequeño1')
];

for (let i = 0; i < 2; i++) {
    RenameAndFill(lista[i]);
}