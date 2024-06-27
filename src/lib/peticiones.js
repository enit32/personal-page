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
    //console.log(req.body);
    try {
        const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
        
        var json = JSON.parse(datos);
        var cont = json.push(req.body);
        //console.log(json);
        
        try {
          fs.writeFileSync('./file.json', JSON.stringify(json));
        } catch (err) {
          throw err;
        }
        res.json('{"incluidos": '+ cont +' }');
    } catch (err) {
      throw err;
    }
    
    
}

controlador.consultar = (req, res) =>{
    var encontrado = false;
    const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
    //console.log(JSON.parse(datos));
    productos = JSON.parse(datos);

    for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == req.body.codigo){
            //console.log(productos[index]);
            //console.log('');
            var json = JSON.stringify({"codigo": req.body.codigo});
            encontrado = true;
            res.json(json);
        }  
    }
    if(encontrado == false){
        res.json('{"codigo": 0}');
    }
    //console.log(req.body.codigo);
}

controlador.solicitar = (req, res) =>{
    //console.log(req.body);
    var encontrado = false;
    const datos = fs.readFileSync('./file.json', { encoding: "utf-8" });
    productos = JSON.parse(datos);
    for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == req.body.id){
            //console.log(productos[index]);
            //console.log('');
            var json = productos[index];
            //console.log(json);
            res.json(json);
            encontrado = true;
        }  
    }
    if(!encontrado) res.json({"id": 0});
    //res.json(datos);
}



module.exports = controlador;