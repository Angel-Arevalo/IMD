Instructivo de cómo iniciar el servidor del back-end.

Entrar al archivo conexionFront y correr el código.
Recuerde que debe poner estas lineas de código en la consola para que pueda lograrlo:

´
pip install flask
pip install flask_cors
pip install sqlite3
´


Siguiente paso para los del back-end:
- Lograr que el usuario sea único, osea, que no se repitan los usuarios

Para ver el front-end ingrese a la carpeta ...\front-end\Log-in\Login.html


22-03-24
Ariel Cardenas: 

Angel porfa revisa como va a ser el tratamiento de datos, al crear la funcion que revisa el login supongo que la contraseña que recibo no esta encriptada, entonces la encripto y la comparo con la contraseña encriptada en la base de datos

#Si hay un error que dice tabla cerrada, verifiquen que no se haya generado una tabla en la carpeta, si es asi eliminarla manualmente desde el file explorer, en otro caso, conectarse a la base de datos, eliminar tabla y cerrar base de datos. Asi el problema se deberia solucionar.

#Falta crear archivo administrador  