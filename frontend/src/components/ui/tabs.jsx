// frontend/src/components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ children }) {
  return <div className="tabs">{children}</div>;
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 border-b">{children}</div>;
}

export function TabsTrigger({ children, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold ${isActive ? "border-b-2 border-blue-500 text-blue-700" : "text-gray-500"}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div className="mt-4">{children}</div>;
}
