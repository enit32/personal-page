const fila = document.querySelector('.contenedor-cinta');
const imagen = document.querySelectorAll('.imagenes-cinta');

const izquierda = document.getElementById('izquierda');
const derecha = document.getElementById('derecha');

//aqui va un event listener para las flechas
derecha.addEventListener('click', () => {
   fila.scrollLeft += fila.offsetWidth;
   if(fila.scrollLeft + fila.offsetWidth >= fila.scrollWidth){
	   fila.scrollLeft = 0;
	   }
   const indicadorActivo = document.querySelector('.indicadores .activo');
   if(indicadorActivo.nextSibling){
      indicadorActivo.nextSibling.classList.add('activo');
      indicadorActivo.classList.remove('activo');
      }else {
		  document.querySelector(".indicadores").firstElementChild.classList.add('activo');
		  indicadorActivo.classList.remove('activo');
		  }
      });
izquierda.addEventListener('click', () => {
   fila.scrollLeft -= fila.offsetWidth;
   if(fila.scrollLeft <= 0){
	   fila.scrollLeft = fila.scrollWidth;
	   console.log("llegamos a 0");
	   }
   const indicadorActivo = document.querySelector('.indicadores .activo');
   if(indicadorActivo.previousSibling){
      indicadorActivo.previousSibling.classList.add('activo');
      indicadorActivo.classList.remove('activo');
    }else{
		document.querySelector(".indicadores").lastElementChild.classList.add('activo');
		indicadorActivo.classList.remove('activo');
		}
});

const paginas = Math.ceil(imagen.length/8);

for(let i = 0; i<paginas; i ++){
    const indicador = document.createElement('button');
    if (i === 0){
        indicador.classList.add('activo');
    }
    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
        fila.scrollLeft = i * fila.offsetWidth;
        document.querySelector('.indicadores .activo').classList.remove('activo');
        e.target.classList('activo');
});   
}

// para el hover xdxd
imagen.forEach((imag) => {
    imag.addEventListener('mouseenter', (e)=>{
    const elemento = e.currentTarget;
    setTimeout(() => {
        imagen.forEach(imag => imag.classList.remove('hover'));
        elemento.classList.add('hover');
    },300);
    });
});

fila.addEventListener('mouseleave', () => {
    imagen.forEach((imag)=>{
        imag.classList.remove('hover');
    });
} );


/* fila.addEventListener('mouseleave.'() => {
    imagen.forEach((imag)=>{
    imag.classList.remove('hover');
});
}); */
