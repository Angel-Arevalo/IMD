class Mover {
    constructor(figura, incliacion) {
        incliacion = this._FloorFunction(incliacion);
        console.log(incliacion);
        this.figura = figura;
        this.incliacion = incliacion;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.Grado = incliacion;

        //Eventos
        this.figura.addEventListener('mousedown', this.iniciarArrastre.bind(this));
        this.figura.addEventListener('mousemove', this.arrastrar.bind(this));
        this.figura.addEventListener('mouseup', this.soltar.bind(this));
    }

    iniciarArrastre(evento) {
        this.FiguraMoviendose = true;
        this.inicioX = evento.clientX - this.figura.getBoundingClientRect().left;
        this.inicioY = evento.clientY - this.figura.getBoundingClientRect().top;
        this.fijar();
    }

    arrastrar(evento) {
        if (this.FiguraMoviendose) {
            const x = evento.clientX - this.inicioX;
            const y = evento.clientY - this.inicioY;
            this.figura.style.left = x + 'px';
            this.figura.style.top = y + 'px';
        }
    }

    soltar() {
        this.FiguraMoviendose = false;
    }

    cambiarInclinacion(direccion) {
        if (direccion < 0) this._inclinar(-this.incliacion);
        else this._inclinar(this.incliacion);
    }

    _inclinar(inclinar) {
        this.Grado += inclinar;
        this.figura.style.transform = `rotate(${this.Grado}deg)`;
    }

    _FloorFunction(str) {
        str = str.toString();
        str = str.substring(0, str.indexOf('.'));
        str = parseInt(str);

        if (360%str != 0) 
            str = Math.abs(str) - 360%str;

        return str;
    }
}