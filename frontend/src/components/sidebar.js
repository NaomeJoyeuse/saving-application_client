import { Link, useLocation } from "react-router-dom";
import { Home, History, User, LogOut, Wallet,LayoutDashboard } from "lucide-react";

export default function ClientSidebar() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { path: "/transactions", icon: History, label: "Transactions" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Saving App</h1>
          <p className="text-xs text-gray-500">Savings Account</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-emerald-50 text-emerald-700 font-semibold shadow-inner"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-emerald-600" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors font-medium"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
