class Controler {

    #typeOf = "";
    constructor(typeOf = "") {
        this.#typeOf = typeOf;
        this.Mover = true;
        this.i = 0;
    }

    // aqui relleno una carta con todos los input del login
    // así mismo con todos los eventos necesarios para poder
    // seguir con el proycto
    FillCartLogIn() {
        Controler.CrearCarta();
        const Cart = document.getElementById("x");

        Cart.innerHTML = `<h2>Ingresando a IMD</h2>
            <input type="text" class="In" placeholder="Ingrese el nombre" id="InputUser">
            <input type="password" class="In" placeholder="Ingrese su contraseña" id="InputPassword">
            <button class ="Boton" onclick ="user.SaveUser()">Ingresar</button>
            <div class="Selectors">
                <div onclick="controler.FillCartSingUp()">¿No tiene una cuenta? Cree una</div>
                <div onclick="controler.VerifyUser()">¿Olvidó su contraseña? Recupere su cuenta</div>
            </div>`;
    }

    /* Muy parecido al anterior con la exepción de que ahora trae todo
       lo necesario para hacer el registro, a partir de acá todas las funciones
       son para el proceso del registro */
    FillCartSingUp() {
        Controler.CrearCarta();
        const Cart = document.getElementById("x");
        Cart.style.height = "75vh";
        Cart.innerHTML = `<h2>Registrandose en IMD</h2>
            <input type="text" class="In" placeholder="Ingrese el nombre" id="UserName">
            <input type="password" class="In" placeholder="Ingrese su contraseña" id="PassWord">
            <input type="password" class="In" placeholder="Confirme su contraseña" id="PassWordConfirm">
            <input type="text" class="In" placeholder="Ingrese su correo electrónico" id="Email">
            <select id="Selector">
                <option>Estudiante</option>
                <option>Profesor</option>
            </select>
            <button class ="Boton" onclick ="regis.SaveUser()">Registrarse</button>

            <div class="Selectors">
                <div onclick="controler.FillCartLogIn()">¿Ya tiene una cuenta? Ingrese</div>
            </div>`;
    }

    FillCartCodeVerify() {
        Controler.CrearCarta();
        const Cart = document.getElementById("x");
        Cart.innerHTML = `<h2>Verificando el correo</h2>
            <h3>En la siguiente linea ingrese el código enviado
            al correo ${regis.GetMail}</h3>
            <input type="text" class="In" placeholder="Ingrese el código" id="code">
            <button class="Boton" onclick="regis.VerifyCode()">Verificar cuenta</button>`;
    }


    /* Reviso el primer input del login para poder obtener el nombre
       del usuario y así poder enviar correo, lo siguiente es solo para
       recuperar contraseña */
    VerifyUser() {
        if (document.getElementById("InputUser").value.length != 0) {
            const Cart = document.body;
            Cart.classList.add("disabled");
            user.Name(document.getElementById("InputUser").value);
            user.RecoverMail();
        } else alert("Se necesita por lo menos el nombre del usuario.")
    }

    /* En caso de enviar el correo creo esta carta para 
       los inputs de confirmar el código enviado a correo */
    FillCartRecover() {
        Controler.CrearCarta();
        const Cart = document.getElementById("x");
        Cart.innerHTML = `<h2>Recuperando la cuenta de ${user.GetName}</h2>
            <h3>Ingrese el código enviado al correo 
            registrado cuando usted se unió a IMD en la siguiente linea.</h3>
            <input type="text" class="In" placeholder="Ingrese el código" id="code">
            <button class="Boton" onclick="user.VerifyCode()">Verificar cuenta</button>`;
    }

    /* Por último, crea una nueva contraseña */
    FillCartPassWordNew() {
        Controler.CrearCarta();
        const Cart = document.getElementById("x");
        Cart.innerHTML = `<h2>Ingrese su nueva contraseña</h2>
            <input type="password" class="In" placeholder="Ingrese la nueva contraseña" id="NewPass">
            <input type="password" class="In" placeholder="Confirmela" id="NewPassConfirm">
            <button class="Boton" onclick="user.VerifyPassWord()">Cambiar contraseña</button>`;
    }


    /* Esta función estatica "limpia" la carta existente para que no
       se acumulen en el documento */
    static CrearCarta() {
        try {
            let x = document.getElementById("x");
            document.body.removeChild(x);
        } catch { }
        const Carta = document.createElement("div");

        Carta.id = "x";
        document.body.appendChild(Carta);
    }
}
