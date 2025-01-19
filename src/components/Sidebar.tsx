import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  BarChart2, 
  Users, 
  Download, 
  LogOut,
  Settings,
  UserCircle,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Upload, label: 'Upload Documents', path: '/upload' },
  { icon: BarChart2, label: 'Statistics', path: '/stats' },
  { icon: Users, label: 'All Users', path: '/users' },
  { icon: Download, label: 'Download App', path: '/download' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
  { icon: LogOut, label: 'Logout', path: '/login' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
    style={{
      height: '100vh',
    }}
    //  className='h-full bg-red-900 p-10'
     >
      <button
      style={{
        left:  !isOpen ? "20px" : '200px',

      }}
        className="fixed top-2  z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed top-0 left-0 h-full bg-[#1e3a8a] text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
      } lg:relative z-40`}>
        <div className="flex items-center gap-3 p-4 h-16 border-b border-blue-700/50 bg-gradient-to-r from-blue-900 to-indigo-900">

          <div className={`${!isOpen && 'lg:hidden'}`}>
            <h1 className="font-semibold">Granthini Workbench</h1>
            <p className="text-xs opacity-75">Powered By Bhashini</p>
          </div>
        </div>

        <nav className="p-4 bg-gradient-to-b from-blue-900 to-indigo-900 h-full">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 whitespace-nowrap ${
                index === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''
              } ${index >= menuItems.length - 3 ? 'mt-4' : ''}`}
            >
              <item.icon size={20} />
              <span className={`${!isOpen && 'lg:hidden'}`}>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      </div>

  );
};

export default Sidebar;