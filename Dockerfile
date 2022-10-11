
FROM node:16

# # Installing libvips-dev for sharp Compatibility
# RUN apt-get update && apt-get install build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && yarn install

WORKDIR /opt/app

COPY ./ .

RUN yarn build

EXPOSE 1337
# EXPOSE 80/tcp

# RUN echo ' \
#   proxy_pass http://localhost:1337; \
#   proxy_http_version 1.1; \
#   proxy_set_header Upgrade $http_upgrade; \
#   proxy_set_header Connection 'upgrade'; \
#   proxy_set_header Host $host; \
#   proxy_cache_bypass $http_upgrade; \
#   ' > /etc/nginx/sites-available/default

# RUN systemctl restart nginx

CMD ["yarn", "start"]
