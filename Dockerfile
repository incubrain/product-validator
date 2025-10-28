# {FRICTION}: this will probably have to be deleted by most template users, can it be extracted?
FROM node:20.19-bookworm

RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

# Build args for Railway environment variables
ARG RAILWAY_DOCKERFILE_PATH
ARG NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_WEBSITE_ID
ARG NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_SCRIPT_INPUT_SRC
ARG NUXT_PUBLIC_CONFIG_SOURCE
ARG NUXT_PUBLIC_VALIDATION_STAGE
ARG NUXT_STORAGE_PROVIDER
ARG NUXT_STORAGE_URL
ARG NUXT_STORAGE_SECRET
ARG PORT=3000

# Expose as environment variables
ENV RAILWAY_DOCKERFILE_PATH=$RAILWAY_DOCKERFILE_PATH
ENV NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_WEBSITE_ID=$NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_WEBSITE_ID
ENV NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_SCRIPT_INPUT_SRC=$NUXT_PUBLIC_SCRIPTS_UMAMI_ANALYTICS_SCRIPT_INPUT_SRC
ENV NUXT_PUBLIC_CONFIG_SOURCE=$NUXT_PUBLIC_CONFIG_SOURCE
ENV NUXT_PUBLIC_VALIDATION_STAGE=$NUXT_PUBLIC_VALIDATION_STAGE
ENV NUXT_STORAGE_PROVIDER=$NUXT_STORAGE_PROVIDER
ENV NUXT_STORAGE_URL=$NUXT_STORAGE_URL
ENV NUXT_STORAGE_SECRET=$NUXT_STORAGE_SECRET
ENV PORT=$PORT


# Set working directory
WORKDIR /app

# Copy package files and workspace configuration
COPY package.json pnpm-lock.yaml .npmrc tsconfig.json nuxt.config.ts content.config.ts .gitignore ./

# Copy the main app directory
COPY app ./app
COPY shared ./shared  
COPY theme ./theme
COPY content ./content
COPY modules ./modules


# Copy other workspace directories
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
EXPOSE $PORT

# Start the Nitro server
CMD ["node", "server/index.mjs"]