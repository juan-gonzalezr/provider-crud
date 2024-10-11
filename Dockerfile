# Usa una imagen base de Node.js
FROM node:20

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el contenido del proyecto
COPY . .

# Expone el puerto 5000
EXPOSE 5000

# Usa ts-node para ejecutar el archivo principal TypeScript
CMD ["sh", "-c", "npx ts-node src/scripts/seedProviders.ts && npx ts-node src/server.ts"]
