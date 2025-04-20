// frontend/src/components/ui/card.jsx
import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-xl p-4 ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
