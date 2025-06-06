FROM node:20-alpine as build

WORKDIR /app

# Install yarn
RUN npm install -g yarn

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Set environment variables from build args (without default values)
ARG VITE_OPENWEATHER_API_KEY
ENV VITE_OPENWEATHER_API_KEY=${VITE_OPENWEATHER_API_KEY}
ENV VITE_BASE_URL=https://api.openweathermap.org/data/2.5

# Remove problematic tsconfig
RUN rm -f tsconfig.app.json

# Build the app
RUN yarn build

# Runtime stage
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]