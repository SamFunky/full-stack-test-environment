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
  const [nyTime, setNyTime] = useState<string>("");

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setNyTime(now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error || !weather) return <div>{error || "No data"}</div>;

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">New York City</span>
        
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-500">({nyTime})</span>
      </div>
      <div className="text-2xl font-bold">
        {weather.temperature}°{weather.temperatureUnit}
      </div>
      <div className="mb-1">{weather.shortForecast}</div>
    </div>
  );
}