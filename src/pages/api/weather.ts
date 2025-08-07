import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // New York City coordinates
  const lat = "40.7128";
  const lon = "-74.0060";

  try {
    const pointResp = await fetch(
      `https://api.weather.gov/points/${lat},${lon}`,
      {
        headers: {
          "User-Agent": "samuelfunk1118@gmail.com",
          "Accept": "application/geo+json",
        },
      }
    );
    if (!pointResp.ok) throw new Error("Failed to get forecast URL");
    const pointData = await pointResp.json();
    const forecastUrl = pointData.properties.forecast;

    const forecastResp = await fetch(forecastUrl, {
      headers: {
        "User-Agent": "samuelfunk1118@gmail.com",
        "Accept": "application/geo+json",
      },
    });
    if (!forecastResp.ok) throw new Error("Failed to get forecast");
    const forecastData = await forecastResp.json();

    const period = forecastData.properties.periods[0];

    res.status(200).json({
      name: period.name,
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit,
      shortForecast: period.shortForecast,
      detailedForecast: period.detailedForecast,
      icon: period.icon,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}