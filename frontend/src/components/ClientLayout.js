import React from "react";
import ClientSidebar from "./ClientSidebar";

export default function ClientLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <ClientSidebar />

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
