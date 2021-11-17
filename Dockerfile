FROM node:14-alpine3.11

RUN apk --no-cache add --virtual builds-deps build-base python

ARG NEW_RELIC_NO_CONFIG_FILE=true

# Create work directory
WORKDIR /usr/src/app

# package
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install app dependencies
RUN npm install --pure-lockfile

# Build and run the app
CMD npm run dev
