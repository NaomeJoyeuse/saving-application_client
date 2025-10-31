
import React from "react";
import { Outlet } from "react-router-dom";
import ClientSidebar from "./sidebar";

export default function ClientDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
 
      <ClientSidebar />

     
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
