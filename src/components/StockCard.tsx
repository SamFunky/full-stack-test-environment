"use client";
import React from "react";

type StockCardProps = {
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
};

export default function StockCard({ name, price, change, changesPercentage }: StockCardProps) {
  return (
    <div>
      <div className="mb-2 font-semibold">{name}</div>
      <div>
        <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        <span className={change >= 0 ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)} ({changesPercentage.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}