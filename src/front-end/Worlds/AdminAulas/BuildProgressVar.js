class BuildProgressVar {

    constructor(direction, context) {
        this.direction = direction;
        this.context = context;
    }

    BuildProgressVar() {
        this.direction.innerHTML = `<div class='porcentajes' style="--porcentaje: 100; --color: forestgreen">
                                        <svg width="150" height="150">
                                            <circle r="65" cx="50%" cy="50%" pathlength="100" />
                                            <circle r="65" cx="50%" cy="50%" pathlength="100" />
                                        </svg>
                                        <span>Cargando ${this.context}</span>
                                    </div>`
    }
}