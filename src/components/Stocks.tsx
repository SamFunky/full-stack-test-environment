import StockCard from "./StockCard";
import React, { useEffect, useState } from "react";

type StockData = {
  price: number;
  change: number;
  changesPercentage: number;
};

type Stocks = {
  sp500: StockData;
  dowjones: StockData;
};

export default function Stocks({ type }: { type: "sp500" | "dowjones" }) {
  const [stocks, setStocks] = useState<Stocks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stocks")
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load stock data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading stock data...</div>;
  if (error || !stocks) return <div>{error || "No data"}</div>;

  const stock = stocks[type];
  return (
    <StockCard
      name={type === "sp500" ? "S&P 500 (SPY)" : "Dow Jones (DIA)"}
      price={stock.price}
      change={stock.change}
      changesPercentage={stock.changesPercentage}
    />
  );
}