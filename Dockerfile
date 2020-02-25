FROM node:8.15.0-jessie as build-deps
ARG REACT_APP_OCTOPUS_WEB_SENTRY_DSN
ENV REACT_APP_OCTOPUS_WEB_SENTRY_DSN=$REACT_APP_OCTOPUS_WEB_SENTRY_DSN
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.13.3-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]