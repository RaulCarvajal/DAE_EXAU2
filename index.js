const express = require(express);
const app =  express();
const bodyParser = require('body-parser');
const status = require('http-status');


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/u3_exa', { useNewUrlParser: true });

const Product = require('./schema.js');


app.get('/',(req,res)=>{
    var arr=[];
    Product.find({})
        .then(products => {
            products.forEach(e=>{
                if(e.qty<e.min){
                    arr.push(e);
                }
            })
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa, productos que nececitan reabastecimiento",
                detail: products
            });
        })
        .catch(error => { 
            res.status(400);
            res.json({
                code: 400,
                msg: "Error!!!",
                detail: error
            });
        });
});

app.post('/',(req,res)=>{
    const product = req.body;
    console.log(req);
    Product.create(product)
        .then(data => {
            console.log(data);
            res.status(200);
            res.json({
                code: 200,
                msg: "Saved!!!",
                detail: data
            });
        })
        .catch(error => {
            console.log(error);
            res.status(400);
            res.json({
                code: 400,
                msg: "No se pudo insertar!!!",
                detail: error
            });
        });
});

app.listen(3030);