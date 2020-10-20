FROM node:12.16.1-alpine
WORKDIR /app
COPY ./app/package.* .
COPY ./app/.babelrc .
RUN npm install
COPY ./app app
ENTRYPOINT [ "npm", "start" ]
