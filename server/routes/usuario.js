const express = require('express');
const bcrypt = require('bcrypt');
//Importo el modelo de usuarios para usarlo al momento en el que se hacen las peticiones rest
const modeloUsuario = require('../models/usuario');
const UsuarioModel = modeloUsuario.model;
let UsuarioDto = modeloUsuario.dto;

const app = express();

app.get('/usuario', ( req, res ) => {
    res.json("get usuario");
})

app.post('/usuario', ( req, res ) => {
    let body = req.body;
    //De esta manera creo un nuevo objeto con el modelo que quiera usar. En este caso es el modelo de Usuario 
    let usuarioModel = new UsuarioModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    }); 
    //de esta manera guardo un nuevo usuario en la bd mongo
    usuarioModel.save( ( err, usuarioDb ) => {
        //verifico si hubo error y controlo la respuesta
        if(err){
            return res.status( 400 ).json({
                ok: false,
                err
            })
        }
        //si todo va bien, indico que la operacion es ok y retorno el usuario que ingresaron
        UsuarioDto.nombre = usuarioDb.nombre;
        UsuarioDto.email = usuarioDb.email;
        UsuarioDto.img = usuarioDb.img
        res.json({
            ok: true,
            usuario: UsuarioDto
        })

    } )
    
})

app.put('/usuario', ( req, res ) => {
    res.json("put usuario");
})

app.put('/usuario/:id', ( req, res ) => {
    let id = req.params.id;
    res.json({
        id
    });
})

app.delete('/usuario', ( req, res ) => {
    res.json("delete usuario");
})

module.exports = app