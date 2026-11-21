import { dataStore } from '../../lib/dataStore';
import { formatDate } from '../../lib/utils';
import { History, Shield } from 'lucide-react';

export function ActivityLogsView() {
  const logs = dataStore.getActivityLogs();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-white">Security & Audit Activity Trail</h2>
        <p className="text-xs text-dotpic-muted">Complete ledger of system events, enquiries updates, setting changes, and media publications.</p>
      </div>

      <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dotpic-surface text-dotpic-muted uppercase tracking-wider font-mono border-b border-dotpic-border">
              <tr>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Entity ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dotpic-border font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-dotpic-surface/50">
                  <td className="py-3 px-4 font-semibold text-dotpic-gold">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-white uppercase">
                    {log.entity_type}
                  </td>
                  <td className="py-3 px-4 text-dotpic-muted">
                    {log.entity_id}
                  </td>
                  <td className="py-3 px-4 text-dotpic-muted">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-dotpic-muted max-w-xs truncate">
                    {log.details ? JSON.stringify(log.details) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
