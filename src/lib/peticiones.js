const fs = require('fs');

const controlador = {};

controlador.agregar = (req, res) =>{
    /*req.getConnection((err, conn) =>{

        /*conn.query('SELECT * FROM nada', (err, datos)=>{
            if(err){
                res.json(err);
            }else{
                console.log(datos);
                res.render('clientes.ejs', {
                    data: datos 
                });
            }
        });
    });*/
    console.log(req.body);
    try {
        const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
        console.log(datos);
        const json = datos + 
        `
        `+ JSON.stringify(req.body);
        
        try {
          fs.writeFileSync('./file.json', json);
        } catch (err) {
          throw err;
        }
    } catch (err) {
      throw err;
    }
    
    res.json('{1:"no"}');
}

controlador.consultar = (req, res) =>{
    const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
    //console.log(JSON.parse(datos));
    productos = JSON.parse(datos);
    for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == req.body.codigo){
            //console.log(productos[index]);
            //console.log('');
            var json = JSON.stringify({"codigo": req.body.codigo});
            res.json(json);
        }  
    }
    //console.log(req.body.codigo);
    //res.json('{"codigo": 9}');
}

controlador.solicitar = (req, res) =>{
    console.log(req.body);
    const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
    productos = JSON.parse(datos);
    for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == req.body.id){
            //console.log(productos[index]);
            //console.log('');
            var json = productos[index];
            console.log(json);
            res.json(json);
        }  
    }
    //res.json({});
    //res.json(datos);
}

module.exports = controlador;