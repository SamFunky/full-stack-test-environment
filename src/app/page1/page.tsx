import Link from "next/link";
import DraggableBox from "@/components/DraggableBox";

export default function Page1() {
  return (
    <div className="font-sans min-h-screen bg-[#0a0a0a] relative">
      <main className="flex flex-col gap-8 items-center pt-16 z-20 relative">
        <h1 className="text-6xl tracking-tight text-center">PAGE1</h1>
        <div className="flex gap-4 items-center">
          <Link className="..." href="/">Backward</Link>
          <Link className="..." href="/page2">Forward</Link>
        </div>
      </main>
      {/* Draggable Boxes */}
      <DraggableBox
        defaultPosition={{ x: 40, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <h2 className="text-xl font-semibold mb-2">Stock Market</h2>
        <p>Stock data goes here...</p>
      </DraggableBox>
      <DraggableBox
        defaultPosition={{ x: 400, y: 300 }}
        className="absolute bg-gray-800 rounded-lg p-4 text-white shadow w-80 h-40 cursor-move"
      >
        <h2 className="text-xl font-semibold mb-2">Weather</h2>
        <p>Weather data goes here...</p>
      </DraggableBox>
    </div>
  );
}