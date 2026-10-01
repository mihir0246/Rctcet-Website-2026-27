import React, { useState, useEffect } from 'react';
import SEO from '../Components/SEO';
import { useAdminAuth } from '../context/AdminAuthContext';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

function AttendanceAdmin() {
  const { getToken } = useAdminAuth();

  // Event States
  const [event, setEvent] = useState('');
  const [eventSearch, setEventSearch] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showEventDropdown, setShowEventDropdown] = useState(false);

  // Attendee Form States
  const [name, setName] = useState('');
  const [type, setType] = useState('Home Member');
  const [otherClub, setOtherClub] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Bulk Selected Attendees
  const [selectedAttendees, setSelectedAttendees] = useState([]);

  // Member Data
  const [homeMembers, setHomeMembers] = useState([]);
  const [ambassadorials, setAmbassadorials] = useState([]);
  const [nonRotaractors, setNonRotaractors] = useState([]);

  // Search States
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [fetchingMembers, setFetchingMembers] = useState(false);

  // Fetch members & events on mount
  useEffect(() => {
    const fetchMembers = async () => {
      setFetchingMembers(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/attendance/members`);
        const data = await response.json();
        if (data.status === 'success') {
          if (data.activeEvent) {
            setEvent(data.activeEvent);
            setEventSearch(data.activeEvent);
          }
          setAllEvents(data.allEvents || []);
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

  // --- Event Handlers ---
  const handleEventChange = (e) => {
    const val = e.target.value;
    setEventSearch(val);
    setEvent(val); // Keep them in sync in case they want a custom event name
    if (val.trim() === '') {
      setFilteredEvents([]);
      setShowEventDropdown(false);
    } else {
      const filtered = allEvents.filter(ev => ev.toLowerCase().includes(val.toLowerCase()));
      setFilteredEvents(filtered);
      setShowEventDropdown(true);
    }
  };

  const handleSelectEvent = (evName) => {
    setEvent(evName);
    setEventSearch(evName);
    setShowEventDropdown(false);
  };

  // --- Member Handlers ---
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

  const addAttendeeToList = (attendeeObj) => {
    // Prevent duplicates in the current session
    if (selectedAttendees.some(a => a.name.toLowerCase() === attendeeObj.name.toLowerCase())) {
      setMessage({ type: 'error', text: 'This person is already in your selected list!' });
      return;
    }
    setSelectedAttendees([...selectedAttendees, attendeeObj]);

    // Reset fields for the next person
    setName('');
    setOtherClub('');
    setPhoneNumber('');
    setEmail('');
    setShowDropdown(false);
    setMessage({ type: '', text: '' });
  };

  const handleSelectMember = (memberObj) => {
    const attendeeObj = {
      name: memberObj.name,
      type: type,
      email: memberObj.email || email,
      number: memberObj.number || phoneNumber,
      otherClub: memberObj.club || memberObj.college || otherClub,
      department: memberObj.department || memberObj.branch || '',
      division: memberObj.division || ''
    };
    addAttendeeToList(attendeeObj);
  };

  const handleCustomEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!name.trim()) return;

      const attendeeObj = {
        name: name.trim(),
        type: type,
        email: email,
        number: phoneNumber,
        otherClub: otherClub
      };
      addAttendeeToList(attendeeObj);
    }
  };

  const removeAttendee = (indexToRemove) => {
    setSelectedAttendees(prev => prev.filter((_, idx) => idx !== indexToRemove));
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
    if (!event) {
      setMessage({ type: 'error', text: 'Event Name is required.' });
      return;
    }
    if (selectedAttendees.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one attendee to the list.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const payload = {
      pin: import.meta.env.VITE_ATTENDANCE_PIN,
      event: event,
      attendees: selectedAttendees
    };

    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage({ type: 'success', text: `Successfully logged ${selectedAttendees.length} attendees!` });
        setSelectedAttendees([]);
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

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl relative z-20">

        {/* LEFT COLUMN - FORM */}
        <div className="flex-1 relative bg-white/10 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tight">
              Attendance Portal
            </h2>
            <p className="text-muted text-lg">Strictly for Core & Board Members</p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl mb-8 font-medium border ${message.type === 'success' ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6 md:space-y-8">
            {/* EVENT DROPDOWN (SEARCHABLE) */}
            <div className="relative flex flex-col">
              <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Event Name</label>
              <input
                type="text"
                value={eventSearch}
                onChange={handleEventChange}
                onFocus={() => { if (allEvents.length > 0) setShowEventDropdown(true); }}
                onBlur={() => setTimeout(() => setShowEventDropdown(false), 200)}
                className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                placeholder={fetchingMembers ? "Fetching events..." : "Search or type event name..."}
              />
              {showEventDropdown && (
                <ul className="absolute z-30 w-full mt-[84px] max-h-60 overflow-auto bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] custom-scrollbar">
                  {(eventSearch ? filteredEvents : allEvents).map((evName, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => handleSelectEvent(evName)}
                      className="px-5 py-3 hover:bg-primary/20 dark:hover:bg-primary/30 cursor-pointer text-foreground font-medium transition-colors border-b border-white/10 dark:border-white/5 last:border-b-0"
                    >
                      {evName}
                    </li>
                  ))}
                  {(eventSearch && filteredEvents.length === 0) && (
                    <li className="px-5 py-3 text-muted italic">Use custom name: "{eventSearch}"</li>
                  )}
                </ul>
              )}
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
                  />
                </div>
              </div>
            )}

            {/* NAME (SEARCHABLE WITH ENTER TO ADD) */}
            <div className="relative flex flex-col">
              <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">
                Attendee Name
                {fetchingMembers && <span className="ml-2 text-xs normal-case text-primary font-medium animate-pulse">(Loading...)</span>}
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onKeyDown={handleCustomEnter}
                onFocus={() => { if (name && filteredMembers.length > 0) setShowDropdown(true) }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                placeholder="Search name or type & press Enter..."
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
                      {m.name} {m.department || m.division ? <span className="text-sm opacity-60 ml-1">({[m.department, m.division].filter(Boolean).join(' ')})</span> : (m.club || m.college ? <span className="text-sm opacity-60 ml-1">({m.club || m.college})</span> : '')}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || selectedAttendees.length === 0}
              className="w-full inline-flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-black text-lg py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(var(--primary)_/_0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(var(--primary)_/_0.4)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-6"
            >
              {loading ? "SUBMITTING..." : `LOG ${selectedAttendees.length > 0 ? selectedAttendees.length : ''} ATTENDANCE`}
              {!loading && <span className="text-2xl leading-none">↗</span>}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - SELECTED ATTENDEES LIST */}
        <div className="w-full lg:w-1/3 relative bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col h-full lg:h-[80vh]">
          <h3 className="text-2xl font-bold text-foreground mb-2">Selected List</h3>
          <p className="text-sm text-primary mb-6">Total Selected: {selectedAttendees.length}</p>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {selectedAttendees.length === 0 ? (
              <div className="text-muted text-center italic mt-10">
                Search and add attendees to build your list.
              </div>
            ) : (
              selectedAttendees.map((attendee, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/10 dark:bg-black/30 p-4 rounded-2xl border border-white/5">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-foreground font-bold truncate">
                      {attendee.name}
                      {(attendee.department || attendee.division) && (
                        <span className="ml-1 opacity-80 text-sm font-medium">
                          ({[attendee.department, attendee.division].filter(Boolean).join(' ')})
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted truncate">{attendee.type} {attendee.otherClub && `(${attendee.otherClub})`}</span>
                  </div>
                  <button
                    onClick={() => removeAttendee(idx)}
                    className="ml-3 w-8 h-8 flex-shrink-0 flex items-center justify-center bg-danger/20 text-danger hover:bg-danger hover:text-white transition-colors rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AttendanceAdmin;
