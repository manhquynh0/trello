FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 
COPY . .
RUN yarn run build

# Nginx
FROM nginx:alpine
#  Copy file cấu hình Nginx tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy thư mục build từ stage 1 vào thư mục phục vụ của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose cổng 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]