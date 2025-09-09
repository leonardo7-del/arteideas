import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';

const Header = ({ onToggleSidebar, user }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between pr-6 pl-3 md:pl-4 lg:pl-0 shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="h-0.5 w-6 bg-gray-600"></div>
            <div className="h-0.5 w-6 bg-gray-600"></div>
            <div className="h-0.5 w-6 bg-gray-600"></div>
          </div>
        </button>
        
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar clientes, pedidos..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
        </button>

        <button className="p-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'Elberc149'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Administrador'}</p>
          </div>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;