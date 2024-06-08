import express from "express"; // Importa el módulo Express para crear una aplicación web
import { join } from "path"; // Importa la función `join` del módulo `path` para unir rutas de archivos
import indexRouter from './routes/index.routes.js'
// Inicialización de Express (Initialization of Express)
const App = express(); // Crea una instancia de la aplicación Express

// Propiedades de Express (Express Properties)

// Servir archivos estáticos:
App.use(express.static(join('public'))); // Sirve archivos estáticos (imágenes, CSS, JavaScript) desde la carpeta 'public'
//   - `express.static(join( 'public'))`: Este middleware le indica a Express que sirva archivos estáticos desde el directorio 'public' relativo a la ubicación del archivo actual (`__dirname`).

// Analizar datos JSON:
App.use(express.json()); // Analiza los cuerpos de las solicitudes entrantes que están en formato JSON y hace que los datos analizados estén disponibles en el objeto `req.body` en sus manejadores de rutas.

// Analizar datos de formulario codificados por URL:
App.use(express.urlencoded({ extended: true })); // Analiza los cuerpos de las solicitudes entrantes que son datos de formulario codificados por URL y hace que los datos analizados estén disponibles en el objeto `req.body` en sus manejadores de rutas.
//   - `{ extended: true }`: Esta opción permite una anidación más profunda de objetos en los datos analizados.

// Establecer el puerto:
App.set('port', process.env.PORT || 2224); // Establece el número de puerto en el que escuchará el servidor
//   - `process.env.PORT`: Busca una variable de entorno llamada 'PORT' (por ejemplo, establecida en un entorno de implementación). Si existe, se usa. De lo contrario, el valor predeterminado es el puerto 2224.

//  Establecer el motor de plantillas:
App.set('view engine', 'ejs'); // Le indica a Express que use EJS (Embedded JavaScript) como motor de plantillas para renderizar páginas HTML dinámicas.

// Montar el enrutador:
App.use('/', indexRouter); // Monta la instancia del enrutador importada de './routes/index.routes.js' en la ruta raíz (`/`). Esto significa que todas las solicitudes a su aplicación serán manejadas por las rutas definidas en ese archivo.

// Iniciar el servidor:
App.listen(App.get('port'), () => {
  console.log("Hola mundo", App.get('port')); // Imprime un mensaje indicando que el servidor está escuchando en el puerto especificado.
});