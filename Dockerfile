FROM node:9.11.1-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0

RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build


FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
