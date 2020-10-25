#!/bin/bash
USAGE=\
"USAGE:\n\n"\
"\tdev:\t\tstart backend server w/ containerized db.\n\t\t\t-f to display logs\n"\
"\tprod:\t\tstart backend server w/ containerized db, nginx, tls.\n\t\t\t-f to display logs\n"\
"\tlogs:\t\tstart logging. Requires second param [ 'prod' | 'dev' ]\n"\
"\trefresh:\tclears all Docker volumes, images, and containers\n"\
"\tshell:\t\texecutes SH as run command for the api container\n"\
"\tdb:\t\texecutes postgres for the db container\n"

ARG=$1
ARG_2=$2

if [ -z $ARG ]
then
    echo -e $USAGE;
    exit 0;
elif [ $ARG = "help" ]
then
    echo -e $USAGE;
elif [ $ARG = "dev" -o $ARG = "prod" ]
then
    echo "Deploying ${ARG}...";
    docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml down;
    docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml up -d;
    if [ -z $ARG_2 ]
    then
        echo "Finished";
    elif [ $ARG_2 = "-f" ]
    then
        docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml logs -f;
    fi
    exit 0;
elif [ $ARG = "logs" ]
then
    echo "Running Logs...";
    if [ -z $ARG_2 ]
    then
        echo "logs options | prod | dev |"
    else
        sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG_2.yml logs -f;
    fi
    exit 0;
elif [ $ARG = "refresh" ]
then
    echo "Clearing Docker builds";
    docker stop $(docker ps -aq);
    docker rm $(docker ps -aq);
    docker rmi $(docker images -q);
    docker system prune --all --force --volumes;
elif [ $ARG = "shell" ]
then
    docker exec -it briefs-backend_api_1 sh;
elif [ $ARG = "db" ]
then
    docker exec -it briefs-backend_db_1 psql -U username -h 127.0.0.1 -p 5432 db_name;
else
    echo -e $USAGE;
fi

