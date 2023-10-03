export async function fetchWeatherData(): Promise<any> {
    try {
      console.log('fetching from 3003');
      const response = await fetch('http://localhost:3003');
      const data = await response.json();
      console.log('data', data)
      return data;
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      return null;
    }
  }
  