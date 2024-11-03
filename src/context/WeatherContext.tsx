// src/context/WeatherContext.tsx

"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchWeatherData, updateWeatherData } from '../services/apiService'; // Importera dina API-funktioner

interface WeatherData {
  id: number;
  city_name: string;
  temp: number;
  weatherDescription: string;
  maxTemp: number;
  minTemp: number;
}

interface WeatherContextType {
  weather: WeatherData[];
  loading: boolean;
  fetchWeather: () => Promise<void>;
  updateWeather: (id: number, city_name: string) => Promise<void>;
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

  // För att ladda väderdata automatiskt vid komponentens första inladdning
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading, fetchWeather, updateWeather }}>
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
