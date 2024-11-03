"use client";
import GuestNavbar from "./components/GuestNavbar";
import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Home() {
  const { weather, fetchWeather, loading, updateWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleUpdateWeather = (id: number, city_name: string) => {
    updateWeather(id, city_name);
  };

  return (
    <>
      <GuestNavbar />
      <div className="flex justify-center bg-blue-200  p-2">
        <div className="">
          <h1 className="sm:text-2xl text-white text-center shadow-lg font-bold bg-slate-900 py-10 mb-2  ">
            Welcome to Weather Me Now!
          </h1>

          <div className="max-w-md mx-auto mb-2">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            {loading ? (
              <p className="text-white">Loading weather data...</p>
            ) : (
              weather.map((data) => (
                <div
                  key={data.city_name}
                  className="bg-white rounded-lg shadow-lg p-4 w-72"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {data.city_name}
                  </h2>
                  <p className="text-lg text-gray-600">
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
                  <button
                    onClick={() => handleUpdateWeather(data.id, data.city_name)}
                    className="bg-blue-700 px-4 rounded-md hover:bg-blue-300"
                  >
                    Update
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
