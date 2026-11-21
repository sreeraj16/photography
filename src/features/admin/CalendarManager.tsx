import React, { useState } from 'react';
import { Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { AvailabilityItem, AvailabilityStatus } from '../../types/database.types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';

export function CalendarManager() {
  const [items, setItems] = useState<AvailabilityItem[]>(() => dataStore.getAvailability());
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState<AvailabilityStatus>('blocked');
  const [newNotes, setNewNotes] = useState('');

  const refreshList = () => {
    setItems([...dataStore.getAvailability()]);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    const newItem: AvailabilityItem = {
      id: `av-${Date.now()}`,
      date: newDate,
      status: newStatus,
      notes: newNotes,
      created_at: new Date().toISOString()
    };

    dataStore.saveAvailability(newItem);
    setNewDate('');
    setNewNotes('');
    refreshList();
  };

  const handleDelete = (date: string) => {
    dataStore.deleteAvailability(date);
    refreshList();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Availability & Blackout Calendar</h2>
          <p className="text-xs text-dotpic-muted">Mark busy or fully booked shoot dates. These surface as subtle guidance on the booking form.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Add New Blocked Date (5 cols) */}
        <div className="lg:col-span-5 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
          <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-dotpic-gold" />
            <span>Block / Reserve a Date</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Select Shoot Date *</label>
              <Input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Status Type</label>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              >
                <option value="blocked" className="bg-dotpic-black text-white">Blocked (Full Day Shoot Booked)</option>
                <option value="busy" className="bg-dotpic-black text-white">Busy (Limited Slots Left)</option>
                <option value="tentative" className="bg-dotpic-black text-white">Tentative (Awaiting Advance)</option>
              </Select>
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Notes / Client Roster</label>
              <Input
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="e.g. Royal Wedding in Goa / Crew Outstation"
              />
            </div>

            <Button type="submit" variant="gold" size="md" className="w-full">
              Save Blackout Date
            </Button>
          </form>
        </div>

        {/* Right: Blackout List (7 cols) */}
        <div className="lg:col-span-7 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
          <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-4">
            RESERVED / BLOCKED DATES ({items.length})
          </span>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id || item.date}
                className="p-3.5 rounded bg-dotpic-surface border border-dotpic-border flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-white font-medium">
                      {formatDate(item.date)}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                        item.status === 'blocked'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-dotpic-muted">{item.notes}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.date)}
                  className="p-1.5 rounded text-dotpic-muted hover:text-red-400"
                  title="Remove Blackout"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <div className="py-12 text-center text-dotpic-muted text-xs">
                No dates blocked. All dates are currently open for booking.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
