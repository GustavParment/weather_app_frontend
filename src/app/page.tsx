"use client";
import GuestNavbar from "./components/GuestNavbar";
import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Home() {
  const { weather, fetchWeather, loading, updateWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <GuestNavbar />
      <div className="flex justify-center bg-blue-900 p-2">
        <div className="">
          <h1 className="sm:text-2xl text-white text-center shadow-lg font-bold b py-10 mb-2 bg-gradient-to-b from-slate-600  ">
            Welcome to Weather Me Now!
          </h1>

          <div className="flex justify-center flex-wrap gap-4 ">
            {loading ? (
              <p className="text-white">Loading weather data...</p>
            ) : (
              weather.map((data) => (
                <div
                  key={data.city_name}
                  className="bg-gradient-to-b from-slate-600 rounded-lg shadow-lg p-4 w-72"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {data.city_name}
                  </h2>
                  <p className="text-lg text-yellow-50">
                    Temperature:{" "}
                    <span className="font-bold text-blue-500">
                      {data.temp}°C
                    </span>
                  </p>
                  <p className="text-md text-gray-500">
                    Description: {data.weatherDescription}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Max: {data.maxTemp}°C | Min: {data.minTemp}°C
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
