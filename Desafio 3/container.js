const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = "./"+name
        this.countID = 0
        this.content = []
    }

    //Función que escribe/sobreescribe.
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
    }

    //Función que guarda un objeto en el archivo.
    save(object) {
        this.countID++
        object["id"] = this.countID 
        this.content.push(object)
        this.write()
        return `❕ El id del objeto añadido es ${this.countID} ❕`
    }

    //Función que devuelve todos los objetos del archivo.
    async getAll() {
        try {   
            const contenido = await fs.readFileSync(this.fileName,"utf-8");  
                if (contenido !== 0) {
                        return JSON.parse(contenido);
                    } else {
                          throw new Error(`el archivo ${this.fileName} esta vacio ⭕`);
                    }
            } catch (error) {
              console.log(error.message);
            }}

    //La función recibe un id y devuelve el objeto con ese id, en el caso que sea Null se indica que el archivo esta vacio.
    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = '❌ No se encuentra el objeto con el ID ❌'
            }
        } else {
            result = 'El archivo está vacío ⭕'
        }
        return result
    }

    //La función elimina del archivo el objeto con el id buscado.
    deleteById(id) {
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write()
            result = 'Eliminado ♻️'
        } else {
            result = `El archivo está vacío ⭕`
        }
        return result
    }

    async createEmptyFile() {
        this.write(this.fileName,[]);
        console.log("Se vacio el archivo")
      }
    
    deleteAll() {
        this.createEmptyFile();
      }

}

module.exports = Contenedor