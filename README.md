# Proveedor-crud - Backend con Docker

Este proyecto consiste en un backend construido con Node.js, Express y MongoDB, el cual permite gestionar proveedores. Además, incluye el uso de Docker para facilitar la configuración y la ejecución del proyecto, sin necesidad de instalar dependencias localmente.

## Requisitos

Para ejecutar este proyecto localmente, necesitas tener instalado Docker en tu sistema. Si no tienes Docker, puedes instalarlo siguiendo las instrucciones [aquí](https://docs.docker.com/get-docker/).


## Instrucciones de instalación y ejecución

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-repositorio/proveedor-api.git
   cd povider-crud

>[!IMPORTANT]
>Para el proyecto se debe configurar la variable de entorno  *JWT_SECRET* en el archivo .env y ademas se debe descomentar la linea 9 en el archivo src/routes/api.ts y comentar linea 8, para asi validar con la misma llave publica 

Ejecuta el proyecto utilizando Docker Compose:

bash
Copiar código
```
docker-compose up --build
```
Este comando se encargará de construir la imagen de Docker y levantar tanto el backend como la base de datos MongoDB. El backend estará disponible en el puerto 5000 y la base de datos MongoDB en el puerto 27017.

Una vez que Docker Compose termine de levantar los servicios, deberías ver el mensaje Connected to MongoDb en la consola, lo cual indica que la aplicación está lista para ser utilizada.

Endpoints
A continuación se describen los endpoints disponibles para gestionar proveedores y consumir la API externa.

Proveedores
Crear proveedor

Endpoint: POST /provider

Descripción: Crea un nuevo proveedor en la base de datos.

Cuerpo de la petición (JSON):

json
Copiar código
```
{
  "nit": "123456789",
  "firstName": "John",
  "lastName": "Doe",
  "idNumber": "987654321",
  "providerType": "National",
  "personType": "Natural",
  "beneficiaries": [
    {
      "name": "Jane Smith",
      "idNumber": "123123123"
    }
  ],
  "bankDetails": {
    "bank": "Bank XYZ",
    "accountNumber": "000111222",
    "accountType": "Savings"
  }
}
```
Obtener todos los proveedores

Endpoint: GET /provider
Descripción: Devuelve una lista con todos los proveedores.
Obtener un proveedor por ID

Endpoint: GET /provider/:id
Descripción: Devuelve los datos de un proveedor específico según su ID.
Actualizar proveedor

Endpoint: PUT /provider/:id

Descripción: Actualiza la información de un proveedor según su ID.

Cuerpo de la petición (JSON):

json
Copiar código
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "bankDetails": {
    "bank": "Bank ABC",
    "accountType": "Checking"
  }
}
Eliminar proveedor

Endpoint: DELETE /provider/:id
Descripción: Elimina un proveedor de la base de datos según su ID.
Validar proveedor

Endpoint: PUT /provider/:id/validate
Descripción: Valida un proveedor según su ID.
API externa
Obtener token JWT

Endpoint: POST /login

Descripción: Obtiene un token JWT para autenticarse con la API externa.

Cuerpo de la petición (JSON):

json
Copiar código
{
  "username": "example",
  "password": "password123"
}
Consumir proyectos de la API externa

Endpoint: GET /projects

Descripción: Devuelve una lista de proyectos desde la API externa.

Nota: Para la autenticación completa, descomentar la siguiente ruta en el código y asegurarse de tener configurada la variable de entorno JWT_SECRET:

js
Copiar código
// router.get('/projects', authenticateJWT, consumeAPIProjects);
Uso de Postman para pruebas
Puedes usar Postman para probar los endpoints. Solo necesitas configurar las peticiones con los métodos GET, POST, PUT, y DELETE, según lo descrito anteriormente.

Variables globales en Postman
Para manejar el token JWT de forma automática en Postman, puedes crear una Variable Global para almacenar el token que obtienes en la respuesta de la ruta /login. De esta forma, podrás usar el token en las peticiones que requieran autenticación.

Ejemplo de script para Postman (guardar token JWT):
Ve a la pestaña Tests de la petición POST /login.

Añade el siguiente script para guardar el token en una variable global:

js
Copiar código
var jsonData = pm.response.json();
pm.globals.set("jwtToken", jsonData.token);
Luego, usa {{jwtToken}} en el encabezado de las peticiones que requieren el token JWT:

bash
Copiar código
Authorization: Bearer {{jwtToken}}
Variables de entorno
Este proyecto utiliza las siguientes variables de entorno, que puedes configurar en un archivo .env en la raíz del proyecto:

MONGO_URI: URL de la base de datos MongoDB.
JWT_SECRET: Clave secreta para la autenticación con JWT.
Notas adicionales
Este proyecto está pensado para facilitar el desarrollo y las pruebas locales con Docker. No necesitas instalar dependencias en tu máquina local, ya que Docker se encarga de todo el entorno de ejecución.
Asegúrate de que los puertos 5000 y 27017 estén libres en tu sistema antes de ejecutar el proyecto con Docker Compose.
