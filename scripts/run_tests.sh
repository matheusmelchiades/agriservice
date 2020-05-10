#!/bin/bash

log_service_name()
{
  SERVICE_NAME=$1
  SERVICE_FUNC=$2

  echo ""
  echo "################################################"
  echo "### Service $SERVICE_NAME testing $SERVICE_FUNC"
  echo "################################################"
  echo ""
}

docker-compose up --build -d species trees groves harvests

log_service_name Species starting...
docker exec -it species yarn test

log_service_name Trees starting...
docker exec -it trees yarn test

log_service_name Groves starting...
docker exec -it groves yarn test

log_service_name Harvests starting...
docker exec -it harvests yarn test

docker-compose stop species trees groves harvests