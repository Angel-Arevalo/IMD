class Mover {
    constructor(figura, referencia) {
        console.log(figura);
        console.log(referencia);
        this.figura = figura;
        this.FiguraMoviendose = false;
        this.InicioX = 0;
        this.InicioY = 0;
        this.Fijado = false;
        this.referencia = referencia;
        this.Rotacion = false;

        this.figura.addEventListener('mousedown', this.iniciarArrastre.bind(this));
        this.figura.addEventListener('mousemove', this.arrastrar.bind(this));
        this.figura.addEventListener('mouseup', this.soltar.bind(this));
    }

    iniciarArrastre(evento) {
        console.log("Entró a arrastre");
        if(!this.Fijado) {
            this.FiguraMoviendose = true;
            this.inicioX = evento.clientX - this.figura.getBoundingClientRect().left;
            this.inicioY = evento.clientY - this.figura.getBoundingClientRect().top;
        }
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

    obtenerRotacion(elemento) {
        const estilo = window.getComputedStyle(elemento);
        const transformacion = estilo.getPropertyValue('transform');
        let angulo = 0;
    
        if (transformacion && transformacion !== 'none') {
            const valores = transformacion.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(valores[0]);
            const b = parseFloat(valores[1]);
            angulo = Math.round(Math.atan2(b, a) * (180/Math.PI));
        }
    
        console.log(angulo);
        return angulo;
    }

    rotar() {
        this.figura.style.transform = `rotate(${this.Grado + 307}deg)`
    }
}