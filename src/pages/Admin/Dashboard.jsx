import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Power, Trash2, Users, Calendar, ChevronRight, LogOut, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import SEO from '../../Components/SEO';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=getEvents`);
      const data = await res.json();
      setEvents(data);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (eventId, currentStatus) => {
    setActionLoading(eventId + '_toggle');
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'toggleEvent', id: eventId, adminKey: ADMIN_KEY }),
      });
      await fetchEvents();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (eventId, eventName) => {
    if (!confirm(`Deactivate "${eventName}"? This will hide it from the public page.`)) return;
    setActionLoading(eventId + '_delete');
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'deleteEvent', id: eventId, adminKey: ADMIN_KEY }),
      });
      await fetchEvents();
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <SEO title="Admin Dashboard" description="Rotaract TCET Admin Dashboard" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">
              Event Dashboard
            </h1>
            <p className="text-foreground/50 text-sm mt-1">
              Signed in as <span className="text-primary font-semibold">{admin?.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEvents}
              className="p-2.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 text-foreground/60 hover:text-foreground transition-all"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 text-foreground/70 hover:text-foreground font-semibold text-sm transition-all"
            >
              <LogOut size={15} /> Logout
            </button>
            <Link
              to="/admin/create-event"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-black text-sm rounded-xl shadow-lg shadow-primary/20 transition-all uppercase tracking-wider"
            >
              <Plus size={16} /> New Event
            </Link>
          </div>
        </div>

        {/* Events Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10">
            <Calendar className="mx-auto text-foreground/30 mb-4" size={48} />
            <p className="text-foreground/50 font-medium">No active events yet.</p>
            <Link to="/admin/create-event" className="mt-4 inline-block text-primary font-bold hover:underline">
              Create your first event →
            </Link>
          </div>
        ) : (
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 dark:border-white/5">
                  <th className="text-left text-xs font-black uppercase tracking-widest text-foreground/50 px-6 py-4">Event</th>
                  <th className="text-left text-xs font-black uppercase tracking-widest text-foreground/50 px-4 py-4">Date</th>
                  <th className="text-left text-xs font-black uppercase tracking-widest text-foreground/50 px-4 py-4">Avenue</th>
                  <th className="text-left text-xs font-black uppercase tracking-widest text-foreground/50 px-4 py-4">Registrations</th>
                  <th className="text-left text-xs font-black uppercase tracking-widest text-foreground/50 px-4 py-4">Status</th>
                  <th className="text-right text-xs font-black uppercase tracking-widest text-foreground/50 px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => (
                  <motion.tr
                    key={event.eventId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={event.eventImage} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <p className="font-bold text-foreground text-sm">{event.eventName}</p>
                          <p className="text-foreground/40 text-xs">{event.eventId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground/70">{event.date}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">
                        {event.avenue}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                        <Users size={13} />
                        <span>{event.registrationCount ?? '—'}</span>
                        {event.registrationLimit && <span className="text-foreground/40">/ {event.registrationLimit}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        event.isActive
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {event.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(event.eventId, event.isActive)}
                          disabled={actionLoading === event.eventId + '_toggle'}
                          title={event.isActive ? 'Deactivate' : 'Activate'}
                          className="p-2 rounded-lg border border-white/10 hover:border-primary/30 hover:bg-primary/10 text-foreground/50 hover:text-primary transition-all"
                        >
                          {actionLoading === event.eventId + '_toggle'
                            ? <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin block" />
                            : <Power size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(event.eventId, event.eventName)}
                          disabled={actionLoading === event.eventId + '_delete'}
                          title="Deactivate & Archive"
                          className="p-2 rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-foreground/50 hover:text-red-500 transition-all"
                        >
                          {actionLoading === event.eventId + '_delete'
                            ? <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin block" />
                            : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
