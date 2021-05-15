# sopecify a base image

FROM node:16-alpine3.11
WORKDIR /app

# install some dependencies

COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default Command

CMD ["npm", "start"]
