#!/bin/bash

set -e  # exit on error

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

COMPOSE_FILE="docker-compose.yml"
SKIP_CONFIRM=false

# parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -y|--yes) SKIP_CONFIRM=true ;;
        *) echo -e "${RED}Unknown parameter: $1${NC}"; exit 1 ;;
    esac
    shift
done

# confirmation prompt
if [[ "$SKIP_CONFIRM" = false ]]; then
    echo -e "${YELLOW}Are you sure you want to take down, build and redeploy? [y/N]${NC} "
    read confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Operation cancelled.${NC}"
        exit 0
    fi
fi

echo -e "${GREEN}Building containers...${NC}"
if ! docker-compose -f "$COMPOSE_FILE" build; then
    echo -e "${RED}Error: Build failed. Deployment cancelled.${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful! Proceeding with deployment...${NC}"

echo -e "${GREEN}Stopping containers...${NC}"
docker-compose -f "$COMPOSE_FILE" down

echo -e "${GREEN}Starting containers...${NC}"
docker-compose -f "$COMPOSE_FILE" up -d

echo -e "${GREEN}Deployment complete!${NC}"