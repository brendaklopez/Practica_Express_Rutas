const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const { infoLenguajes } = require('./src/lenguajesFrontBack');
let miJson = JSON.stringify(infoLenguajes);

//console.log(infoLenguajes.frontend[1])

console.log(typeof infoLenguajes)
console.log(typeof miJson)
//console.log(miJson)

//console.log(infoLenguajes)


//GET que accede a la raiz
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

app.get('/api/lenguajes/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(infoLenguajes));
})

app.get('/api/lenguajes/frontend', (req, res) => {
    //res.send(infoLenguajes.frontend);
    res.send(JSON.stringify(infoLenguajes.frontend));
})

app.get('/api/lenguajes/frontend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);

})
//EJERCICIO 02.1
app.get('/api/lenguajes/backend', (req, res) => {
    res.send(JSON.stringify(infoLenguajes.backend));
})
//EJERCICIO 02.2
app.get('/api/lenguajes/backend/:lenguaje', (req,res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(`El parametro Backend recibido es: ${lenguaje}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    );

    if (filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }
    res.status(200).send(filtrado);
});

//EJERCICIO 02.3

app.get('/api/lenguajes/backend/turno/:turno', (req,res)=> {
    const turno = req.params.turno.toLocaleLowerCase();
    console.log(`El parametro de turno Backend es: ${turno}`)
    const filtrado = infoLenguajes.backend.filter(
        turnos => turnos.turno.toLocaleLowerCase() === turno
    );
    if (filtrado.length == 0 ){
        return res.status(404).send(`No se encontró el curso con el turno: ${turno}`)
    }
    res.status(200).send(filtrado);
});

//EJERCICIO 02.4

app.get('/api/lenguajes/frontend/turno/:turno', (req,res) =>{
    const turno = req.params.turno.toLocaleLowerCase();
    console.log(`El parametro de turno Frontend es: ${turno}`)
    const filtrado = infoLenguajes.frontend.filter(
        turnos => turnos.turno.toLocaleLowerCase() === turno
    );

    if (filtrado.length == 0){
        return res.status(404).send(`No se encontro el curso con el turno: ${turno}`

        )
    }
    res.status(200).send(filtrado);
})

//EJERCICIO 02.5
app.get('/api/lenguajes/backend/cantidad/:cantidadAlumnos', (req,res) =>{
    const cantidad = parseInt(req.params.cantidadAlumnos);
    console.log(`El par cantidad de alumnos backend es: ${cantidad}`)
    const filtrado = infoLenguajes.backend.filter(
        alumnos => alumnos.cantidadAlumnos >= cantidad 
    )
    if (filtrado.length == 0){
        return res.status(404).send(`No se encontro el curso de: ${cantidad}`

        )
    }
    res.status(200).send(filtrado);
    });

//EJERCICIO 02.6
app.get('/api/lenguajes/frontend/cantidad/:cantidadAlumnos', (req,res) => {
    const cantidad = parseInt(req.params.cantidadAlumnos);
    console.log(`El par cantidad de alumnos frontend es: ${cantidad}`)
    const filtrado = infoLenguajes.backend.filter(
        alumnos => alumnos.cantidadAlumnos >= cantidad 
    )
    if (filtrado.length == 0){
        return res.status(404).send(`No se encontro el curso de: ${cantidad}`

        )
    }
    res.status(200).send(filtrado);
});
//EJERCICIO 02.7
/* 7) Generar un endpoint, con método GET, con la ruta /api/lenguajes/ 
Que reciba por URL param, el parámetro "cantidadAlumnos". 
Al invocar esta ruta del servidor, me debe traer TODOS los lenguajes que tengan la misma 
cantidad de alumnos, o más, que la que se pasó por parámetro. */
app.get('/api/lenguajes/cantidad/:cantidadAlumnos', (req,res) =>{
    const cantidad = parseInt(req.params.cantidadAlumnos);
    console.log(`El pararametro cantidad es: ${cantidad}`)
    const ambosLenguajes = [...infoLenguajes.frontend, ...infoLenguajes.backend]
    const filtrado = ambosLenguajes.filter(
        alumnos => alumnos.cantidadAlumnos >= cantidad 
    )
    if (filtrado.length == 0){
        return res.status(404).send(`No se encontro el curso de: ${cantidad}`

        )
    }
    res.status(200).send(filtrado);
});
app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
