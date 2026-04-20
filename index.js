const express = require('express');
const app = express();

//Define el puerto.
//Usa variable de entorno si existe, sino 3000
const PORT = process.env.PORT || 3000;

//MIDDLEWARE

app.use(express.json());

//Se ejecuta en TODAS las peticiones
app.use((req, res, next) => {

  //Guarda fecha actual
  const fecha = new Date().toISOString();

  //Muestra método, ruta y fecha en consola
  console.log(`[${req.method}] ${req.url} - ${fecha}`);

  //Continúa al siguiente middleware
  next();
});

//"BASE DE DATOS"

//Array en memoria
let dispositivos = [
  {
    id: 1,
    nombre: "PC-Oficina",
    ip: "192.168.0.10",
    estado: "activo",
    tipo: "pc"
  }
];

//MIDDLEWARE VALIDACIÓN

//Función middleware para validar datos antes de POST o PUT
function validarDispositivo(req, res, next) {

  const { nombre, ip, tipo } = req.body;

  //Si falta nombre o tipo devuelve error 400
  if (!nombre || !tipo) {
    return res.status(400).json({
      error: "Nombre y tipo obligatorios"
    });
  }

  const ipValida = /^(\d{1,3}\.){3}\d{1,3}$/;

  //Si no coincide devuelve error 400
  if (!ipValida.test(ip)) {
    return res.status(400).json({
      error: "IP inválida"
    });
  }

  next();
}

//ENDPOINTS

//GET todos los dispositivos
app.get('/dispositivos', (req, res) => {

  const { estado } = req.query;

  if (estado) {

    //Filtra por estado
    const filtrados = dispositivos.filter(
      d => d.estado === estado
    );

    //Devuelve filtrados
    return res.status(200).json(filtrados);
  }

  res.status(200).json(dispositivos);
});

//GET dispositivo por ID
app.get('/dispositivos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  //Busca dispositivo
  const dispositivo = dispositivos.find(
    d => d.id === id
  );

  //Si no existe devuelve 404
  if (!dispositivo) {
    return res.status(404).json({
      error: "No encontrado"
    });
  }

  res.status(200).json(dispositivo);
});


//POST crear dispositivo
app.post('/dispositivos', validarDispositivo, (req, res) => {

  const { nombre, ip, estado, tipo } = req.body;

  //Crea nuevo objeto
  const nuevo = {
    id: dispositivos.length + 1,
    nombre,
    ip,
    estado,
    tipo,
    createdAt: new Date()
  };

  dispositivos.push(nuevo);

  res.status(201).json(nuevo);
});


//PUT actualizar dispositivo
app.put('/dispositivos/:id', validarDispositivo, (req, res) => {

  //Obtiene ID
  const id = parseInt(req.params.id);

  const index = dispositivos.findIndex(
    d => d.id === id
  );

  //Si no existe
  if (index === -1) {
    return res.status(404).json({
      error: "No encontrado"
    });
  }

  dispositivos[index] = {
    ...dispositivos[index],
    ...req.body
  };

  res.status(200).json(dispositivos[index]);
});


//DELETE eliminar dispositivo
app.delete('/dispositivos/:id', (req, res) => {

  //Obtiene id
  const id = parseInt(req.params.id);

  const existe = dispositivos.some(
    d => d.id === id
  );

  if (!existe) {
    return res.status(404).json({
      error: "No encontrado"
    });
  }

  //Filtra quitando el dispositivo
  dispositivos = dispositivos.filter(
    d => d.id !== id
  );

  res.status(200).json({
    mensaje: "Eliminado correctamente"
  });
});

//SERVIDOR

//Inicia servidor
app.listen(PORT, () => {

  //Mensaje en consola
  console.log(`Servidor corriendo en puerto ${PORT}`);
});