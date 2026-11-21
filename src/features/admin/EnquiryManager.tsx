import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  MessageCircle,
  CheckCircle,
  Clock,
  Trash2,
  Calendar,
  Phone,
  Eye,
  X
} from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Enquiry, EnquiryStatus } from '../../types/database.types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

export function EnquiryManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => dataStore.getEnquiries());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');

  const refreshList = () => {
    setEnquiries([...dataStore.getEnquiries()]);
  };

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.reference_id.toLowerCase().includes(search.toLowerCase()) ||
      e.phone_number.includes(search) ||
      e.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (enquiry: Enquiry, newStatus: EnquiryStatus) => {
    const updated = { ...enquiry, status: newStatus };
    dataStore.saveEnquiry(updated);
    refreshList();
    if (selectedEnquiry?.id === enquiry.id) {
      setSelectedEnquiry(updated);
    }
  };

  const handleSaveNotes = () => {
    if (!selectedEnquiry) return;
    const updated = {
      ...selectedEnquiry,
      admin_notes: editNotes,
      follow_up_date: editFollowUp
    };
    dataStore.saveEnquiry(updated);
    setSelectedEnquiry(updated);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      dataStore.deleteEnquiry(id);
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      refreshList();
    }
  };

  const handleExportCSV = () => {
    const headers = ["Reference ID", "Client Name", "Phone", "Category", "Shoot Date", "Location", "Package", "Status", "Created At"];
    const rows = filtered.map(e => [
      e.reference_id,
      `"${e.full_name}"`,
      `"${e.phone_number}"`,
      e.category,
      e.preferred_date,
      `"${e.location}"`,
      `"${e.package_id || 'N/A'}"`,
      e.status,
      e.created_at
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DOTPIC_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openOneClickWhatsApp = (e: Enquiry) => {
    const cleanPhone = e.phone_number.replace(/[^0-9]/g, '');
    const message = `Hello ${e.full_name}!

This is the DOTPIC PHOTOGRAPHY team following up regarding your booking enquiry (${e.reference_id}) for ${e.category} on ${e.preferred_date}.

We would love to discuss your vision and confirm our crew availability!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const statusColors: Record<EnquiryStatus, string> = {
    New: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Quoted: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Completed: "bg-gray-500/10 text-gray-300 border-gray-500/30",
    Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/30"
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Client Booking Enquiries</h2>
          <p className="text-xs text-dotpic-muted">Manage incoming leads, statuses, follow-up dates and WhatsApp communication.</p>
        </div>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCSV}
            icon={<Download className="w-3.5 h-3.5 text-dotpic-gold" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-dotpic-charcoal p-4 rounded-sm border border-dotpic-border">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-dotpic-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ref ID (DP-2026-...), phone or genre..."
            className="w-full bg-dotpic-surface border border-dotpic-border pl-9 pr-4 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-dotpic-gold"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-dotpic-surface border border-dotpic-border px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-dotpic-gold"
          >
            <option value="all">All Lead Statuses</option>
            <option value="New">New Leads</option>
            <option value="Contacted">Contacted</option>
            <option value="Quoted">Quoted</option>
            <option value="Confirmed">Confirmed Bookings</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dotpic-surface text-dotpic-muted uppercase tracking-wider font-mono border-b border-dotpic-border">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Shoot Genre</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dotpic-border">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-dotpic-surface/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-dotpic-gold font-medium">
                    {enq.reference_id}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">
                    {enq.full_name}
                  </td>
                  <td className="py-3 px-4 text-dotpic-muted font-mono">
                    {enq.phone_number}
                  </td>
                  <td className="py-3 px-4 text-dotpic-white">
                    {enq.category}
                  </td>
                  <td className="py-3 px-4 text-dotpic-muted">
                    {formatDate(enq.preferred_date)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[enq.status]}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openOneClickWhatsApp(enq)}
                        className="p-1.5 rounded bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 border border-emerald-500/30"
                        title="One-Click WhatsApp Followup"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setEditNotes(enq.admin_notes || '');
                          setEditFollowUp(enq.follow_up_date || '');
                        }}
                        className="p-1.5 rounded bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1.5 rounded bg-rose-950/30 text-rose-400 hover:bg-rose-900/40 border border-rose-500/30"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-dotpic-muted">
                    No matching booking leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Workflow Drawer / Modal */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 p-1.5 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold">
                LEAD DOSSIER
              </span>
              <span className="font-mono text-xs text-dotpic-muted">• {selectedEnquiry.reference_id}</span>
            </div>

            <h3 className="text-2xl font-serif text-white mb-6">
              {selectedEnquiry.full_name}
            </h3>

            {/* Quick Status Workflow Buttons */}
            <div className="mb-6 p-4 rounded bg-dotpic-surface border border-dotpic-border">
              <label className="text-[11px] uppercase tracking-wider text-dotpic-muted block mb-2 font-mono">
                Update Status Workflow:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['New', 'Contacted', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'] as EnquiryStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry, st)}
                    className={`px-3 py-1 rounded text-xs uppercase font-medium transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-dotpic-gold text-dotpic-black font-semibold shadow'
                        : 'bg-black/60 text-dotpic-muted hover:text-white border border-dotpic-border'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Info Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6 pb-6 border-b border-dotpic-border">
              <div>
                <span className="text-dotpic-muted block text-[11px]">Phone:</span>
                <span className="text-white font-mono text-sm">{selectedEnquiry.phone_number}</span>
              </div>
              <div>
                <span className="text-dotpic-muted block text-[11px]">Category:</span>
                <span className="text-white text-sm">{selectedEnquiry.category}</span>
              </div>
              <div>
                <span className="text-dotpic-muted block text-[11px]">Preferred Date:</span>
                <span className="text-white">{formatDate(selectedEnquiry.preferred_date)}</span>
              </div>
              <div>
                <span className="text-dotpic-muted block text-[11px]">Location:</span>
                <span className="text-white">{selectedEnquiry.location}</span>
              </div>
              <div>
                <span className="text-dotpic-muted block text-[11px]">Package Choice:</span>
                <span className="text-dotpic-gold font-medium">{selectedEnquiry.package_id || 'Custom'}</span>
              </div>
              <div>
                <span className="text-dotpic-muted block text-[11px]">Budget Range:</span>
                <span className="text-white">{selectedEnquiry.budget_range || 'Not specified'}</span>
              </div>
            </div>

            {/* Full Event Details */}
            <div className="mb-6">
              <span className="text-[11px] uppercase font-mono tracking-wider text-dotpic-gold block mb-1">
                Client Event Details:
              </span>
              <p className="text-xs text-dotpic-muted p-3 rounded bg-dotpic-surface border border-dotpic-border leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.event_details}
              </p>
            </div>

            {selectedEnquiry.additional_requirements && (
              <div className="mb-6">
                <span className="text-[11px] uppercase font-mono tracking-wider text-dotpic-gold block mb-1">
                  Additional Requirements:
                </span>
                <p className="text-xs text-dotpic-muted p-3 rounded bg-dotpic-surface border border-dotpic-border">
                  {selectedEnquiry.additional_requirements}
                </p>
              </div>
            )}

            {/* Admin Notes & Follow up */}
            <div className="space-y-4 pt-4 border-t border-dotpic-border">
              <div>
                <label className="text-xs text-dotpic-white font-medium block mb-1">
                  Internal Studio Notes & Crew Roster
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Quoted ₹95,000 via WhatsApp. Client wants Senior Director Naveen assigned..."
                  className="w-full bg-dotpic-surface border border-dotpic-border p-3 text-xs text-white rounded-sm focus:outline-none focus:border-dotpic-gold"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <label className="text-[11px] text-dotpic-muted block mb-1">Follow-Up Reminder Date</label>
                  <input
                    type="date"
                    value={editFollowUp}
                    onChange={(e) => setEditFollowUp(e.target.value)}
                    className="bg-dotpic-surface border border-dotpic-border px-3 py-1.5 rounded-sm text-xs text-white focus:outline-none focus:border-dotpic-gold"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openOneClickWhatsApp(selectedEnquiry)}
                    icon={<MessageCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  >
                    Reply on WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={handleSaveNotes}
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
