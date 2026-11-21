import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  GraduationCap,
  CalendarCheck,
  CalendarDays,
  Package,
  MessageSquare,
  Youtube,
  Settings,
  FileText,
  HelpCircle,
  Share2,
  Lock,
  LogOut,
  ExternalLink,
  Menu,
  X,
  History
} from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { DotpicLogo } from '../../components/common/DotpicLogo';

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('dotpic_admin_auth');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview & Analytics', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'enquiries', label: 'Booking Enquiries', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'galleries', label: 'Portfolio Galleries', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'campus', label: 'Campus Stories & QR', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'calendar', label: 'Availability Calendar', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'packages', label: 'Packages & Pricing', icon: <Package className="w-4 h-4" /> },
    { id: 'client-galleries', label: 'Private Client Vaults', icon: <Lock className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Reviews Moderation', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'videos', label: 'YouTube Films Hub', icon: <Youtube className="w-4 h-4" /> },
    { id: 'social', label: 'Socials & /links Hub', icon: <Share2 className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage Content', icon: <FileText className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal & FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'logs', label: 'Audit Activity Logs', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings & Backup', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-dotpic-black text-dotpic-white flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-dotpic-charcoal border-r border-dotpic-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Portal Badge */}
          <div className="p-6 border-b border-dotpic-border flex items-center justify-between">
            <Link to="/" target="_blank" className="flex items-center gap-2 group">
              <DotpicLogo size="sm" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-2.5 bg-black/40 border-b border-dotpic-border/60 flex items-center justify-between text-[11px]">
            <span className="text-dotpic-muted">Admin Role:</span>
            <span className="text-dotpic-gold font-mono font-semibold uppercase">Owner (Full)</span>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-dotpic-gold text-dotpic-black font-semibold shadow-md'
                      : 'text-dotpic-muted hover:text-white hover:bg-dotpic-surface'
                  }`}
                >
                  <span className={isActive ? 'text-dotpic-black' : 'text-dotpic-gold'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions: View Public Site & Logout */}
        <div className="p-4 border-t border-dotpic-border space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-sm bg-dotpic-surface text-dotpic-muted hover:text-white text-xs uppercase tracking-wider transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-sm text-red-400 hover:bg-red-950/20 text-xs uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 border-b border-dotpic-border bg-dotpic-charcoal/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-dotpic-muted hover:text-white"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-serif uppercase tracking-widest text-dotpic-white font-medium">
              DOTPIC Management Platform
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block text-dotpic-muted">
              Studio: <span className="text-white">Jubilee Hills</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
