#!/bin/bash

echo "Setting up the project..."

# Ensure we have the latest packages
echo "Installing dependencies with yarn..."
yarn install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  echo "VITE_OPENWEATHER_API_KEY=3e80b4c57b3efeef93a82f6f06d4f1df" > .env.local
  echo "VITE_BASE_URL=https://api.openweathermap.org/data/2.5" >> .env.local
  echo "Environment file created!"
else
  echo "Environment file already exists."
fi

# Remove potentially problematic tsconfig.app.json
if [ -f tsconfig.app.json ]; then
  echo "Removing tsconfig.app.json to prevent configuration conflicts..."
  rm tsconfig.app.json
fi

# Update references in tsconfig.json
echo "Updating TypeScript configuration..."
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

echo "Setup complete! Starting development server..."
yarn dev 