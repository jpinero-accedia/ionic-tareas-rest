# ------- base -------
FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

# ------- deps -------
FROM base as deps

COPY ./app/package.json ./app/yarn.lock* ./app/.yarnrc.yml ./

# quitar la telemetria
ENV YARN_ENABLE_TELEMETRY=0

RUN yarn install

# ------- dev -------
FROM deps AS dev

COPY ./app/src ./src

EXPOSE 3000

CMD ["yarn", "start"]
