import { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Plus, X } from "lucide-react";

export default function SaaFineTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', amount: '', reason: '', mail: '' });
  const [adding, setAdding] = useState(false);
  const { getToken } = useAdminAuth();

  useEffect(() => {
    fetchSaaFine();
  }, []);

  const fetchSaaFine = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getSaaFine`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      console.log("Fetched SaaFine:", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching SaaFine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const token = await getToken();
      const newRecord = {
        id: Date.now().toString(),
        name: formData.name,
        date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
        amount: formData.amount,
        reason: formData.reason,
        mail: formData.mail,
        status: 'UNPAID'
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/addSaaFine`, newRecord, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setShowModal(false);
      setFormData({ name: '', amount: '', reason: '', mail: '' });
      fetchSaaFine();
    } catch (error) {
      console.error("Error adding SaaFine:", error);
      alert("Failed to add record.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6 text-muted">Loading...</p>;
  }

  return (
    <div className="p-6 min-h-[80vh] bg-background">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
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

      <div className="max-w-6xl mx-auto overflow-x-auto rounded-2xl shadow-xl border border-white/10">
        <table className="w-full border-collapse bg-card text-left">
          <thead className="bg-primary/10 text-foreground">
            <tr>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">ID</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Name</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Date</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Amount</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Reason</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Mail</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider">Status</th>
              <th className="px-6 py-4 font-black uppercase text-xs tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground/60">{row.id}</td>
                  <td className="px-6 py-4 font-bold">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground/80">{row.date}</td>
                  <td className="px-6 py-4 text-primary font-bold">
                    ₹{row.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/80">{row.reason}</td>
                  <td className="px-6 py-4 text-sm text-foreground/80">{row.mail}</td>
                  <td
                    className={`px-6 py-4 font-bold text-xs uppercase tracking-wide ${
                      row.status.toLowerCase() === "paid"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.status.toLowerCase() === "unpaid" && (
                      <button
                        onClick={() => alert("Payment integration coming soon!")}
                        className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 px-4 py-1.5 rounded-lg shadow-sm transition font-bold text-xs uppercase tracking-wide"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
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
          <div className="bg-card p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-foreground/60 hover:text-foreground transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black text-foreground mb-6">Add New Fine</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Member Name</label>
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
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Reason</label>
                <input
                  type="text"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Late to meeting"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="50"
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
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={adding}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                >
                  {adding ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                  ) : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
