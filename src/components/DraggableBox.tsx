"use client";
import Moveable from "react-moveable";
import React, { useRef, useState, useLayoutEffect } from "react";

export default function DraggableBox({
  children,
  id,
  defaultPosition,
  className,
}: {
  children: React.ReactNode;
  id: string;
  defaultPosition: { x: number; y: number };
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<[number, number]>([
    defaultPosition.x,
    defaultPosition.y,
  ]);
  const [loaded, setLoaded] = useState(false);
  type BoxPosition = {
    id: string;
    x: number;
    y: number;
  }

  useLayoutEffect(() => {
    fetch(`/api/box-positions`)
      .then((res) => res.json())
      .then((positions: BoxPosition[]) => {
        const found = positions.find((p: BoxPosition) => p.id === id);
        if (found) setPos([found.x, found.y]);
        setLoaded(true);
      });
  }, [id]);

  const handleDragEnd = ({ left, top }: { left: number; top: number }) => {
    setPos([left, top]);
    fetch("/api/box-positions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, x: Math.round(left), y: Math.round(top) }),
    });
  };

  if (!loaded) return null; // Don't render until position is loaded

  return (
    <>
      <div
        ref={ref}
        className={className}
        style={{
          position: "absolute",
          left: pos[0],
          top: pos[1],
          touchAction: "none",
        }}
      >
        {children}
      </div>
      <Moveable
        target={ref}
        draggable={true}
        onDrag={e => {
          setPos([e.left, e.top]);
        }}
        onDragEnd={e => {
          if (e.lastEvent) {
            handleDragEnd({ left: e.lastEvent.left, top: e.lastEvent.top });
          }
        }}
        keepRatio={false}
        hideDefaultLines={true}
        origin={false}
      />
    </>
  );
}