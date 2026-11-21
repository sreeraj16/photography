import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../features/admin/AdminLayout';
import { DashboardOverview } from '../../features/admin/DashboardOverview';
import { EnquiryManager } from '../../features/admin/EnquiryManager';
import { GalleryManager } from '../../features/admin/GalleryManager';
import { CampusManager } from '../../features/admin/CampusManager';
import { CalendarManager } from '../../features/admin/CalendarManager';
import { PackageManager } from '../../features/admin/PackageManager';
import { TestimonialsManager } from '../../features/admin/TestimonialsManager';
import { VideosManager } from '../../features/admin/VideosManager';
import { SocialLinksManager } from '../../features/admin/SocialLinksManager';
import { HomepageManager } from '../../features/admin/HomepageManager';
import { JournalFAQManager } from '../../features/admin/JournalFAQManager';
import { ClientGalleriesManager } from '../../features/admin/ClientGalleriesManager';
import { SettingsManager } from '../../features/admin/SettingsManager';
import { ActivityLogsView } from '../../features/admin/ActivityLogsView';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const auth = localStorage.getItem('dotpic_admin_auth');
    if (!auth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'enquiries':
        return <EnquiryManager />;
      case 'galleries':
        return <GalleryManager />;
      case 'campus':
        return <CampusManager />;
      case 'calendar':
        return <CalendarManager />;
      case 'packages':
        return <PackageManager />;
      case 'client-galleries':
        return <ClientGalleriesManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'videos':
        return <VideosManager />;
      case 'social':
        return <SocialLinksManager />;
      case 'homepage':
        return <HomepageManager />;
      case 'journal':
        return <JournalFAQManager />;
      case 'logs':
        return <ActivityLogsView />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveTab()}
    </AdminLayout>
  );
}
