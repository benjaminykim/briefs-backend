# briefs.link backend rest api

briefs.link is a url shortener

# Setting Up
- Clone the repository and install Docker Engine and Docker Compose
- Create a `.env` file with your chosen environment variable values (.env.example as template)
- [PROD] place your tls certificates in the `data/cert` directory, named as `cloudflare.crt` and `cloudflare.key` for public/private keys
- Use the `./deploy.sh` script in order to build and deploy different modes
  - run `./deploy.sh` to see the script's usage

# Deployment

The backend is containerized with Docker and utilizes the `./deploy.sh` shell script with Docker Compose in order to
build and run the application.

```
sh ./deploy.sh dev      # for local deployment
sh ./deploy.sh prod     # for production  deployment
sh ./deploy.sh dev -f   # for local deployment with logs
sh ./deploy.sh refresh  # to clear all Docker volumes, images and containers
```

## Configuration

The backend is hosted on an AWS EC2 instance, behind Cloudflare. Security groups are configured for ports 80 and 443 (http and https).

NGINX serves HTTPS requests to the docker container for the backend api.

## Database Migration

In both dev and prod mode, user must exec a shell command within the running Docker container for the backend api and execute database migrations.

```
sh ./deploy.sh shell
cd src
npx sequelize-cli db:migrate
```

Be sure to install packages at the source code level of the directory structure (where the package.json file is)

## Package Management

In both dev and prod mode, user must exec a shell command within the running Docker container for the backend api and install dependencies.

`sh ./deploy.sh shell`
`npm install {package_name}`

Be sure to install packages at the source code level of the directory structure (where the package.json file is)
