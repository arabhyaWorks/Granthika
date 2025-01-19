import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex ">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="transition-all duration-300 bg-white-900 w-full">
        <main className="flex">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
