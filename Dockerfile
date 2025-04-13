# Etapa 1: Build
FROM node:20 AS builder

# Crear y usar directorio de trabajo
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Servidor para archivos estáticos (nginx)
FROM nginx:alpine

# Remover configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos compilados desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar archivo de configuración opcional (si tienes uno)
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto por defecto de nginx
EXPOSE 8080

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
