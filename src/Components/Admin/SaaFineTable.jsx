import { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Plus, X, Search, CheckCircle } from "lucide-react";

export default function SaaFineTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNonMember, setIsNonMember] = useState(false);

  const [formData, setFormData] = useState({ 
    name: '', 
    mail: '',
    reason: '', 
    baseAmount: 50,
    surcharge: 25,
    paymentDeadline: ''
  });
  
  const [adding, setAdding] = useState(false);
  const { getToken } = useAdminAuth();

  useEffect(() => {
    fetchSaaFine();
    fetchMembers();
    
    // Set default deadline to 1 week from today
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setFormData(prev => ({ ...prev, paymentDeadline: nextWeek.toISOString().split('T')[0] }));
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/attendance/members`);
      if (res.data.status === "success") {
        setMembers([...res.data.homeMembers, ...res.data.ambassadorials]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchSaaFine = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getSaaFine`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching SaaFine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberSelect = (member) => {
    setFormData({
      ...formData,
      name: member.name,
      mail: member.email
    });
    setSearchTerm(member.name);
    setShowDropdown(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const token = await getToken();
      const newRecord = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        status: 'UNPAID'
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/addSaaFine`, newRecord, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setShowModal(false);
      setSearchTerm("");
      setIsNonMember(false);
      setFormData({ name: '', mail: '', reason: '', baseAmount: 50, surcharge: 25, paymentDeadline: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0] });
      fetchSaaFine();
      alert("Fine added and email notification sent!");
    } catch (error) {
      console.error("Error adding SaaFine:", error);
      alert("Failed to add record.");
    } finally {
      setAdding(false);
    }
  };

  const calculateTotal = (row) => {
    if (row.status === 'PAID') return Number(row.totalPaid) || Number(row.baseAmount) || 0;
    
    const base = Number(row.baseAmount) || 50;
    const surcharge = Number(row.surcharge) || 25;
    
    if (!row.paymentDeadline) return base;

    const deadline = new Date(row.paymentDeadline);
    const now = new Date();
    
    // Set time to midnight for accurate day calculation
    deadline.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    if (now <= deadline) return base;
    
    const diffTime = Math.abs(now - deadline);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksLate = Math.ceil(diffDays / 7);
    
    return base + (weeksLate * surcharge);
  };

  const handleMarkPaid = async (row) => {
    if (!confirm(`Are you sure you want to mark this as paid? This will send a receipt email to ${row.name}.`)) return;
    
    try {
      const token = await getToken();
      const totalPaid = calculateTotal(row);
      
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/saafine/${row.id}/pay`, {
        totalPaid,
        mail: row.mail,
        name: row.name,
        reason: row.reason
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      fetchSaaFine();
      alert("Marked as Paid! Receipt sent to member.");
    } catch (error) {
      console.error("Error marking as paid:", error);
      alert("Failed to mark as paid.");
    }
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return <p className="text-center mt-6 text-muted">Loading...</p>;
  }

  return (
    <div className="p-6 min-h-[80vh] bg-background">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-primary">
          📋 SaaFine Ledger
        </h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all font-bold tracking-wide"
        >
          <Plus size={18} /> ADD FINE
        </button>
      </div>

      <div className="max-w-7xl mx-auto overflow-x-auto rounded-2xl shadow-xl border border-white/10">
        <table className="w-full border-collapse bg-card text-left">
          <thead className="bg-primary/10 text-foreground">
            <tr>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Member</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Reason</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Base / Sur.</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Deadline</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Accrued Fine</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider text-center">Status</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => {
                const total = calculateTotal(row);
                const isLate = row.status === 'UNPAID' && new Date() > new Date(row.paymentDeadline);
                
                return (
                  <tr
                    key={row.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold">{row.name}</div>
                      <div className="text-xs text-foreground/60">{row.mail}</div>
                      <div className="text-[10px] text-foreground/40 mt-1">ID: {row.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80">{row.reason}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold">₹{row.baseAmount || 50}</span>
                      <br/>
                      <span className="text-xs text-foreground/50">+₹{row.surcharge || 25}/wk</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={isLate ? "text-danger font-semibold" : "text-foreground/80"}>
                        {row.paymentDeadline ? new Date(row.paymentDeadline).toLocaleDateString('en-GB') : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-primary font-black text-lg">₹{total}</div>
                      {isLate && <div className="text-[10px] text-danger font-bold uppercase tracking-wider">Late Penalty Added</div>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        row.status === "PAID" ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.status === "UNPAID" ? (
                        <button
                          onClick={() => handleMarkPaid(row)}
                          className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 rounded-lg shadow transition font-bold text-xs uppercase tracking-wide flex items-center justify-center mx-auto gap-1"
                        >
                          <CheckCircle size={14} /> Mark Paid
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-foreground/40">Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-foreground/50 font-medium"
                >
                  No SaaFine records found. Enjoy the peace!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-foreground/60 hover:text-foreground transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black text-foreground mb-6">Add New Fine</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  id="nonMemberToggle" 
                  checked={isNonMember}
                  onChange={(e) => {
                    setIsNonMember(e.target.checked);
                    setSearchTerm("");
                    setFormData({...formData, name: '', mail: ''});
                  }}
                  className="accent-primary"
                />
                <label htmlFor="nonMemberToggle" className="text-sm font-semibold text-foreground/70">
                  Non-Member / Manual Entry
                </label>
              </div>

              {!isNonMember ? (
                <div className="relative">
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">Search Member</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-foreground/40" size={18} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Type name..."
                    />
                  </div>
                  {showDropdown && searchTerm && (
                    <ul className="absolute z-10 w-full mt-1 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto overflow-x-hidden">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((m, idx) => (
                          <li 
                            key={idx}
                            onClick={() => handleMemberSelect(m)}
                            className="px-4 py-2 hover:bg-primary/20 cursor-pointer text-sm border-b border-white/5 last:border-0"
                          >
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-xs text-foreground/60">{m.email}</div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-sm text-foreground/50">No member found</li>
                      )}
                    </ul>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.mail}
                      onChange={(e) => setFormData({...formData, mail: e.target.value})}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Reason for Fine</label>
                <input
                  type="text"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Late to GBM, Absent, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">Fine Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.baseAmount}
                    onChange={(e) => setFormData({...formData, baseAmount: e.target.value})}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">Weekly Surcharge (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.surcharge}
                    onChange={(e) => setFormData({...formData, surcharge: e.target.value})}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Payment Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.paymentDeadline}
                  onChange={(e) => setFormData({...formData, paymentDeadline: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={adding || (!isNonMember && !formData.name)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                  ) : "Create Fine & Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
