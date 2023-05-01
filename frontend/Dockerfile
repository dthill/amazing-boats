FROM cypress/browsers:node16.17.1-chrome105-ff104-edge as builder

ARG PORT=80
ENV PORT ${PORT}

WORKDIR /workspace

COPY . .

RUN npm ci
RUN cd /workspace && \
    ## npm run test:ci && \
    npm run build

FROM caddy:2.6.2

WORKDIR /usr/share/caddy

RUN rm -rf /usr/share/caddy/**

COPY --from=builder /workspace/dist/amazing-boat-frontend /usr/share/caddy

COPY --from=builder /workspace/Caddyfile /etc/caddy/Caddyfile

EXPOSE ${PORT}

