# build stage
# 拉取最小体积的node环境容器, 并安装cnpm (加快容器构建速度,npm比较慢)
FROM node:lts-alpine as build-stage
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# 进入容器的app目录, 然后拷贝当前目录(根目录)的所有文件到容器的当前目录中(/app)
WORKDIR /app
COPY package*.json ./
RUN cnpm install
COPY . .


#在容器内build
RUN cnpm run build


# production stage
# 最后通过nginx部署build出来的文件(/dist)
FROM nginx:stable-alpine as production-stage
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
