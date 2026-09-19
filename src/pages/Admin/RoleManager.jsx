import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Shield, CheckCircle, AlertCircle, RefreshCw, ChevronDown, User } from 'lucide-react';
import SEO from '../../Components/SEO';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const POSITIONS = [
  'GBM',
  'PRESIDENT',
  'SECRETARY',
  'JOINT_SECRETARY',
  'SAA',
  'CPF',
  'VICE_PRESIDENT',
  'AVENUE_DIRECTOR',
  'CORE'
];

const RoleManager = () => {
  const { getToken, admin } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('GBM');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    setAssigning(true);
    setError(null);
    setSuccessMsg(null);

    // Auto assign specific internal roles based on position if needed
    let roles = ["MEMBER"];
    if (selectedPosition === 'PRESIDENT') roles.push("MASTER_ADMIN");
    if (selectedPosition === 'SAA') roles.push("SAA");
    if (selectedPosition === 'CPF') roles.push("FINANCE");
    if (selectedPosition === 'SECRETARY') roles.push("SECRETARY");
    
    try {
      const token = await getToken();
      const res = await fetch(`${BACKEND_URL}/api/admin/assign-position`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          targetUid: selectedUser,
          newPosition: selectedPosition,
          roles: roles
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to assign role");
      }
      
      setSuccessMsg(`Successfully updated role to ${selectedPosition}!`);
      fetchUsers(); // Refresh list to reflect changes
      setSelectedUser(null);
      setSelectedPosition('GBM');
      
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 pt-24 lg:pt-32">
      <SEO title="Role Manager" description="Manage User Roles and Permissions" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <Shield className="text-primary w-8 h-8" /> Role Manager
            </h1>
            <p className="text-foreground/50 mt-1">Assign privileges to club members.</p>
          </div>
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-foreground rounded-xl transition-all font-semibold text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-danger/20 text-danger border border-danger/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-success/20 text-success border border-success/30 rounded-xl flex items-start gap-3">
            <CheckCircle className="shrink-0 mt-0.5" size={18} />
            <p className="font-semibold">{successMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ASSIGN ROLE FORM */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-xl sticky top-24">
              <h2 className="text-xl font-bold mb-6">Assign New Role</h2>
              <form onSubmit={handleAssignRole} className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Select User</label>
                  <div className="relative">
                    <select
                      value={selectedUser || ''}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    >
                      <option value="" disabled className="bg-background">-- Choose a member --</option>
                      {users.map(u => (
                        <option key={u.uid} value={u.uid} className="bg-background text-foreground">
                          {u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-foreground/50 pointer-events-none" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Select Position</label>
                  <div className="relative">
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {POSITIONS.map(p => (
                        <option key={p} value={p} className="bg-background text-foreground">{p}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-foreground/50 pointer-events-none" size={16} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedUser || assigning}
                  className="w-full mt-4 flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white p-3 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {assigning ? <RefreshCw className="animate-spin w-5 h-5" /> : 'Assign Role'}
                </button>
              </form>
            </div>
          </div>

          {/* USER LIST */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="font-bold flex items-center gap-2"><User size={18} /> Active Members</h2>
                <button onClick={fetchUsers} className="text-foreground/50 hover:text-foreground transition-all">
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              {loading ? (
                <div className="p-12 flex justify-center">
                  <RefreshCw className="animate-spin text-primary w-8 h-8" />
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center text-foreground/50 font-semibold">
                  No users found in the system.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase text-foreground/50">
                      <tr>
                        <th className="px-6 py-4 font-black tracking-wider">Name / Email</th>
                        <th className="px-6 py-4 font-black tracking-wider">Current Role</th>
                        <th className="px-6 py-4 font-black tracking-wider">System Privileges</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map(user => (
                        <tr key={user.uid} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold">{user.name}</p>
                            <p className="text-xs text-foreground/50">{user.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                              user.position === 'PRESIDENT' ? 'bg-primary/20 text-primary border border-primary/30' :
                              user.position === 'SAA' ? 'bg-danger/20 text-danger border border-danger/30' :
                              user.position === 'CPF' ? 'bg-success/20 text-success border border-success/30' :
                              user.position === 'GBM' ? 'bg-white/10 text-foreground border border-white/10' :
                              'bg-info/20 text-info border border-info/30'
                            }`}>
                              {user.position || 'GBM'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(user.roles || []).map(r => (
                                <span key={r} className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-foreground/70">
                                  {r}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoleManager;
