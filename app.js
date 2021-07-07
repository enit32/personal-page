const express = require('express');
const path = require('path'); 
const handlebars = require('express-handlebars');
const fs = require('fs');
const morgan = require('morgan');
const rutas = require('./src/rutas');
const port = 21540;
var registroAcceso = fs.createWriteStream(path.join(__dirname, 'registro.log'), {flags: 'a'});

//inicializar 
const app = express();

//Configuraciones
app.set('views', path.join(__dirname, 'src/views'))
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/src/views/layout`,
    partialsDir: `${__dirname}/src/views/partials`,
    extname: '.hbs',
    helpers: require('./src/lib/handlebars')
}));
app.set('view engine', '.hbs'); 
app.use(morgan('common', {stream: registroAcceso}));

//publicos
app.use(express.static(__dirname + '/src/public'));

//rutas
app.use('/', rutas);

//inicializa el servidor
app.listen(port, ()=>{
    console.log(`Servidor en puerto ${port}`);
});
