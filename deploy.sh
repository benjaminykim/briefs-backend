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
elif [ $ARG = "prod" ]
then
    echo "Deploying Production...";
    sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml down;
    sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml up -d;
    if [ -z $ARG_2 ]
    then
        echo "Finished";
    elif [ $ARG_2 = "-f" ]
    then
        sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml logs -f;
    fi
elif [ $ARG = "dev" ]
then
    echo "Deploying Development...";
    sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml down;
    sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml up -d;
    if [ -z $ARG_2 ]
    then
        echo "Finished";
    elif [ $ARG_2 = "-f" ]
    then
        sudo docker-compose -f docker-compose.yml -f docker-compose/docker-compose.$ARG.yml logs -f;
    fi
elif [ $ARG = "cert" ]
then
    echo "Configuring Security Certificates...";
    sudo ./init-letsencrypt.sh
elif [ $ARG = "logs" ]
then
    echo "Running Logs...";
    if [ -z $ARG_2 ]
    then
        echo "logs options | prod | dev |"
    elif [ $ARG_2 = "prod" ]
    then
        sudo docker-compose -f docker-compose.prod.yml logs -f;
    elif [ $ARG_2 = "dev" ]
    then
        sudo docker-compose -f docker-compose.dev.yml logs -f;
    fi
else
    echo -e $USAGE;
fi

