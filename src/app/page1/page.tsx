"use client";
import Link from "next/link";
import DraggableBox from "@/components/DraggableBox";
import WeatherBox from "@/components/Weather";
import Stocks from "@/components/Stocks";

export default function Page1() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-6xl tracking-tight text-center sm:text-left">
          PAGE1
        </h1>
        <p className="text-lg text-center sm:text-left -mt-7 text-gray-600">
          API/DATABASE SHOWROOM
        </p>
        <p className="text-center sm:text-left -mt-5">
          Location of components are tracked throughout all machines using postgreSQL database.
          <br />
          Feel free to move the boxes around. Everyone will see your changes.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/"
            rel="noopener noreferrer"
          >
            Backward
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/"
            rel="noopener noreferrer"
          >
            Forward
          </Link>
        </div>
      </main>
      {/* Draggable Boxes */}
      <DraggableBox
        id="sp500"
        defaultPosition={{ x: 40, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <Stocks type="sp500" />
      </DraggableBox>
      <DraggableBox
        id="dowjones"
        defaultPosition={{ x: 400, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <Stocks type="dowjones" />
      </DraggableBox>
      <DraggableBox
        id="weather"
        defaultPosition={{ x: 800, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <WeatherBox />
      </DraggableBox>
    </div>
  );
}