# Weather Application

A modern weather application built with React, TypeScript, and the OpenWeather API.

## Features

- Current weather summary
- 5-day weather forecast (in 3-hour intervals)
- Search functionality with history
- Responsive design

## Technologies Used

- React with TypeScript
- Vite for fast builds
- TailwindCSS for styling
- Zustand for state management
- React Hook Form + Zod for form validation
- TanStack Query for data fetching
- Axios with custom interceptors
- Day.js for date manipulation
- React Router for routing
- Dotenv for environment variables management
- Lodash for utility functions
- Yarn for package management

## Quick Start

The easiest way to get started is to use our provided script:

```bash
# Make the script executable
chmod +x start.sh

# Run the script
./start.sh
```

The script will:

1. Create necessary environment variables
2. Fix any TypeScript configuration issues
3. Install dependencies
4. Start the development server

## Environment Variables

The application uses environment variables for configuration. The quick start script will create a `.env.local` file with the following variables:

```
VITE_OPENWEATHER_API_KEY=3e80b4c57b3efeef93a82f6f06d4f1df
VITE_BASE_URL=https://api.openweathermap.org/data/2.5
```

You can replace the API key with your own from the [OpenWeather website](https://openweathermap.org/api).

## Docker Setup

You can also run the application using Docker:

### Production Mode

```bash
# Build and start the production container
docker-compose up app
```

This will run the app on port 8080: http://localhost:8080

### Development Mode

```bash
# Build and start the development container with hot reloading
docker-compose up dev
```

This will run the development server on port 5173: http://localhost:5173

## Manual Setup

If you prefer to set up the project manually:

1. Clone the repository
2. Create a `.env.local` file with environment variables
3. Remove `tsconfig.app.json` if it exists
4. Install dependencies:
   ```
   yarn
   ```
5. Start the development server:
   ```
   yarn dev
   ```

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn preview` - Preview the production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with automatic fixes
- `yarn clean` - Clean node_modules and reinstall dependencies
- `yarn start` - Alias for yarn dev

## Build

To build the application for production:

```
yarn build
```

The built files will be in the `dist` directory.

## Preview

To preview the production build:

```
yarn preview
```
