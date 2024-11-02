"use client"
import { createContext, useContext, useState, ReactNode } from 'react';


interface WeatherData {
  city_name: string;
  temp: number;
  weatherDescription: string;
  
}

interface WeatherContextType {
  weather: WeatherData[]; 
  fetchWeather: () => Promise<void>; 
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);


const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = async () => {
 
    try {
      const response = await fetch('https://localhost:8443/api/v1/weather/all');
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export { WeatherProvider, useWeather };
