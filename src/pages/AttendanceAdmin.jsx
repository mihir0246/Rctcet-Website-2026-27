import React, { useState, useEffect } from 'react';
import SEO from '../Components/SEO';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrbZEyK68DFowscmK-Z-CN-RldBX069eafOkTh0ocFNoZ1xv7KvJ59fEmkKjLywk2G/exec';

function AttendanceAdmin() {
  const [event, setEvent] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Home Member');
  const [otherClub, setOtherClub] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [homeMembers, setHomeMembers] = useState([]);
  const [ambassadorials, setAmbassadorials] = useState([]);
  const [nonRotaractors, setNonRotaractors] = useState([]);

  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [fetchingMembers, setFetchingMembers] = useState(false);

  // Fetch members on mount
  useEffect(() => {
    const fetchMembers = async () => {
      setFetchingMembers(true);
      try {
        const response = await fetch(`${SCRIPT_URL}?action=getMembers`);
        const data = await response.json();
        if (data.status === 'success') {
          if (data.activeEvent) setEvent(data.activeEvent);
          setHomeMembers(data.homeMembers || []);
          setAmbassadorials(data.ambassadorials || []);
          setNonRotaractors(data.nonRotaractors || []);
        }
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setFetchingMembers(false);
      }
    };
    fetchMembers();
  }, []);

  const getActiveList = () => {
    if (type === 'Home Member') return homeMembers;
    if (type === 'Ambassadorial') return ambassadorials;
    if (type === 'Non Rotarator') return nonRotaractors;
    return [];
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);

    if (val.trim() === '') {
      setFilteredMembers([]);
      setShowDropdown(false);
    } else {
      const activeList = getActiveList();
      const filtered = activeList.filter(m => m.name.toLowerCase().includes(val.toLowerCase()));
      setFilteredMembers(filtered);
      setShowDropdown(true);
    }
  };

  const handleSelectMember = (memberObj) => {
    setName(memberObj.name);
    if (type === 'Ambassadorial') {
      setOtherClub(memberObj.club || '');
      setPhoneNumber(memberObj.number || '');
      setEmail(memberObj.email || '');
    } else if (type === 'Non Rotarator') {
      setOtherClub(memberObj.college || '');
      setPhoneNumber(memberObj.number || '');
      setEmail(memberObj.email || '');
    }
    setShowDropdown(false);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setName('');
    setOtherClub('');
    setPhoneNumber('');
    setEmail('');
    setFilteredMembers([]);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event || !name) {
      setMessage({ type: 'error', text: 'Event and Name are required.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const payload = {
      pin: 'rctcet',
      event,
      name,
      type,
      otherClub: (type === 'Ambassadorial' || type === 'Non Rotarator') ? otherClub : '',
      number: phoneNumber,
      email: email
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage({ type: 'success', text: 'Attendance logged successfully!' });
        setName('');
        setOtherClub('');
        setPhoneNumber('');
        setEmail('');
        setType('Home Member');
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to submit.' });
      }

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12 lg:p-24 bg-background flex items-center justify-center overflow-hidden pt-32 lg:pt-40">
      <SEO title="Attendance Logger" description="Confidential Attendance Portal" />

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none z-0" 
        style={{ backgroundImage: `url('https://res.cloudinary.com/dtc2xaeaf/image/upload/v1771630629/Baseline_grid_bg_zywtov.svg')`, backgroundSize: '100px' }}
      />

      <div className="max-w-2xl w-full relative z-20">
        <div className="relative bg-white/10 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tight">
              Attendance Portal
            </h2>
            <p className="text-muted text-lg">Strictly for Core & Board Members</p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl mb-8 font-medium border ${message.type === 'success' ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* EVENT */}
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Event Name</label>
              <input
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium cursor-not-allowed opacity-70"
                placeholder={fetchingMembers ? "Fetching Active Event..." : "No Active Event found"}
                readOnly
              />
            </div>

            {/* ATTENDEE TYPE */}
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Attendee Type</label>
              <select
                value={type}
                onChange={handleTypeChange}
                className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground font-medium"
              >
                <option className="bg-background text-foreground" value="Home Member">Home Member</option>
                <option className="bg-background text-foreground" value="Non Rotarator">Non Rotarator</option>
                <option className="bg-background text-foreground" value="Ambassadorial">Ambassadorial</option>
              </select>
            </div>

            {/* NAME */}
            <div className="relative flex flex-col">
              <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">
                Attendee Name
                {fetchingMembers && <span className="ml-2 text-xs normal-case text-primary font-medium animate-pulse">(Loading members...)</span>}
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onFocus={() => { if (name && filteredMembers.length > 0) setShowDropdown(true) }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                placeholder="Start typing name..."
                autoComplete="off"
              />
              {/* DROPDOWN */}
              {showDropdown && filteredMembers.length > 0 && (
                <ul className="absolute z-30 w-full mt-[84px] max-h-60 overflow-auto bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] custom-scrollbar">
                  {filteredMembers.map((m, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => handleSelectMember(m)}
                      className="px-5 py-3 hover:bg-primary/20 dark:hover:bg-primary/30 cursor-pointer text-foreground font-medium transition-colors border-b border-white/10 dark:border-white/5 last:border-b-0"
                    >
                      {m.name} {m.club || m.college ? <span className="text-sm opacity-60 ml-1">({m.club || m.college})</span> : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* OTHER CLUB / COLLEGE (Conditional) */}
            {(type === 'Ambassadorial' || type === 'Non Rotarator') && (
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">
                  {type === 'Ambassadorial' ? 'Club Name' : 'College Name'} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={otherClub}
                  onChange={(e) => setOtherClub(e.target.value)}
                  className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                  placeholder={type === 'Ambassadorial' ? 'e.g. RC Wilson College' : 'e.g. TCET'}
                  required
                />
              </div>
            )}

            {/* PHONE & EMAIL (Conditional) */}
            {(type === 'Ambassadorial' || type === 'Non Rotarator') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Phone Number <span className="text-primary">*</span></label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    placeholder="10-digit number"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Email <span className="text-primary">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-black text-lg py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(110,159,159,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(110,159,159,0.4)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-6"
            >
              {loading ? "SUBMITTING..." : "LOG ATTENDANCE"}
              {!loading && <span className="text-2xl leading-none">↗</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AttendanceAdmin;
