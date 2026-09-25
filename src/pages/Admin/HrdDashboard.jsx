import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const HrdDashboard = () => {
  const { getToken } = useAdminAuth();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${BACKEND_URL}/api/admin/hrd-report`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch HRD report.");
      }
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppMessage = (name, consecutiveAbsences) => {
    return encodeURIComponent(`Hello ${name}, this is Maithali, CP of HRD. It has come to our attention that you have missed the last ${consecutiveAbsences} consecutive events. As a Core/BOD member, regular attendance is expected. Please let me know the reason for your absence.`);
  };

  const generateEmailSubject = () => {
    return encodeURIComponent(`Attendance Warning - Rotaract Club of TCET`);
  };

  const generateEmailBody = (name, consecutiveAbsences) => {
    return encodeURIComponent(`Hello ${name},\n\nThis is Maithali, CP of HRD at the Rotaract Club of TCET.\n\nIt has come to our attention that you have missed the last ${consecutiveAbsences} consecutive events. As a Core/BOD member, regular attendance is expected and closely monitored.\n\nPlease reply to this email explaining the reason for your absences.\n\nBest Regards,\nMaithali\nCP of HRD, RC TCET`);
  };

  return (
    <div className="min-h-screen bg-bg-color text-text-light flex flex-col font-outfit">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-8 text-center">
          HRD Dashboard
        </h1>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-light">Attendance Tracker</h2>
            <p className="text-text-muted mt-2 text-sm md:text-base">
              Tracking consecutive absences for Core & BOD members across the last 3 events.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
          ) : error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Member Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Overall Attendance</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Consecutive Absences</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {reportData?.report?.map((member) => {
                    const isWarning = member.consecutiveAbsences >= 3;
                    return (
                      <tr 
                        key={member.id} 
                        className={`transition-colors ${isWarning ? 'bg-red-500/20 hover:bg-red-500/30' : 'hover:bg-white/5'}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-light">{member.fullName}</div>
                          <div className="text-xs text-text-muted">{member.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member.category === 'Core' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {member.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-light">
                            {member.totalAttended} / {member.totalEventsCount}
                          </div>
                          <div className={`text-xs font-bold ${member.overallPercentage < 50 ? 'text-red-400' : 'text-green-400'}`}>
                            {member.overallPercentage}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-lg font-bold ${isWarning ? 'text-red-400' : 'text-text-light'}`}>
                            {member.consecutiveAbsences}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-3">
                            <a 
                              href={`https://wa.me/91${member.phone}?text=${generateWhatsAppMessage(member.fullName, member.consecutiveAbsences)}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-green-500/20"
                            >
                              WhatsApp
                            </a>
                            <a 
                              href={`mailto:${member.email}?subject=${generateEmailSubject()}&body=${generateEmailBody(member.fullName, member.consecutiveAbsences)}`}
                              className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-primary/20"
                            >
                              Email
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {reportData?.report?.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                        No Core or BOD members found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HrdDashboard;
