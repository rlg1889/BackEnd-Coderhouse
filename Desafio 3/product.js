const Contenedor = require('./desafio.js')

const run = async function () {
    let contenedor = new Contenedor('productos.txt')
    contenedor.save({
        title: "Buzo de niño",
        price: 1900,
        thumbnail: "https://i.imgur.com/Rub3jXP.jpg"
    })

    contenedor.save({
        title: "Remera de niño",
        price: 1100,
        thumbnail: "https://i.imgur.com/FLQjkqT.jpg"
    })

    contenedor.save({
        title: "Jean de niño",
        price: 1200,
        thumbnail: "https://i.imgur.com/buuU6WS.jpg"
    })
    console.log(contenedor.getById(1));
    console.log(contenedor.getById(5));
    console.log(contenedor.getAll());
    console.log(contenedor.deleteById(1));
    console.log(contenedor.deleteById(6));
    console.log(contenedor.getAll());
    console.log(contenedor.deleteAll());
    console.log(contenedor.getAll());
};

run();