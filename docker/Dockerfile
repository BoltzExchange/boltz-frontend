FROM node:lts-alpine AS builder
# Install general dependencies
RUN apk update && apk add \
		g++ \
		gcc \
		libc6-compat \
		make \
		pkgconfig \
		rsync \
		python \
		--no-cache git \
	&& rm -rf /var/lib/apt/lists/*

# Clone boltz-middleware
WORKDIR /app
RUN git clone https://github.com/BoltzExchange/boltz-frontend
WORKDIR /app/boltz-frontend
RUN npm install --quiet
RUN npm run build

FROM node:lts-alpine
RUN apk update && apk add rsync
# Copy boltz-frontend from builder image
WORKDIR /app
COPY --from=builder /app/boltz-frontend/build .

RUN npm install -g serve

# Expose RPC port
EXPOSE 3000

ENTRYPOINT ["serve", "-p", "3000", "-s", "."]
