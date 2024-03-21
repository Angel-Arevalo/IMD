class Registro {
    //Variables
    #Username; #UserPassword; #UserEmail; #Rol;

    //Constructor
    constructor() {
        this.#Username = "";
        this.#UserPassword = "";
        this.#UserEmail = "";
        this.#Rol = "";
    }

    //Guarda el usuario
    SaveUser() {
        let Name = document.getElementById('UserName').value;
        let Pass = document.getElementById('PassWord').value;
        let Addres = document.getElementById('Email').value;
        
        if (Name != "" && Pass!= "" && Pass.length >= 8 && Addres != "") {
            console.log("Hello world");
            this.#UserPassword = Pass;
            this.#Username = Name;
            this.#UserEmail = Addres;
            this.#Rol = document.getElementById('Selector');
            this.SendData();
        } else this.AlertUser(Name,Pass);
    }

    SendData () {
        fetch('http://localhost:5000/ruta_del_backend', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'Nombre':this.#Username,
                                  'Contraseña':this.#UserPassword,
                                  'Correo': this.#UserEmail,
                                  'Rol': this.#Rol})
        }
        )
        .then(response => response.json())
        .then(data => {
            if (data.mensaje == "Usuario en uso") {
                alert("Usuario en uso");
            }
            console.log(data.mensaje);
        })
        .catch(error => console.error('Error:', error));
    }

    //Método para alertar que se está insertando algo mal
    AlertUser(Name, Pass) {
        let Help = "", bool = false;
        if (Name == "") {
            Help += "Usuario incorrecto. ";
        } if (Pass == "") {
            bool = true;
            Help += "Contraseña vacía. ";
        } if (Pass.length < 8 && bool == false) {
            Help += "Contraseña invalida.";
        }
        alert(Help);
    }
    printDcot() {
        console.log(this.#Username, " ", this.#UserPassword);
    }
}

const regis = new Registro();

function Send() {
    console.log("Hello world");
    regis.SaveUser();
    regis.printDcot();
}