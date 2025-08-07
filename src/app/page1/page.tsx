import Link from "next/link";
import DraggableBox from "@/components/DraggableBox";

export default function Page1() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-6xl tracking-tight text-center sm:text-left">
          PAGE1
        </h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/"
            rel="noopener noreferrer"
          >
            Backward
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/page2"
            rel="noopener noreferrer"
          >
            Forward
          </Link>
        </div>
      </main>
      {/* Draggable Boxes */}
      <DraggableBox
        id="stock"
        defaultPosition={{ x: 40, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <h2 className="text-xl font-semibold mb-2">Stock Market</h2>
        <p>Stock data goes here...</p>
      </DraggableBox>
      <DraggableBox
        id="weather"
        defaultPosition={{ x: 400, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <h2 className="text-xl font-semibold mb-2">Weather</h2>
        <p>Weather data goes here...</p>
      </DraggableBox>
    </div>
  );
}

