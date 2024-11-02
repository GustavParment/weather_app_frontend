// src/services/apiService.ts

export interface WeatherData {
    id: number;
    city_name: string;
    temp: number;
    weatherDescription: string;
    maxTemp: number;
    minTemp: number;
    country_code: string;
    clouds: number;
  }
  
  const API_BASE_URL = "https://localhost:8443/api/v1";
  
  async function request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
  
  export const fetchWeatherData = (): Promise<WeatherData[]> => {
    return request<WeatherData[]>("/weather/all", {
      method: "GET",
    });
  };
  
  
  export const createWeatherData = (data: Partial<WeatherData>): Promise<WeatherData> => {
    return request<WeatherData>("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  
  export const deleteWeatherData = (id: number): Promise<void> => {
    return request<void>(`/weather/${id}`, {
      method: "DELETE",
    });
  };
  