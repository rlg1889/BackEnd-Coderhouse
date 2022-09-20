const Contenedor = require("./container")
const express = require("express");
const productos = new Contenedor("productos.txt");

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
app.get("/productos", (req, res) => {
  const pagProductos = async () => {
        const arrayProductos = await productos.getAll();
        let template = ``;
        arrayProductos.map(
              (item) =>
                    (template += `<h1 style="color: grey">${item.title} </h1>
                    \n <h2 >Precio $<span style="color: blue">${item.price}</span></h2>
                    \n<img width="100px" height="auto"src="${item.thumbnail}">`)
        );
        res.send(template);
  };
pagProductos();
});

//Utiliza la funcion de traer todos los objetos, y filtra segun un ID aleatorio del producto.
app.get("/productoRandom", (req, res) => {
  const pagRandom = async () => {
    const arrayProductos = await productos.getAll();
    let numero = Math.floor(Math.random() * (arrayProductos.length - 1 + 1));
    let productoRandom = [];
    const listaProductos = arrayProductos.map((item, index) => index === numero && productoRandom.push(item));
    let template = `<h1 style="color: grey">${productoRandom[0].title} </h1>
                    \n <h2 >Precio $<span style="color: blue">${productoRandom[0].price}</span></h2>
                    \n<img width="100px" height="auto"src="${productoRandom[0].thumbnail}">`;
    res.send(template);
  };
pagRandom();
});