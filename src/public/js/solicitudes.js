
console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));

function confirmarcodigo(codigo){
  var encontrado = false;
  for (let index = 0; index < productos.length; index++) {
    if(productos[index].id == codigo){
        //console.log(productos[index]);
        //agregar(productos[index]);
        permitirNuevo(!encontrado);
        encontrado = true;
    }  
  }
  if(encontrado == false){
  //consultarcodigo(codigo);
  consultarcodigo(codigo);
}
}

function guardarproducto(nObjeto, usuario){
  //id, cantidad, precio, producto
  const cuerpo = JSON.stringify({
    id: nObjeto.codigo,
    cantidad: nObjeto.cantidad,
    precio: nObjeto.precio,
    producto: nObjeto.producto,
  });
  var miInicializador = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
    body: cuerpo,
    bodyUsed: "true",
  };
  const myRequest = new Request("http://localhost:21540/agregar", miInicializador);
  
  const myURL = myRequest.url; // http://localhost/api
  const myMethod = myRequest.method; // POST
  const myCred = myRequest.credentials; // omit
  const bodyUsed = myRequest.bodyUsed; // true
  
  //console.log(myURL);
  //console.log(myMethod);
  //console.log(myCred);
  //console.log(bodyUsed);
  
  return myRequest;
  
}

function consultarcodigo(codigo){
  const cod = JSON.stringify({"codigo" : codigo});
  //console.log(cod);
  var miInicializador = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
    body: cod,
  };
  const myRequest = new Request("http://localhost:21540/consultar", miInicializador);
  
  const myURL = myRequest.url; // http://localhost/api
  const myMethod = myRequest.method; // POST
  const myCred = myRequest.credentials; // omit
  const bodyUsed = myRequest.bodyUsed; // true
  
  //console.log(myURL);
  //console.log(myMethod);
  //console.log(myCred);
  //console.log(bodyUsed);
  
  //return myRequest;
  fetch(myRequest)
    .then((response) => {
      if (response.status === 200) {
        //console.dir(response.json());
        //console.log(response.status);
        return response.json();
      } else {
        throw new Error("Algo anda mal con el servidor");
      }
    })
    .then((response) => {
      //console.dir(response);
      //var cadenajson = JSON.stringify(response);
      var respuesta = JSON.parse(response);
      console.log(respuesta.codigo);
      if(respuesta.codigo == 0){
        permitirNuevo(true);
      }else{
        permitirNuevo(false);
      }
      /*if(response == codigo){
        return true;
      }*/
      // ...
    })
    .catch((error) => {
      console.log("error en la respuesta")
      console.error(error);
    });
}

function solicitarproductos(codigo){
  //console.log(codigo);
  const cuerpo = JSON.stringify({
    id: codigo
  });
  var miInicializador = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
    body: cuerpo,
    bodyUsed: "true",
  };
  const myRequest = new Request("http://localhost:21540/solicitar", miInicializador);
  
  const myURL = myRequest.url; // http://localhost/api
  const myMethod = myRequest.method; // POST
  const myCred = myRequest.credentials; // omit
  const bodyUsed = myRequest.bodyUsed; // true
  
  //console.log(myURL);
  //console.log(myMethod);
  //console.log(myCred);
  //console.log(bodyUsed);
  
  return myRequest;
}


