
var btnAgregar = document.getElementById("btn-agregar");
var btnIncluir = document.getElementById("btn-incluir");
var codNuevo = document.getElementById("codigo-nuevo");
var preNuevo = document.getElementById("precio-nuevo");
var prodNuevo = document.getElementById("producto-nuevo");
var btnCerrar = document.getElementById("btn-cerrar");
var inputCodigo = document.getElementById("codigo");
var permitir = false;
var canasta = [];

btnAgregar.addEventListener("click", function(){
    AgregarIncluir("mostrar")
    
});

btnIncluir.addEventListener("click", function(){
  var productoNuevo = {}
  var agregar = false;
  if(permitir){
    agregar = true;
  }
  if(!codNuevo.value){
    codNuevo.className = "form-control is-invalid";
    agregar = false;
  }
  if(!preNuevo.value){
    preNuevo.className = "form-control is-invalid";
    agregar = false;
  }
  if(!prodNuevo.value){
    prodNuevo.className = "form-control is-invalid";
    agregar = false;
  }
  

  if(agregar){
    preNuevo.className = "form-control";
    prodNuevo.className = "form-control";
    productoNuevo.codigo = parseInt(codNuevo.value);
    productoNuevo.cantidad = 1;
    productoNuevo.precio = parseInt(preNuevo.value);
    productoNuevo.producto = prodNuevo.value;
    
    fetch(guardarproducto(productoNuevo))
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Algo anda mal con el servidor");
      }
    })
    .then((response) => {
      console.log(response);
      codNuevo.value = "";
      preNuevo.value = "";
      prodNuevo.value = "";
      preNuevo.className = "form-control";
      prodNuevo.className = "form-control";
      codNuevo.className = "form-control";
      AgregarIncluir("esconder");
      inputCodigo.focus();
      // ...
    })
    .catch((error) => {
      console.error(error);
    });
    
    
  }else{
    console.log("tefaltalgo")
  }

});

btnCerrar.addEventListener('click', function () {
  AgregarIncluir("esconder");
  inputCodigo.focus();
})

inputCodigo.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        //const count = productos.push(); console.log(count);
        var encontrado = false;
        console.log("solicitando " + inputCodigo.value);
        if(inputCodigo.value == "") encontrado = true;
        if(!encontrado){
          for (let index = 0; index < productos.length; index++) {
            if(productos[index].id == document.getElementById("codigo").value){
                //console.log(productos[index]);
                agregar(productos[index]);
                var encontrado = true;
            }  
          }
        }
        
        if(encontrado == false){
        
          //console.log(solicitarproductos(document.getElementById("codigo").value));
            fetch(solicitarproductos(document.getElementById("codigo").value))
          .then((response) => {
            
            if (response.status === 200) {
              return response.json();
              
            } else {
              throw new Error("Algo anda mal con el servidor");
            }
          })
          .then((response) => {
            //console.log()
            if(response.id == 0){

            }else{
              var tamaño = productos.push(response);
              console.log(productos);
              agregar(productos[tamaño - 1]);
            }
            
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

function cerrarCanasta(){
  
}

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

function permitirNuevo(T){
  var mensaje = document.getElementById("liveToast");
  var codbarras = document.getElementById("codigo-nuevo");

  if(T){
    btnIncluir.className = "btn btn-success btn-block";
    codbarras.className = "form-control";
    permitir = true;
  }else{
    btnIncluir.className = "btn btn-light btn-block";
    codbarras.className = "form-control is-invalid";
    mensaje.className = "toast show";
    setTimeout(() => {
      mensaje.className = "toast hide";
    }, "2800");
    permitir = false;
  }
}

JsBarcode(".codigobarras", "00001", {
    format: "EAN5",
    width:2,
    height:40,
    displayValue: true
  });
