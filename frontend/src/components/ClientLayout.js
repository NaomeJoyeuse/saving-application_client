
import React from "react";
import { Outlet } from "react-router-dom";
import ClientSidebar from "./sidebar";

export default function ClientDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
 
      <ClientSidebar />

     
      <div className="flex-1 overflow-y-auto  p-6">
        <Outlet />
      </div>
    </div>
  );
}
