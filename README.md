# VirusControlUy

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 9.1.4 y [Node.js](https://nodejs.org/es/) versión 12.16.3 LTS.

## Antes arrancar..

Ejecutar el comando `npm install` en la raíz del proyecto.

## Luego... Servidor de desarrollo

Ejecutar `ng serve --open` para levantar un servidor de desarrollo en tu navegador de preferencia. En caso de que no te lo abra, puedes acceder ingresando a la url `http://localhost:4200/`. La aplicación automáticamente se recargará si tu realizas algún cambio en los archivos fuente.

## Probar los casos de usos

Para probar los casos de usos en esta primer entrega debes realizar lo siguiente:

- Iniciar sesión con el botón que aparecerá en la parte superior derecha de este [home](http://localhost:4200/home)
- Si inicias como ciudadano y es la primera vez, te redirigirá a la siguiente [pantalla](http://localhost:4200/ciudadano/perfil) y en caso de que no sea la primera vez, te llevará al [home](http://localhost:4200/ciudadano/home) del ciudadano.
- Si inicias como médico, te llevará al [home](http://localhost:4200/ciudadano/home) del médico.
- Como médico puedes acceder a los siguientes casos de uso:

- Listar visitas pendientes, en el botón del menú de la izquierda [Listar visitas pendientes](http://localhost:4200/medico/listar-visitas)
- Solicitar examén ciudadano, en el botón del menú de la izquierda [Solicitar examén ciudadano](http://localhost:4200/medico/solicitar-examen)
