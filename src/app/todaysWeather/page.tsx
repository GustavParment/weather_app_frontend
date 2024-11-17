//Fixa relode on Search

"use client";

import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import UserNavbar from "../components/UserNavbar";

const TodaysWeather = () => {
  const { fetchWeatherByCityName, updateWeather, 
    weather, loading 
  } = useWeather(); 

  const [cityName, setCityName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleUpdateWeather = (id: number, city_name: string) => {
    updateWeather(id, city_name);
  };

  const handleFetchWeather = async () => {
    if (cityName) {
      await fetchWeatherByCityName(cityName);
      setCityName(""); 
    } else {
      console.log("Please enter a city name");
    }
  };

  return (
    <>
    <UserNavbar />
      <div className="bg-blue-400 min-h-screen p-4">
        <div className="flex bg-gradient-to-b from-white justify-evenly p-2 ">
         <img
            className="w-20 h-auto"
            src="https://png.pngtree.com/png-clipart/20230819/original/pngtree-cartoon-flat-sun-icon-with-a-smile-vector-illustration-isolated-on-white-background-eps-10-picture-image_8070688.png"
            alt="Weather icon 2"
          />
        </div>
        <div className="flex justify-center 
        items-center text-slate-800 my-4
        text-xl">
          Add Your Custom Weather Here
        </div>

        <div className="relative flex justify-center my-2">
          <input
            type="text"
            className="rounded-md p-2 text-black"
            value={cityName}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button
            onClick={handleFetchWeather}
            className="bg-blue-900 text-white rounded-sm px-4 ml-2"
          >
            Add
          </button>
        </div>

        
        <div className="flex justify-center flex-wrap gap-6 mt-6">
          {loading ? (
            <p className="text-white">Loading weather data...</p>
          ) : weather.length > 0 ? (
            weather.map((data) => (
              <div
                key={data.city_name}
                className="bg-white rounded-lg shadow-lg p-4 w-72 text-center"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {data.city_name}
                </h2>
                <p className="text-4xl font-bold text-blue-500 mb-2">
                  {data.temp}°C
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {data.weatherDescription}
                </p>
                <div className="text-sm text-gray-400 mb-2">
                  Max: {data.maxTemp}°C | Min: {data.minTemp}°C
                </div>
                <button
                    onClick={() => handleUpdateWeather(data.id, data.city_name)}
                    className="bg-blue-700 px-4 rounded-md hover:bg-blue-300"
                  >
                    Update
                  </button>
              </div>
            ))
          ) : (
            <p className="text-white">No weather data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TodaysWeather;
