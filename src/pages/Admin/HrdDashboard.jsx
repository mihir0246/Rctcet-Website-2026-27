import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Navbar from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SEO from '../../Components/SEO';
import { MessageCircle, Mail, AlertTriangle, Users, Filter, CheckCircle2 } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const HrdDashboard = () => {
  const { admin, getToken } = useAdminAuth();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
        throw new Error("Failed to fetch Attendance Log report.");
      }
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine role-based action permissions
  const userPosition = (admin?.position || '').toUpperCase();
  const userRoles = admin?.roles || [];
  const isMaster = userPosition === 'PRESIDENT' || userRoles.includes('MASTER_ADMIN');
  const isHrd = userPosition === 'CP_HRD' || userRoles.includes('CP_HRD');
  const isSaa = userPosition === 'SAA' || userRoles.includes('SAA');
  const isExec = isMaster || userPosition === 'SECRETARY' || userRoles.includes('SECRETARY');

  // WhatsApp button visible to CP_HRD, PRESIDENT, SECRETARY
  const showWhatsApp = isHrd || isExec;
  // Email button visible to SAA, PRESIDENT, SECRETARY
  const showEmail = isSaa || isExec;

  const generateWhatsAppMessage = (name, consecutiveAbsences) => {
    return encodeURIComponent(`Hello ${name}, this is Maithali, CP of HRD. It has come to our attention that you have missed the last ${consecutiveAbsences} consecutive events. Regular attendance is expected. Please let us know the reason for your absence.`);
  };

  const generateEmailSubject = () => {
    return encodeURIComponent(`Attendance Warning - Rotaract Club of TCET`);
  };

  const generateEmailBody = (name, consecutiveAbsences) => {
    return encodeURIComponent(`Hello ${name},\n\nThis is the Rotaract Club of TCET Admin Team.\n\nIt has come to our attention that you have missed the last ${consecutiveAbsences} consecutive events. Regular attendance is expected and closely monitored.\n\nPlease reply to this email explaining the reason for your absences.\n\nBest Regards,\nRotaract Club of TCET`);
  };

  // Category Filtering
  const categories = ['All', 'Core', 'BOD', 'GBM'];

  const filteredMembers = (reportData?.report || []).filter(member => {
    if (activeCategory === 'All') return true;
    const cat = (member.category || 'GBM').toUpperCase();
    const target = activeCategory.toUpperCase();
    if (target === 'GBM') {
      return cat !== 'CORE' && cat !== 'BOD';
    }
    return cat === target;
  });

  // Sorting: 3+ consecutive absences float to top (highlighted red), then sorted Alphabetically (A-Z)
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aRed = a.consecutiveAbsences >= 3;
    const bRed = b.consecutiveAbsences >= 3;
    if (aRed && !bRed) return -1;
    if (!aRed && bRed) return 1;
    return a.fullName.localeCompare(b.fullName);
  });

  const flaggedCount = (reportData?.report || []).filter(m => m.consecutiveAbsences >= 3).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit relative overflow-hidden">
      <SEO title="Attendance Log" description="Attendance Log & Member Absence Tracker" />

      {/* Background Radial Glows matching site theme */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tight">
            Attendance Log
          </h1>
          <p className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Monitor member attendance patterns, track consecutive absences, and issue warnings across Core, BOD, and GBM members.
          </p>
        </div>

        {/* Stats & Category Filter Container */}
        <div className="bg-white/10 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Users className="text-primary w-6 h-6" />
                Member Absence Tracker
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                Showing {sortedMembers.length} of {reportData?.report?.length || 0} total members
              </p>
            </div>

            {/* Warning Counter Badge */}
            {flaggedCount > 0 && (
              <div className="flex items-center gap-2.5 px-4 py-2 bg-danger/15 border border-danger/30 rounded-2xl text-danger font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{flaggedCount} Flagged (3+ Consecutive Absences)</span>
              </div>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="pt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-primary" /> Filter Category:
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-[0_8px_20px_rgba(var(--primary)_/_0.3)]'
                      : 'bg-white/5 dark:bg-black/20 hover:bg-white/10 dark:hover:bg-black/30 border border-white/10 text-foreground/70'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Attendance Log Table Card */}
        <div className="bg-white/10 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="p-6 bg-danger/15 border border-danger/30 text-danger rounded-2xl text-center font-semibold">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-bold text-foreground/60 uppercase tracking-wider">Member Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-foreground/60 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-foreground/60 uppercase tracking-wider">Overall Attendance</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-foreground/60 uppercase tracking-wider">Consecutive Absences</th>
                    {(showWhatsApp || showEmail) && (
                      <th className="px-6 py-4 text-center text-xs font-bold text-foreground/60 uppercase tracking-wider">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedMembers.map((member) => {
                    const isWarning = member.consecutiveAbsences >= 3;
                    return (
                      <tr
                        key={member.id}
                        className={`transition-all duration-200 ${
                          isWarning
                            ? 'bg-danger/15 hover:bg-danger/25 border-l-4 border-l-danger'
                            : 'hover:bg-white/5 dark:hover:bg-black/20'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-foreground">{member.fullName}</span>
                            {isWarning && (
                              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-danger text-white rounded-md">
                                FLAG
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-foreground/50">{member.position || 'Member'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                            member.category === 'Core'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : member.category === 'BOD'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {member.category || 'GBM'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-foreground">
                            {member.totalAttended} / {member.totalEventsCount}
                          </div>
                          <div className={`text-xs font-extrabold ${member.overallPercentage < 50 ? 'text-danger' : 'text-emerald-400'}`}>
                            {member.overallPercentage}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-xl font-black ${isWarning ? 'text-danger' : 'text-foreground'}`}>
                            {member.consecutiveAbsences}
                          </div>
                        </td>
                        {(showWhatsApp || showEmail) && (
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center items-center gap-3">
                              {showWhatsApp && (
                                <a
                                  href={`https://wa.me/91${member.phone}?text=${generateWhatsAppMessage(member.fullName, member.consecutiveAbsences)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-emerald-600/30 transform hover:-translate-y-0.5"
                                >
                                  <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                              )}
                              {showEmail && (
                                <a
                                  href={`mailto:${member.email}?subject=${generateEmailSubject()}&body=${generateEmailBody(member.fullName, member.consecutiveAbsences)}`}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-primary/30 transform hover:-translate-y-0.5"
                                >
                                  <Mail className="w-4 h-4" /> Email
                                </a>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  {sortedMembers.length === 0 && (
                    <tr>
                      <td colSpan={showWhatsApp || showEmail ? 5 : 4} className="px-6 py-12 text-center text-foreground/50 italic font-medium">
                        No members found in category "{activeCategory}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HrdDashboard;
