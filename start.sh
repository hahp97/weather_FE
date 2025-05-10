#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Weather Application Setup...${NC}"

# Check if .env.local file exists, create if it doesn't
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}Creating .env.local file...${NC}"
  echo "VITE_OPENWEATHER_API_KEY=3e80b4c57b3efeef93a82f6f06d4f1df" > .env.local
  echo "VITE_BASE_URL=https://api.openweathermap.org/data/2.5" >> .env.local
  echo -e "${GREEN}Environment file created!${NC}"
else
  echo -e "${GREEN}Environment file already exists.${NC}"
fi

# Remove problematic tsconfig file
if [ -f tsconfig.app.json ]; then
  echo -e "${YELLOW}Removing problematic TypeScript config file...${NC}"
  rm tsconfig.app.json
fi

# Make sure we are using the latest packages
echo -e "${GREEN}Installing dependencies...${NC}"
yarn install

# Run development server
echo -e "${GREEN}Starting development server...${NC}"
echo -e "${YELLOW}You can access the application at http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
yarn dev 