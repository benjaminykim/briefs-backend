# briefs.link backend rest api

briefs.link is a url shortener

# Deployment

The backend is containerized with Docker and utilizes the `./deploy.sh` shell script with Docker Compose in order to
build and run the application.

For a local build run:
`./deploy.sh dev`

For production, run:
`./deploy.sh prod`

Use the `-f` flag to follow logs:
`./deploy.sh dev -f`

To delete all Docker volumes, images, and containers for system prune, run:
`./deploy refresh`

Note that the production build will containerize the API, database and NGINX web server. Since we are using Cloudflare for DDOS protection and as a reverse proxy, we must manually store keys in the `data/cert` directory with `cloudflare.crt` and `cloudflare.key` inside.

Both dev and prod deployment require a `.env` file. Use the `.env.example` file as a template for your environment variables.

## Configuration

The backend is hosted on an AWS EC2 instance, behind Cloudflare. Security groups are configured for ports 80 and 443 (http and https).

NGINX serves HTTPS requests to the docker container for the backend api.

## Database Migration

In both dev and prod mode, user must exec a shell command within the running Docker container for the backend api and execute database migrations.

`docker exec -it briefs-backend_api_1 sh`
`cd src`
`npx sequelize-cli db:migrate`

Be sure to install packages at the source code level of the directory structure (where the package.json file is)

## Package Management

In both dev and prod mode, user must exec a shell command within the running Docker container for the backend api and install dependencies.

`docker exec -it briefs-backend_api_1 sh`
`npm install {package_name}`

Be sure to install packages at the source code level of the directory structure (where the package.json file is)
