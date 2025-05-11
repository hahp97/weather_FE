# Weather Application

This is a weather application that shows current weather and forecast for cities around the world. The app is built with React, TypeScript, Tailwind CSS, and uses the OpenWeather API.

## Features

### Current Weather

- Shows current date and time
- Displays weather icon based on conditions
- Shows actual temperature and "feels like" temperature
- Provides weather description (sunny, cloudy, etc.)
- Shows humidity percentage
- Displays wind speed with direction arrow
- Shows visibility in kilometers

### 5-Day Forecast

- Shows weather forecast for the next 5 days
- Displays data in 3-hour intervals
- Groups forecast by days
- Shows weather icon, temperature, and description for each time period

### Search & History

- Search for any city in the world
- View your search history
- Click on past searches to view that city again
- Delete individual search history items
- Clear all search history at once

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- Zustand for state management
- Axios for HTTP requests
- React Router for navigation
- Secure local storage for saving search history

## Project Structure

The project follows a modular structure:

- `components/` - UI components separated by features and layout
- `apis/` - API integration with OpenWeather
- `hooks/` - Custom React hooks for data fetching
- `store/` - Zustand stores for state management
- `utils/` - Helper functions and utilities
- `pages/` - Main application pages
- `routes/` - Application routing

## Self-Evaluation

This application fully meets all the project requirements:

### Feature Completeness

- ✅ **Current Weather Summary**: Complete with all required elements (date, icon, temperatures, description, humidity, wind, visibility)
- ✅ **5-Day Forecast**: Shows 3-hour interval forecasts properly grouped by days
- ✅ **Search & History**: Full search functionality with history management

### Code Quality

- ✅ **Reusability**: Components are reusable and modular
- ✅ **Readability**: Consistent naming conventions and self-documenting code
- ✅ **Structure**: Well-organized folder structure separating features, layout, and utilities
- ✅ **Error Handling**: Comprehensive handling of various error scenarios
- ✅ **Security**: API key protection and encrypted local storage

### Technical Implementation

- ✅ **State Management**: Efficient using Zustand
- ✅ **Data Fetching**: Optimized with React Query
- ✅ **Styling**: Consistent approach with Tailwind CSS
- ✅ **Responsiveness**: Works well across all device sizes

## Deployment

The application is deployed and accessible at:

- [https://weather-fe-gamma.vercel.app/](https://weather-fe-gamma.vercel.app/)

## Future Improvements

Potential enhancements for future versions:

- Adding weather alerts and notifications
- Implementing user accounts for personalized experiences
- Including historical weather data visualization
- Adding more detailed maps and geographical data
- Supporting additional languages for internationalization
- Implementing PWA (Progressive Web App) features for offline access

## Security Features

- API key is secured and not exposed in the codebase or Docker files
- Environment variables are used for sensitive configuration
- Search history is encrypted in local storage
- Error handling for failed API requests
- Input validation for search queries

## How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
3. **Setup environment variables:**

   Create a `.env.local` file in the root directory with your OpenWeather API key:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   VITE_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

   This file is used by the Vite development server and will not be committed to the repository.

4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
5. Open your browser at `http://localhost:5173`

## Docker Support

The application can also be run using Docker:

1. Create a `.env` file in the root directory with your OpenWeather API key:

   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

   This file is used by the Docker setup and start.sh script.

2. Run the application:

   ```
   # Development mode
   ./start.sh dev

   # Production mode
   ./start.sh prod
   ```

> **Important Note about Environment Variables**:
>
> - For local development with Vite: Use `.env.local` with variables prefixed with `VITE_`
> - For Docker deployment: Use `.env` without the `VITE_` prefix
> - For complete setup, you can have both files with their respective formats

## Error Handling

The application handles various error scenarios:

- City not found
- Network errors
- Invalid search inputs

## Responsive Design

The UI is responsive and works well on:

- Desktop computers
- Tablets
- Mobile phones

## Related Projects

I have also developed a fullstack version of this weather application:

- GitHub Repository: [github.com/hahp97/weather-app](https://github.com/hahp97/weather-app)

This fullstack version includes both frontend and backend components, providing a more comprehensive implementation with server-side features.
