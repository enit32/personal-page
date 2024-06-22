
//document.getElementById("codigo")

document.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        for (let index = 0; index < productos.length; index++) {
            if(productos[index].id == document.getElementById("codigo").value){
                //console.log(productos[index]);
                agregar(productos[index]);
            }
            
        }
        document.getElementById("codigo").value = "";
    }
})

function agregar(producto) {
    if(document.getElementById("A" + producto.id)){ //para evitar agregar doble
        console.log("existe");
        var cantidad = parseInt(document.getElementById("A" + producto.id).lastElementChild.textContent) + 1;
        console.log(cantidad)
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

 JsBarcode(".codigobarras", "00001", {
    format: "EAN5",
    width:2,
    height:40,
    displayValue: true
  });