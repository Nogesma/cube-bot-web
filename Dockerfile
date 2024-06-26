FROM node:20-alpine AS builder

ARG VITE_CLIENT_ID
ARG VITE_REDIRECT_URI
ARG VITE_BACKEND_URI

ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI
ENV VITE_BACKEND_URI=$VITE_BACKEND_URI

ENV NODE_ENV production

WORKDIR /build/

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn .yarn

RUN yarn install --immutable

COPY index.html \
    svelte.config.js \
    postcss.config.cjs \
    tailwind.config.cjs \
    tsconfig.json \
    tsconfig.node.json \
    vite.config.ts \
    ./

COPY src src
COPY public public

RUN yarn run build


FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /build/dist /srv
