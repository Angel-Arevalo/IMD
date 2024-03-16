class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `${this.nombre} está saludando`;
    }

    static probarSaludo(nombre) {
        return `${nombre} está saludando`;
    }
}

class Estudiante extends Persona {
    #notas = [];

    set setNotas(nota) {
        this.#notas.push(nota);
    }
    get getNotas() {
        return this.#notas;
    }
    clean(){
        this.#notas = [];
    }
}

const juanito = new Estudiante("juanito", 55);

let number

function asignarNumero() {
    number = parseInt(document.getElementById('numeroInput').value);
    for (var i = number; i <= 15; i++) {
        juanito.setNotas = i;
    }
};

function mostrarNotas() {
    console.log(juanito.getNotas); 
};

function Clean() {
    juanito.clean();
};