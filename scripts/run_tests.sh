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

docker-compose up --build -d species

log_service_name Species starting...
docker exec -it species yarn test

docker-compose stop species