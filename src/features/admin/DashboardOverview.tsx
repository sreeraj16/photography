import {
  CalendarCheck,
  Image as ImageIcon,
  GraduationCap,
  TrendingUp,
  HardDrive,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { dataStore } from '../../lib/dataStore';
import { formatDate } from '../../lib/utils';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const enquiries = dataStore.getEnquiries();
  const galleries = dataStore.getGalleries();
  const photos = dataStore.getPhotos();
  const campusEvents = dataStore.getCampusEvents();
  const logs = dataStore.getActivityLogs().slice(0, 6);

  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const confirmedEnquiries = enquiries.filter(e => e.status === 'Confirmed').length;
  const quotedEnquiries = enquiries.filter(e => e.status === 'Quoted').length;

  // Chart data simulation
  const chartData = [
    { month: 'Jun', enquiries: 14, weddings: 8, campus: 6 },
    { month: 'Jul', enquiries: 18, weddings: 10, campus: 8 },
    { month: 'Aug', enquiries: 24, weddings: 12, campus: 12 },
    { month: 'Sep', enquiries: 31, weddings: 16, campus: 15 },
    { month: 'Oct', enquiries: 42, weddings: 22, campus: 20 },
    { month: 'Nov', enquiries: 56, weddings: 30, campus: 26 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-sm bg-gradient-to-r from-dotpic-charcoal via-amber-950/20 to-dotpic-charcoal border border-dotpic-gold/30">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
            EXECUTIVE CONTROL CENTER
          </span>
          <h2 className="text-2xl font-serif text-white">
            Studio Health & Activity Overview
          </h2>
          <p className="text-xs text-dotpic-muted mt-1">
            Real-time pipeline metrics, storage usage, and recent client transactions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigateTab('galleries')}
            className="px-4 py-2 rounded-sm bg-dotpic-gold text-dotpic-black text-xs uppercase tracking-wider font-semibold hover:bg-dotpic-goldLight transition-colors flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Add / Upload Photos</span>
          </button>
          <button
            onClick={() => onNavigateTab('homepage')}
            className="px-4 py-2 rounded-sm border border-dotpic-gold/50 text-dotpic-gold text-xs uppercase tracking-wider font-semibold hover:bg-dotpic-gold/10 transition-colors"
          >
            Update Website
          </button>
        </div>
      </div>

      {/* Quick Launchpad Strip for Owner Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('galleries')}
          className="p-4 rounded-sm bg-gradient-to-br from-dotpic-charcoal to-black border border-dotpic-gold/40 hover:border-dotpic-gold p-5 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-dotpic-gold/20 flex items-center justify-center text-dotpic-gold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif text-white font-medium group-hover:text-dotpic-gold transition-colors">
                Photo Upload & Albums
              </h3>
              <span className="text-[10px] text-dotpic-muted font-mono uppercase">
                {photos.length} Photos in {galleries.length} Galleries
              </span>
            </div>
          </div>
          <p className="text-xs text-dotpic-muted leading-relaxed">
            Click here to upload photos directly from your device, create albums, and arrange portfolio frames.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('homepage')}
          className="p-4 rounded-sm bg-gradient-to-br from-dotpic-charcoal to-black border border-teal-500/30 hover:border-teal-400 p-5 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif text-white font-medium group-hover:text-teal-300 transition-colors">
                Website Content & Hero
              </h3>
              <span className="text-[10px] text-teal-400/80 font-mono uppercase">
                Live Studio Frontpage
              </span>
            </div>
          </div>
          <p className="text-xs text-dotpic-muted leading-relaxed">
            Update masked headlines, change hero billboard photo/video, edit stats counters, and toggle sections.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('settings')}
          className="p-4 rounded-sm bg-gradient-to-br from-dotpic-charcoal to-black border border-slate-700 hover:border-slate-500 p-5 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif text-white font-medium group-hover:text-white transition-colors">
                Studio Settings & Socials
              </h3>
              <span className="text-[10px] text-slate-400 font-mono uppercase">
                WhatsApp, Instagram, Backup
              </span>
            </div>
          </div>
          <p className="text-xs text-dotpic-muted leading-relaxed">
            Change WhatsApp number (+91 6281392682), Instagram handle, studio address, announcement bar, or export JSON backup.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total & New Enquiries */}
        <div
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-sm bg-dotpic-charcoal border border-dotpic-border hover:border-dotpic-gold/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-dotpic-muted mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Enquiries Pipeline</span>
            <CalendarCheck className="w-4 h-4 text-dotpic-gold" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {enquiries.length}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-semibold">{newEnquiries} New</span>
            <span className="text-dotpic-muted">• {confirmedEnquiries} Confirmed</span>
          </div>
        </div>

        {/* Master Photographs Count */}
        <div
          onClick={() => onNavigateTab('galleries')}
          className="p-5 rounded-sm bg-dotpic-charcoal border border-dotpic-border hover:border-dotpic-gold/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-dotpic-muted mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Delivered Photos</span>
            <ImageIcon className="w-4 h-4 text-dotpic-gold" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {photos.length}
          </div>
          <p className="text-xs text-dotpic-muted">
            Across {galleries.length} published albums
          </p>
        </div>

        {/* Campus Stories Events */}
        <div
          onClick={() => onNavigateTab('campus')}
          className="p-5 rounded-sm bg-dotpic-charcoal border border-dotpic-border hover:border-dotpic-gold/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-dotpic-muted mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Campus Stories</span>
            <GraduationCap className="w-4 h-4 text-dotpic-gold" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {campusEvents.length}
          </div>
          <p className="text-xs text-dotpic-muted">
            All QR codes active & verified
          </p>
        </div>

        {/* Supabase Storage Usage */}
        <div className="p-5 rounded-sm bg-dotpic-charcoal border border-dotpic-border">
          <div className="flex items-center justify-between text-dotpic-muted mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Cloud Media Vault</span>
            <HardDrive className="w-4 h-4 text-dotpic-gold" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            18.4 GB
          </div>
          <div className="w-full bg-dotpic-surface h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-dotpic-gold h-full rounded-full" style={{ width: '37%' }} />
          </div>
          <span className="text-[10px] text-dotpic-muted block mt-1">37% of 50 GB Pro tier</span>
        </div>
      </div>

      {/* Main Row: Trend Chart (8 cols) & Activity Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recharts Booking Growth Chart */}
        <div className="lg:col-span-8 p-6 rounded-sm bg-dotpic-charcoal border border-dotpic-border shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-serif text-white">Booking Enquiries Trend (2026)</h3>
              <p className="text-xs text-dotpic-muted">Monthly leads volume across weddings & campus fests</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +42% MoM Growth
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C9A96E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="month" stroke="#A8A39A" fontSize={11} tickLine={false} />
                <YAxis stroke="#A8A39A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#141414', borderColor: '#C9A96E', fontSize: '12px' }}
                  itemStyle={{ color: '#F5F3EE' }}
                />
                <Area type="monotone" dataKey="enquiries" stroke="#C9A96E" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Audit Logs */}
        <div className="lg:col-span-4 p-6 rounded-sm bg-dotpic-charcoal border border-dotpic-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif text-white">Live Activity Feed</h3>
              <Clock className="w-4 h-4 text-dotpic-muted" />
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="text-xs border-l-2 border-dotpic-gold/50 pl-3 py-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-dotpic-gold font-medium uppercase text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-dotpic-muted">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-dotpic-white mt-0.5 truncate">
                    {log.entity_type}: {log.entity_id}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('logs')}
            className="mt-6 w-full py-2 text-center text-xs text-dotpic-gold hover:underline uppercase tracking-wider font-semibold border-t border-dotpic-border pt-3 block"
          >
            View Complete Audit Log →
          </button>
        </div>
      </div>
    </div>
  );
}
