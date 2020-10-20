#!/bin/bash
USAGE=\
"USAGE:\n\n"\
"\tdev:\t\tstart backend server w/ containerized database\n"\
"\tprod:\t\tstart backend server w/ containerized database, nginx, tls\n"\
"\tcert:\t\tgenerate https certificates\n"\
"\tlogs:\t\tstart logging\n"

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
    echo "Deploying Development...";
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
else
    echo -e $USAGE;
fi

