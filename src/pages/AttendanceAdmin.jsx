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
    <div className="min-h-screen bg-background flex items-center justify-center p-6 pt-24">
      <SEO title="Attendance Logger" description="Confidential Attendance Portal" />

      <div className="max-w-xl w-full bg-card rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-secondary mb-2">
          Attendance Portal
        </h2>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EVENT */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Event Name</label>
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-muted bg-gray-100 dark:bg-card text-foreground focus:outline-none cursor-not-allowed"
              placeholder={fetchingMembers ? "Fetching Active Event..." : "No Active Event found"}
              readOnly
            />
          </div>

          {/* ATTENDEE TYPE */}
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Attendee Type</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="w-full px-4 py-3 rounded-lg border border-muted bg-card dark:bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Home Member">Home Member</option>
              <option value="Non Rotarator">Non Rotarator</option>
              <option value="Ambassadorial">Ambassadorial</option>
            </select>
          </div>

          {/* NAME */}
          <div className="relative">
            <label className="block text-sm font-medium text-muted mb-1">
              Attendee Name
              {fetchingMembers && <span className="ml-2 text-xs text-primary">(Loading members...)</span>}
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onFocus={() => { if (name && filteredMembers.length > 0) setShowDropdown(true) }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="w-full px-4 py-3 rounded-lg border border-muted bg-card dark:bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Start typing name..."
              autoComplete="off"
            />
            {/* DROPDOWN */}
            {showDropdown && filteredMembers.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-card dark:bg-card border border-muted rounded-lg shadow-lg">
                {filteredMembers.map((m, idx) => (
                  <li
                    key={idx}
                    onMouseDown={() => handleSelectMember(m)}
                    className="px-4 py-2 hover:bg-primary-light dark:hover:bg-stone-600 cursor-pointer text-foreground"
                  >
                    {m.name} {m.club || m.college ? <span className="text-sm opacity-70">({m.club || m.college})</span> : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* OTHER CLUB / COLLEGE (Conditional) */}
          {(type === 'Ambassadorial' || type === 'Non Rotarator') && (
            <div>
              <label className="block text-sm font-medium text-muted mb-1">
                {type === 'Ambassadorial' ? 'Club Name' : 'College Name'}
              </label>
              <input
                type="text"
                value={otherClub}
                onChange={(e) => setOtherClub(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-muted bg-card dark:bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={type === 'Ambassadorial' ? 'e.g. RC Wilson College' : 'e.g. TCET'}
                required
              />
            </div>
          )}

          {/* PHONE & EMAIL (Conditional) */}
          {(type === 'Ambassadorial' || type === 'Non Rotarator') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-muted bg-card dark:bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="10-digit number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-muted bg-card dark:bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Log Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AttendanceAdmin;
