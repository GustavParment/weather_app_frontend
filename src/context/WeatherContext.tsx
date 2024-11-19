"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  fetchWeatherData, 
  updateWeatherData, 
  fetchWeatherByCityName as fetchCityWeatherData 
} from '../services/apiServiceWeather';

interface WeatherData {
  id: number;
  city_name: string;
  temp: number;
  weatherDescription: string;
  maxTemp: number;
  minTemp: number;
  icon:string
}

interface WeatherContextType {
  weather: WeatherData[];
  loading: boolean;
  fetchWeather: () => Promise<void>;
  updateWeather: (id: number, city_name: string) => Promise<void>;
  fetchWeatherByCityName: (city_name: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateWeather = async (id: number, city_name: string) => {
    try {
      const updatedData = await updateWeatherData(id, city_name);
      setWeather((prevWeather) =>
        prevWeather.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (error) {
      console.error("Error updating weather:", error);
    }
  };

  const fetchWeatherByCityName = async (city_name: string) => {
    try {
      const response = await fetchCityWeatherData(city_name); 
      setWeather((prevWeather) => [...prevWeather, response]); 
    } catch (error) {
      console.error(`Error fetching weather for city: ${city_name}`, error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ 
      weather, loading, fetchWeather, updateWeather, fetchWeatherByCityName
    }}>
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
