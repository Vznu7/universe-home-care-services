import { logout } from '@/app/actions/auth';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Admin Portal | ${siteConfig.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 space-x-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm leading-tight tracking-tight">{siteConfig.name}</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5 mr-3 text-slate-400" />
            Dashboard
          </Link>
          <Link 
            href="/admin/leads" 
            className="flex items-center px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            <Users className="w-5 h-5 mr-3 text-slate-400" />
            Leads
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <button 
              type="submit" 
              className="flex items-center w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-8 shrink-0 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-medium text-slate-700">Admin User</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
