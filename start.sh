#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

MODE=${1:-dev}  # Default to dev mode if no argument provided

echo -e "${GREEN}Starting Weather Application in ${YELLOW}${MODE}${GREEN} mode...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found!${NC}"
  echo -e "${YELLOW}Please create a .env file with your OpenWeather API key:${NC}"
  echo -e "${YELLOW}OPENWEATHER_API_KEY=your_api_key_here${NC}"
  exit 1
fi

# Source the .env file to load environment variables
source .env

# Check if the API key is set
if [ -z "$OPENWEATHER_API_KEY" ]; then
  echo -e "${RED}Error: OPENWEATHER_API_KEY is not set in .env file!${NC}"
  exit 1
fi

echo -e "${GREEN}Using Docker Compose to start the application...${NC}"

if [ "$MODE" == "prod" ]; then
  echo -e "${GREEN}Starting production environment...${NC}"
  docker-compose up --build app
elif [ "$MODE" == "dev" ]; then
  echo -e "${GREEN}Starting development environment...${NC}"
  docker-compose up --build dev
else
  echo -e "${RED}Invalid mode: ${MODE}${NC}"
  echo -e "${YELLOW}Valid options are: dev, prod${NC}"
  exit 1
fi