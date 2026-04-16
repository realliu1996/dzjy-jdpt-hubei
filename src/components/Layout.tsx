import React from 'react';
import { LayoutDashboard, Users, ShieldAlert, FileText, Settings, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
}

export default function Layout({ children, activeMenu = '用户管理' }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
              <ShieldAlert size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-gray-900 leading-tight">
                湖北省招标投标智慧监管监督系统
              </h1>
            </div>
            <div className="h-6 w-px bg-gray-200 mx-4"></div>
            <div className="flex items-center text-sm text-gray-500">
              <span>首页</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{activeMenu}</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">预警执法分办流程</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-blue-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50">
                <User size={18} className="text-gray-600 group-hover:text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">管理员</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
