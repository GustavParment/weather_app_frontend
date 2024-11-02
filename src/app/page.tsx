"use client";
import GuestNavbar from "./components/GuestNavbar";
import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext"; // Importera useWeather

export default function Home() {
  const { weather, fetchWeather, loading } = useWeather(); // Använd useWeather för att hämta väderdata

  useEffect(() => {
    fetchWeather(); // Hämta väderdata när komponenten mountas
  }, [fetchWeather]);

  return (
    <>
      <GuestNavbar />
      <div className="flex bg-blue-200 min-h-screen justify-center items-center p-2">
        <div className="sm:flex flex-col px-4">
          <h1 className="text-3xl text-white text-center shadow-lg font-bold bg-slate-900 py-10 mb-2  ">Welcome to Weather Me Now!</h1>
       
      <div className="max-w-2xl mx-96 mb-4">
      <form>   
        <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input className="block p-4 pl-10 w-full text-sm 
            text-gray-900 bg-gray-50 rounded-lg border 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500 
            dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search Weather" required />
            <button type="submit" 
            className="text-white absolute right-2.5 bottom-2.5 
            bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
            dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    

	
</div>
          <div className="sm:flex justify-center flex-wrap gap-4">
            {loading ? (
              <p className="text-white">Loading weather data...</p>
            ) : (
              weather.map((data) => (
                <div key={data.city_name} className="bg-white rounded-lg shadow-lg p-4 w-72">
                  <h2 className="text-xl font-semibold text-gray-800">{data.city_name}</h2>
                  <p className="text-lg text-gray-600">Temperature: <span className="font-bold text-blue-500">{data.temp}°C</span></p>
                  <p className="text-md text-gray-500">Description: {data.weatherDescription}</p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Max: {data.maxTemp}°C | Min: {data.minTemp}°C</p>
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
