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

function createRequestOptions(options: RequestInit = {}): RequestInit {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  return {
    ...options,
    headers,
  };
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${url}`,
    createRequestOptions(options)
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
    );
  }

  return response.json();
}

export const fetchWeatherData = (): Promise<WeatherData[]> => {
  return request<WeatherData[]>("/weather/all", { method: "GET" });
};

export const updateWeatherData = (
  id: number,
  city_name: string
): Promise<WeatherData> => {
  return request<WeatherData>(`/fetch/update/${id}/${city_name}`, {
    method: "PUT",
  });
};

export const fetchWeatherByCityName = (
  city_name: string
): Promise<WeatherData> => {
  return request<WeatherData>(`/fetch/save/${city_name}`, { method: "POST" });
};

export const createWeatherData = (
  data: Partial<WeatherData>
): Promise<WeatherData> => {
  return request<WeatherData>("/weather", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteWeatherData = (id: number): Promise<void> => {
  return request<void>(`/weather/${id}`, { method: "DELETE" });
};
