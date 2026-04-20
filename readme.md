Este proyecto consistia en la creacion de una API REST utilizando node y express, esta nos permite registrar, actualizar, consultar y eliminar distintos dispositivos en este caso

Las tecnologias que utilice fueron
- Node.js
- Express

Ejecucion del Proyecto:

copias el link de mi repositorio y en la terminal escribes

git clone "Mi link"

luego entras a mi carpeta escribiendo 

cd TP Backend - Redes

Luego instalas las dependencias con npm install

recuerda que debes crear un archivo .env con el siguiente contenido

PORT=3000 (o el puerto que quieras utilizar)

luego inicias el servidor utilizando

npm start o npm run dev

y te deberia aparecer algo como 

Servidor en: http://localhost:3000

ENDPOINTS:

Para obtener todos los dispositivos

GET http://localhost:3000/dispositivos

Obtener los dispositivos en base a su estado

GET http://localhost:3000/dispositivos?estado=activo

Obtener un dispositivo por su id

GET http://localhost:3000/dispositivos/2

Crear un dispositivo nuevo

Recuerde que debe tener el Body en Json con esto
  {
    nombre: "PC-Escuela",
    ip: "195.170.0.10",
    estado: "inactivo",
    tipo: "pc"
  }

POST http://localhost:3000/dispositivos/

Actualizar un dispositivo

PUT http://localhost:3000/dispositivos/id

Eliminar un dispositivo

DELETE http://localhost:3000/dispositivos/id

MIDDLEWARES

Se implementaron los Middlewares de logs en la consola y de validacion de datos
el primero muestra en la consola el momento en que se realizo el request
y el segundo valida los datos recibidos en Post y Put

