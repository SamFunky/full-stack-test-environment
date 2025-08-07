"use client";
import React, { useEffect, useState } from "react";

type WeatherData = {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  icon: string;
};

export default function WeatherBox() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load weather data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error || !weather) return <div>{error || "No data"}</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <img src={weather.icon} alt={weather.shortForecast} className="w-8 h-8" />
        <span className="text-lg font-semibold">{weather.name}</span>
      </div>
      <div className="text-2xl font-bold">
        {weather.temperature}°{weather.temperatureUnit}
      </div>
      <div className="mb-1">{weather.shortForecast}</div>
      <div className="text-xs text-gray-300">{weather.detailedForecast}</div>
    </div>
  );
}