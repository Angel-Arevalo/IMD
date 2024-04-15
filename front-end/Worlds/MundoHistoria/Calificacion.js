class Calificacion {

    constructor(respuestas, textoRespuestas, Rebaja) {
        this.respuestas = respuestas;
        this.nota = -Rebaja;

        if (this.#RevisarString(textoRespuestas)) {
            if (this.#RevisarNota(textoRespuestas.split(','))) {
                this.#ReportarError(`Su nota es ${this.nota}`);
            }
        }

    }

    #RevisarString(textoRevisar) {
        for (var i = 0; i < this.respuestas.length; i++) {
            if (textoRevisar[i] == ' ' || textoRevisar[i] == 'a' || textoRevisar[i] == 'b'
                || textoRevisar[i] == 'c' || textoRevisar[i] == 'd' || textoRevisar[i] == ',') {
                    continue;
            }else {
                this.#ReportarError("Carácteres no válidos ingresados.");
                    console.log(textoRevisar[i]);
                    return false;
            }
        }

        return true;
    }

    //En este método verifico que en efecto se hayan puesto cáteres válidos
    //y si algún caracter es verdadero entonces incrementa la variable que cuenta los caracteres verdaderos
    #RevisarNota(ListaTextoRespuestas) {
        if (ListaTextoRespuestas.length != this.respuestas.length) {
            this.#ReportarError("No digitó la misma catidad de respuestas que de preguntas.");
            console.log(ListaTextoRespuestas);
            console.log(this.respuestas);
            return false;
        }

        for (var i = 0; i < ListaTextoRespuestas.length; i++) {
            
            for (let j = 0; j < ListaTextoRespuestas[i].length; j++) {
                console.log(ListaTextoRespuestas[i][j]);
                if (ListaTextoRespuestas[i][j] == ' ') {
                    continue;
                }else if(ListaTextoRespuestas[i][j] == this.respuestas[i]) {
                    this.nota += 1;
                }else if(ListaTextoRespuestas[i][j] == 'a' || ListaTextoRespuestas[i][j] == 'b'
                        || ListaTextoRespuestas[i][j] == 'c' || ListaTextoRespuestas[i][j] == 'd') {
                            continue;
                }
            }
        }

        return true;
    }

    #ReportarError(Error) {
        alert(Error);
    }

    static TomarTiempo() {
        var fecha = new Date();
        let fechaStr = fecha.toString();
        let horaInicio = fechaStr.split(' ')[4].split(':');

        for (let i = 0; i < 3; i++) {
            horaInicio[i] = (horaInicio[i])*(Math.pow(60, 2 - i));
        }

        return horaInicio[0] + horaInicio[1] + horaInicio[2];
    }

    static EnviarNota(nota) {
        //Aquí irá el código para enviar la nota al back-end
    }
}