"use client";
import Moveable from "react-moveable";
import React, { useRef, useState } from "react";

export default function DraggableBox({
  children,
  defaultPosition,
  className,
}: {
  children: React.ReactNode;
  defaultPosition: { x: number; y: number };
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState([defaultPosition.x, defaultPosition.y]);

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
        onDrag={({ beforeTranslate }) => setPos(beforeTranslate)}
        keepRatio={false}
        hideDefaultLines={true}
      />
    </>
  );
}