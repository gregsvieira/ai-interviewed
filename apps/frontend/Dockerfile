# ============================================
# FRONTEND - React + Vite
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copiar package files
COPY apps/frontend/package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY apps/frontend/ ./

# Build
RUN npm run build

# Runtime
FROM nginx:alpine

# Copiar build do Vite
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
