import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    type FMPStock = {
      symbol: string;
      price: number;
      change: number;
      changesPercentage: number;
    };
    const apiKey = process.env.FMP_API_KEY;
    const symbols = ["SPY", "DIA"];
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(",")}?apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch stock data");
    const data: FMPStock[] = await response.json();

    const spy = data.find((item: FMPStock) => item.symbol === "SPY");
    const dia = data.find((item: FMPStock) => item.symbol === "DIA");

    if (!spy || !dia) throw new Error("Missing data for SPY or DIA");

    res.status(200).json({
      sp500: {
        price: spy.price,
        change: spy.change,
        changesPercentage: spy.changesPercentage,
      },
      dowjones: {
        price: dia.price,
        change: dia.change,
        changesPercentage: dia.changesPercentage,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}