FROM node:20.19-bookworm

RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

# Build args for Railway environment variables
ARG RAILWAY_DOCKERFILE_PATH
ARG WHATSAPP_NUMBER
ARG CONTACT_EMAIL
ARG NUXT_PUBLIC_SITE_URL
ARG NUXT_PUBLIC_SITE_NAME

# Expose as environment variables
ENV RAILWAY_DOCKERFILE_PATH=$RAILWAY_DOCKERFILE_PATH
ENV WHATSAPP_NUMBER=$WHATSAPP_NUMBER
ENV CONTACT_EMAIL=$CONTACT_EMAIL
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_SITE_NAME=$NUXT_PUBLIC_SITE_NAME

# Set working directory
WORKDIR /app

# Copy package files and workspace configuration
COPY package.json pnpm-lock.yaml .npmrc tsconfig.json nuxt.config.ts .gitignore ./

# Copy the main app directory
COPY app ./app
COPY shared ./shared  
COPY theme ./theme
COPY wip-layers ./wip-layers

# Copy other workspace directories 11111if they exist
COPY public ./public
COPY server ./server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Remove dev dependencies
RUN pnpm prune --production

# Set the working directory to the Nuxt output
WORKDIR /app/.output

# Expose the port
EXPOSE 3000

# Start the Nitro server
CMD ["node", "server/index.mjs"]