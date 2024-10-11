# Proveedor-crud - Backend con Docker

>[!IMPORTANT]
>Este proyecto está pensado para facilitar el desarrollo y las pruebas locales con Docker. No necesitas instalar dependencias en tu máquina local, ya que Docker se encarga de todo el entorno de ejecución. Asegúrate de tener instalado docker y docker compose y que los puertos 5000 y 27017 estén libres en tu sistema antes de ejecutar el proyecto con Docker Compose.

## Requisitos

Para ejecutar este proyecto localmente, necesitas tener instalado Docker y Docker Compose en tu sistema. Si no los tienes, puedes instalarlos siguiendo las instrucciones a continuación:

- **Docker:** [Instrucciones de instalación](https://docs.docker.com/get-docker/)
- **Docker Compose:** [Instrucciones de instalación](https://docs.docker.com/compose/install/)


## Instrucciones de instalación y ejecución del proyecto

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-repositorio/proveedor-api.git
   cd povider-crud



>[!IMPORTANT]
>En la raiz del proyecto se encuentra la coleccion de peticiones usadas en *Postman* para testear, se facilitan para que se importen y los puedan testear facilmente
Ejecuta el proyecto utilizando Docker Compose:

bash
Copiar código
```
docker-compose up --build
```
Este comando se encargará de construir la imagen de Docker y levantar tanto el backend como la base de datos MongoDB. El backend estará disponible en el puerto 5000 y la base de datos MongoDB en el puerto 27017.

Una vez que Docker Compose termine de levantar los servicios, deberías ver el mensaje Connected to MongoDb en la consola, lo cual indica que la aplicación está lista para ser utilizada.
>[!IMPORTANT]
>Para el proyecto se debe configurar la variable de entorno  *JWT_SECRET* en el archivo .env y ademas se debe descomentar la linea 9 en el archivo **src/routes/api.ts** y comentar linea 8, para asi validar con la misma llave publica, soy conciente que el subir el archivo .env es una mala practica, pero al ser todo esto de forma aislada no hay inconveniente.

# Endpoints
A continuación se describen los endpoints disponibles para gestionar proveedores y consumir la API externa.

## Obtener todos los proveedores
### Endpoint: **GET**```http://localhost:5000/api/provider```
Descripción: Devuelve una lista con todos los proveedores.
Obtener un proveedor por ID
### Resultado esperado
Cuando se crea la imagen de docker con el proyecto este por defecto crea 3 proveedores para tener como base para testear, al hacer esta peticion se reciben los 3 provedores que han sido creados previamente, con sus respectivos valores
![image](https://github.com/user-attachments/assets/0792d78f-3461-4fd4-b1a7-b35c9ec5e5bd)
![image](https://github.com/user-attachments/assets/9e566497-2860-4f73-a7b6-602ddc4f5372)




## Crear proveedor
### Endpoint: **POST** ```http://localhost:5000/api/provider```
Descripción: Crea un nuevo proveedor en la base de datos.

>[!NOTE]
> En el archivo **providerTestPOST.ts** en la raiz del proyecto se encuentran ejemplos de proveedores que pueden ser usados para testear
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
### Resultado esperado
Primero cargamos los datos del provedor a crear para posteriormente enviar la informacion
![image](https://github.com/user-attachments/assets/1fdc90ac-a41c-4646-b2f1-c75bb79df061)
En esta peticion la respuesta que tenemos es la informacion que hemos enviado previamiente, esto nos confirma que el proveedor ha sido creado, para verificarlo de otra forma podemos volver al Endpoint anterior y ver que el listado aumento de 3 a 4.
![image](https://github.com/user-attachments/assets/6338a327-8916-4fb2-9ef5-6e5903fca776)





## Obtener informacion de un proveedor
### Endpoint: **GET** ```http://localhost:5000/api/provider/:id```
Descripción: Devuelve los datos de un proveedor específico según su ID.
### Resultado esperado
Para verificar esta peticion lo que hacemos es seleccionar el _id que aparece en el Body de la respuesta dada a la peticion POST anterior.
![image](https://github.com/user-attachments/assets/3b6399ab-2ec7-45f8-aecf-13fdea0f8e26)
Que sera remplazada en la ruta a donde haremos la peticion y posteriormente enviar la peticion
![image](https://github.com/user-attachments/assets/075253c6-1f38-4a91-a0ab-b0003ef956fd)
Esto nos traera la informacion del proveedor respectiva al _id que proporcionamos en la peticion
![image](https://github.com/user-attachments/assets/91a3947c-cacf-418b-b91c-195dcb1b3fe0)



## Actualizar proveedor
### Endpoint: **PUT** ```http://localhost:5000/api/provider/:id```
Descripción: Actualiza la información de un proveedor según su ID.
>[!NOTE]
> En el archivo **providerTestPUT.ts** en la raiz del proyecto se encuentran ejemplos de modificaciones de proveedores que pueden ser usados para testear

Cuerpo de la petición (JSON):

json
Copiar código
```
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "bankDetails": {
    "bank": "Bank ABC",
    "accountType": "Checking"
  }
}
```
### Resultado esperado
Similar a la peticion anterior necesitamos el _id del proveedor para poder modificarlo, asi que agregamos el id en la ruta de la peticion y agregamos los elementos que queremos modificar
![image](https://github.com/user-attachments/assets/5dfab79d-8cdb-494d-b3e5-89b2872f1d70)
Una vez enviamos la peticion la respuesta que tenemos es un objeto con la informacion actualizada
![image](https://github.com/user-attachments/assets/5865b2fc-941a-474a-934a-d6c4de15eaab)


## Eliminar proveedor
### Endpoint: **DELETE** ```http://localhost:5000/api/provider/:id```
Descripción: Elimina un proveedor de la base de datos según su ID.
### Resultado esperado
Similar a la peticion anterior necesitamos el _id del proveedor para asi poder eliminarlo, podemos seleccionar el proveedor que queremos eliminar usando la peticion GET provider la cual nos trae todos los proveedores
![image](https://github.com/user-attachments/assets/a73d658c-8c38-4d67-8e30-00dcb42472e3)
seleccionamos el _id del proveedor que queremos eliminar y accedemos a la peticion DELETE y cambiamos el id que hay por el que queremos eliminar 
![image](https://github.com/user-attachments/assets/9fa99693-44b8-4fbc-8108-99cbf3cb4d27)
una vez ha sido eliminado la respuesta que recibiremos es un mensaje el cual nos indica que el proveedor ha sido eliminado exitosamente
![image](https://github.com/user-attachments/assets/fe557bd7-37d7-42db-a107-5ceaf88a8cde)

## Validar proveedor
### Endpoint: **PUT** ```http://localhost:5000/api/provider/:id/validate```
Descripción: Valida un proveedor según su ID esto solo lo podran realizar usuarios administradores.
### Resultado esperado
Para esta peticion necesitaremos el _id del provedor el cual queremos validar, agregando el contenido del body donde cambia el estatus a aprobado
![image](https://github.com/user-attachments/assets/0975e6bf-aa37-4eaa-860d-096de87a0423)
y la respuesta que tenemos es el proveedor con su estatus aprobado
![image](https://github.com/user-attachments/assets/174f0201-4235-42a2-9986-6c170e168b86)




# API externa
>[!WARNING]
> Para la validacion completa del token se necesita la llave publica JWT con la que se creo para asi poder verificarla, para esto hay descomentar la linea 9 en la siguiente ruta **src/routes/api.ts** y comentar linea 8 en el código y asegurarse de tener configurada la variable de entorno *JWT_SECRET* en el archivo .env

Código que hay que descomentar
```// router.get('/projects', authenticateJWT, consumeAPIProjects);```

## Variables de entorno
Este proyecto utiliza las siguientes variables de entorno, que puedes configurar en un archivo .env en la raíz del proyecto:
```
MONGO_URI: URL de la base de datos MongoDB.
JWT_SECRET: Clave secreta para la autenticación con JWT.
```
## Obtener token JWT
### Endpoint: **POST** ``http://localhost:5000/api/login``
Descripción: Obtiene un token JWT para autenticarse con la API externa.

Cuerpo de la petición (JSON):

json
Copiar código
```
{
  "username": "default",
  "password": "default"
}
```
### Resultado esperado
Una vez ingresado el usuairo y contraseña enviamos la peticion y recibimos un access token
![image](https://github.com/user-attachments/assets/8879ef5e-1ba6-4f9d-906f-5fc8adc343bd)

## Consumir proyectos de la API externa
### Endpoint: **GET** ``http://localhost:5000/api/projects``
Descripción: Devuelve una lista de proyectos desde la API externa.
Resultado esperado, una vez recibimos el access token podemos pasar a esta peticion donde ya esta configurada la variable global la cual tiene este token donde al hacer la solicitud tenemos toda la informacion 
![image](https://github.com/user-attachments/assets/8f665e07-c72c-4883-a495-16e8fbcd8afc)



# Uso de Postman para pruebas
Puedes usar Postman para probar los endpoints. Solo necesitas configurar las peticiones con los métodos GET, POST, PUT, y DELETE, según lo descrito anteriormente.

Variables globales en Postman
Para manejar el token JWT de forma automática en Postman, puedes crear una Variable Global para almacenar el token que obtienes en la respuesta de la ruta /login. De esta forma, podrás usar el token en las peticiones que requieran autenticación.

Ejemplo de script para Postman (guardar token JWT):
Ve a la pestaña Tests de la petición POST /login.

Añade el siguiente script para guardar el token en una variable global:

Copiar código
```
// Verificamos si la respuesta tiene éxito 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Extraemos el token de la respuesta JSON
let jsonData = pm.response.json();
let token = jsonData.token; 

// Guardamos el token como una variable global en Postman
pm.globals.set("authToken", token);

// Verificamos que la variable global fue establecida correctamente
pm.test("Token guardado correctamente como variable global", function () {
    pm.expect(pm.globals.get("authToken")).to.eql(token);
});
```

bash
Copiar código
key: 'Authorization', value: 'Bearer {{authToken}}'




