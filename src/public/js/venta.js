
var btnAgregar = document.getElementById("btn-agregar");
var btnIncluir = document.getElementById("btn-incluir");
var codNuevo = document.getElementById("codigo-nuevo");

btnAgregar.addEventListener("click", function(){
    AgregarIncluir("mostrar")
    
});
btnIncluir.addEventListener("click", function(){
    AgregarIncluir("esconder");
    /*
    fetch(myRequest)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Algo anda mal con el servidor");
      }
    })
    .then((response) => {
      console.log(response);
      // ...
    })
    .catch((error) => {
      console.error(error);
    });*/
});

document.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        //const count = productos.push(); console.log(count);
        var encontrado = false;
        for (let index = 0; index < productos.length; index++) {
          if(productos[index].id == document.getElementById("codigo").value){
              //console.log(productos[index]);
              agregar(productos[index]);
              var encontrado = true;
          }  
        }
        if(encontrado == false){
        
          console.log(solicitarproductos(document.getElementById("codigo").value));
            fetch(solicitarproductos(document.getElementById("codigo").value))
          .then((response) => {
            
            if (response.status === 200) {
              return response.json();
              
            } else {
              throw new Error("Algo anda mal con el servidor");
            }
          })
          .then((response) => {
            
            var tamaño = productos.push(response);
            console.log(productos);
            agregar(productos[tamaño - 1]);
          })
          .catch((error) => {
            console.error(error);
          });
        }
        

        //productos.push();
        
        document.getElementById("codigo").value = "";
    }
});

codNuevo.addEventListener("change", function(event){
  console.log(`Buscando codigo ${event.target.value}`);
  confirmarcodigo(event.target.value);
});



function agregar(producto) {
    if(document.getElementById("A" + producto.id)){ //para evitar agregar doble
        //console.log("existe");
        var cantidad = parseInt(document.getElementById("A" + producto.id).lastElementChild.textContent) + 1;
        //console.log(cantidad)
        document.getElementById("A" + producto.id).lastElementChild.textContent = cantidad;
    } else{
        var identificador = "A" + producto.id;
        var articulo = document.createElement("li");
        articulo.className = "list-group-item d-flex justify-content-between align-items-start";
        articulo.id = identificador;
        document.getElementById("canasta").appendChild(articulo);
        document.getElementById("A" + producto.id).innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">`+ producto.producto +`</div>
          $` + producto.precio + `
        </div>
        <span class="badge bg-primary rounded-pill">1</span> `;
    }
    //parseInt(document.getElementById("A" + producto.id).lastElementChild.textContent)
    //console.log(producto);
    //console.log(document.getElementById("A" + producto.id).lastElementChild.textContent);
 }

function AgregarIncluir(accion){
    //acciones posibles
    // mostrar y esconder
    
    var agregar = document.getElementById('form-agregar');
    var incluir = document.getElementById('form-incluir');

    if(accion == "mostrar"){
        agregar.className = "card agregar";
        incluir.className = "card agregar visually-hidden";
        //document.getElementsByClassName('agregar').className = "card agregar visually-hidden";
        
    }
    if(accion == "esconder"){
        incluir.className = "card incluir";
        agregar.className = "card agregar visually-hidden";
    }

}

JsBarcode(".codigobarras", "00001", {
    format: "EAN5",
    width:2,
    height:40,
    displayValue: true
  });
