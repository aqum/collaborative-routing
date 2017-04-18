## Tech
- frontend: React + Typescript, Redux, Leaflet, webpack
- backend: Elixir, Phoenix

## Development setup
- get to know Docker and docker-compose tool
- create `api.env` file and fill environment variables as in `docker.compose.yml`
- create `client/config/local.config.ts` file and fill necessary properties
- build containers `docker-compose build`
- install backend deps `docker-compose run --rm api mix deps.get`
- create database `docker-compose run --rm api mix ecto.create`
- run migrations `docker-compose run --rm api mix ecto.migrate`
- install frontend deps `docker-compose run --rm client npm install`
- start services using `docker-compose up`
- you're set - api is on `localhost:3000`, frontend client `3000`, db `5432`
- in development environment there is watch mode enabled for both frontend and backend - no need to manually restart anything

## Developing with Docker containers
### Running commands
`docker-compose run --rm CONTAINER_NAME COMMAND`

## Production setup
- set envrionment variables in `api.env` and `db.env`
- build containers `docker-compose -f ./production.yml build`
- create database `docker-compose -f ./production.yml run --rm prod_api mix ecto.create`
- run migrations `docker-compose -f ./production.yml run --rm prod_api mix ecto.migrate`
- start services `docker-compose -f ./production.yml up -d prod_db prod_api prod_static prod_nginx`

### Build frontend
- create `client/config/local.config.ts` file and fill necessary properties
- install deps `docker-compose run --rm client npm install`
- build `docker-compose run --rm client npm run build`
