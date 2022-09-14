const Contenedor = require("./container")
const express = require("express");
const productos = new Contenedor("./productos.txt");

// Se inicializa el servidor
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Mensaje de bienvenida.
app.get("/", (req, res) => {
  res.send(`<h1 style='color:gray;'>Bienvenidos al Servidor</h1>`);
});

//Utiliza la funcion de traer todos los objetos del archivo y mostrarlos.
app.get("/productos", async (req, res) => {
    const arrayProductos = await productos.getAll();
    res.send(arrayProductos);
  });

//Utiliza la funcion de traer un objeto por ID aleatorio.
app.get("/productoRandom", async (req, res) => {
    const random = await productos.getById(Math.floor(Math.random() * (productos.countID - 1 + 1) + 1));
    res.send(random);
  });
