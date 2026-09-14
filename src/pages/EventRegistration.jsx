import SEO from "../Components/SEO";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, Clock, Users, Award, AlertCircle, XCircle, CheckCircle, Upload, ChevronRight, ChevronLeft } from "lucide-react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const MEMBERSHIP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrbZEyK68DFowscmK-Z-CN-RldBX069eafOkTh0ocFNoZ1xv7KvJ59fEmkKjLywk2G/exec';
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtc2xaeaf';
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'rctcet_unsigned';

const TCET_YEARS = ["FE", "SE", "TE", "BE"];
const EXTERNAL_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"];

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [eventStatus, setEventStatus] = useState("open"); // open | closed | full | inactive
  
  // Participant State
  const [isFromTcet, setIsFromTcet] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    branch: "", collegeName: "TCET", yearOfStudy: "",
    division: "", rollNumber: "",
    isMember: "No",
  });
  const [customFieldData, setCustomFieldData] = useState({});

  // Autocomplete
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);

  // Pagination / Conditional Routing
  const [formSections, setFormSections] = useState([]);
  const [navigationHistory, setNavigationHistory] = useState(['root']); // Stack for going back
  
  const currentSectionId = navigationHistory[navigationHistory.length - 1];
  const isPaymentStep = currentSectionId === 'submit';
  const currentSection = formSections.find(s => s.id === currentSectionId) || formSections[0];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getEvent&id=${eventId}`);
        const data = await res.json();
        if (data.error) { setEventStatus("inactive"); return; }

        setEventData(data);

        // Parse Sections
        const sections = [];
        let curr = { id: 'root', title: 'Participant Details', description: '', nextSection: '', fields: [] };
        
        (data.formFields || []).forEach(field => {
          if (field.type === 'section') {
            sections.push(curr);
            curr = {
              id: field.id,
              title: field.label,
              description: field.optionInput,
              nextSection: field.nextSection,
              fields: []
            };
          } else {
            curr.fields.push(field);
          }
        });
        sections.push(curr);
        setFormSections(sections);

        // Determine status
        if (!data.isActive) { setEventStatus("inactive"); return; }

        const now = new Date();
        if (data.registrationDeadline && now > new Date(data.registrationDeadline)) {
          setEventStatus("closed"); return;
        }
        if (data.registrationLimit && data.registrationCount >= parseInt(data.registrationLimit)) {
          setEventStatus("full"); return;
        }

        setEventStatus("open");
      } catch {
        setEventStatus("inactive");
      } finally {
        setLoadingEvent(false);
      }
    };

    const loadMembers = async () => {
      setFetchingMembers(true);
      try {
        const res = await fetch(`${MEMBERSHIP_SCRIPT_URL}?action=getMembers`);
        const data = await res.json();
        if (data.status === 'success') {
          const all = [
            ...(data.homeMembers || []).map(m => ({ ...m, _type: 'TCET Rotaractor' })),
            ...(data.ambassadorials || []).map(m => ({ ...m, _type: 'Other college Rotaractor' })),
            ...(data.nonRotaractors || []).map(m => ({ ...m, _type: 'Non Rotaractor' }))
          ];
          setMembers(all);
        }
      } catch (err) {
        console.error("Failed to load members", err);
      } finally {
        setFetchingMembers(false);
      }
    };

    load();
    loadMembers();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (value.trim() === '') {
        setFilteredMembers([]);
        setShowDropdown(false);
      } else {
        const filtered = members.filter(m => 
          (m.name || m.Name || "").toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMembers(filtered);
        setShowDropdown(true);
      }
    }
  };

  const handleSelectMember = (m) => {
    // Determine membership status based on the list they came from
    const memberVal = (m._type === 'TCET Rotaractor' || m._type === 'Other college Rotaractor') ? 'Yes' : 'No';
    const isTCET = (m._type === 'TCET Rotaractor' || m._type === 'Non Rotaractor' && (!m.college || m.college.toUpperCase() === 'TCET'));
    
    setFormData(prev => ({
      ...prev,
      name: m.name || m.Name || prev.name,
      email: m.email || m.Email || prev.email,
      phone: m.number || m.phone || m['Phone Number'] || prev.phone,
      branch: m.department || m.branch || prev.branch,
      yearOfStudy: m.yearOfStudy || m['Year of Study'] || prev.yearOfStudy,
      division: m.division || prev.division,
      rollNumber: m.rollNumber || m['Roll No'] || prev.rollNumber,
      collegeName: m.college || m.club || (isTCET ? 'TCET' : prev.collegeName),
      isMember: memberVal
    }));
    setIsFromTcet(isTCET);
    setShowDropdown(false);
  };

  const handleCustomChange = (label, value) => {
    setCustomFieldData(prev => ({ ...prev, [label]: value }));
  };

  const uploadFileToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: "POST", body: data });
    const json = await res.json();
    return json.secure_url || "";
  };

  // Pricing Logic
  let effectivePrice = "Free";
  if (formData.isMember === "Yes") {
    if (isFromTcet) {
      effectivePrice = eventData?.memberPrice ?? "Free";
    } else {
      // Other college Rotaractor -> Use otherCollegePrice, fallback to nonMemberPrice
      effectivePrice = eventData?.otherCollegePrice || eventData?.nonMemberPrice || "Free";
    }
  } else {
    // Non Rotaractor
    effectivePrice = eventData?.nonMemberPrice ?? "Free";
  }

  const isPaid = effectivePrice !== "Free";

  const upiLink = eventData?.upiId && isPaid
    ? `upi://pay?pa=${eventData.upiId}&pn=Rotaract+Club+TCET&am=${effectivePrice}&cu=INR&tn=${encodeURIComponent(eventData.eventName)}`
    : null;

  const navigateNext = (e) => {
    e.preventDefault();
    if (isPaymentStep) return handleSubmit(e);

    // Form validation check
    const form = e.target.closest('form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Determine next section ID
    let target = 'submit';
    
    // Check conditional routing on fields first (last matched field wins)
    let routingFound = null;
    currentSection.fields.forEach(field => {
      if (['radio', 'dropdown'].includes(field.type) && field.conditionalRouting) {
        const val = customFieldData[field.label];
        if (val && field.conditionalRouting[val]) {
          routingFound = field.conditionalRouting[val];
        }
      }
    });

    if (routingFound) {
      target = routingFound;
    } else if (currentSection.nextSection) {
      target = currentSection.nextSection;
    } else {
      const idx = formSections.findIndex(s => s.id === currentSection.id);
      if (idx !== -1 && idx < formSections.length - 1) {
        target = formSections[idx + 1].id;
      }
    }

    setNavigationHistory(prev => [...prev, target]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    setNavigationHistory(prev => prev.slice(0, -1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only validate if it's not the payment step, or if it is the payment step, ensure receipt is provided if needed
    if (isPaid && !paymentReceipt) {
      toast.error("Please upload a payment receipt.");
      return;
    }

    setIsSubmitting(true);

    try {
      let receiptUrl = "";
      if (isPaid && paymentReceipt) {
        toast.loading("Uploading receipt...", { id: "receipt" });
        setUploadingReceipt(true);
        receiptUrl = await uploadFileToCloudinary(paymentReceipt);
        setUploadingReceipt(false);
        toast.dismiss("receipt");
      }

      const payload = {
        action: "submit",
        id: eventId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        isFromTcet: eventData.externalAllowed ? (isFromTcet ? "Yes" : "No") : "Yes",
        branch: isFromTcet ? formData.branch : "",
        collegeName: !isFromTcet ? formData.collegeName : "TCET",
        yearOfStudy: formData.yearOfStudy,
        division: isFromTcet ? formData.division : "",
        rollNumber: isFromTcet ? formData.rollNumber : "",
        isMember: formData.isMember,
        receiptUrl,
      };

      // Handle custom fields (including files)
      for (const section of formSections) {
        for (const field of section.fields) {
          const val = customFieldData[field.label];
          
          if (field.type === 'file' && val instanceof File) {
            toast.loading(`Uploading ${field.label}...`, { id: `upload-${field.label}` });
            payload[field.label] = await uploadFileToCloudinary(val);
            toast.dismiss(`upload-${field.label}`);
          } else {
            payload[field.label] = val || "";
          }
        }
      }

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Registration submitted successfully!");
        setTimeout(() => navigate("/events"), 2000);
      } else if (result.reason === "FORM_FULL") {
        setEventStatus("full");
        toast.error("Registrations are now full!");
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading ──
  if (loadingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Closed / Full / Inactive banners ──
  const statusScreens = {
    inactive: { icon: XCircle, color: "text-danger", bg: "bg-danger/10 border-danger/20", title: "Event Not Found", desc: "This event is no longer available." },
    closed: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10 border-warning/20", title: "Registration Closed", desc: `The registration deadline for ${eventData?.eventName} has passed.` },
    full: { icon: Users, color: "text-warning", bg: "bg-warning/10 border-warning/20", title: "Registrations Full", desc: `All ${eventData?.registrationLimit} spots for ${eventData?.eventName} have been filled.` },
  };

  if (eventStatus !== "open") {
    const s = statusScreens[eventStatus] || statusScreens.inactive;
    const Icon = s.icon;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <SEO title={s.title} />
        <div className={`inline-flex flex-col items-center gap-4 p-10 rounded-3xl border ${s.bg} backdrop-blur-xl`}>
          <Icon className={s.color} size={56} />
          <h2 className="text-2xl font-black text-foreground">{s.title}</h2>
          <p className="text-foreground/60 max-w-xs">{s.desc}</p>
          <Link to="/events" className="mt-2 text-primary font-bold hover:underline">← Browse all events</Link>
        </div>
      </div>
    );
  }

  const yearOptions = isFromTcet ? TCET_YEARS : EXTERNAL_YEARS;

  return (
    <div className="min-h-screen bg-background transition-colors py-12 px-4 flex justify-center pt-24 pb-20">
      <SEO title={`Register — ${eventData.eventName}`} description={eventData.eventDescription} />
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8"
      >
        {/* ── Left: Event Details ── */}
        <div className="md:col-span-2">
          <div className="sticky top-24 bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
            {eventData.eventImage && <img src={eventData.eventImage} alt={eventData.eventName} className="w-full h-48 object-cover" />}
            <div className="p-6 flex flex-col gap-3">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                {eventData.avenue}
              </span>
              <h2 className="text-xl font-black text-foreground">{eventData.eventName}</h2>
              <p className="text-foreground/60 text-sm leading-relaxed">{eventData.eventDescription}</p>

              <div className="border-t border-white/10 dark:border-white/5 pt-3 flex flex-col gap-2 text-sm text-foreground/60">
                <div className="flex items-center gap-2"><Calendar size={13} />{eventData.date}</div>
                <div className="flex items-center gap-2"><Clock size={13} />{eventData.startTime} – {eventData.endTime}</div>
                {eventData.hours && <div className="flex items-center gap-2"><Award size={13} />{eventData.hours} AICTE hrs</div>}
              </div>

              <div className="border-t border-white/10 dark:border-white/5 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">TCET Member Fee</span>
                  <span className="font-bold text-primary">{eventData.memberPrice === "Free" ? "Free" : `₹${eventData.memberPrice}`}</span>
                </div>
                {eventData.externalAllowed && (
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-foreground/60">External Member Fee</span>
                    <span className="font-bold text-primary">{(!eventData.otherCollegePrice || eventData.otherCollegePrice === "Free") ? "Free" : `₹${eventData.otherCollegePrice}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-foreground/60">Non-Member Fee</span>
                  <span className="font-bold text-primary">{eventData.nonMemberPrice === "Free" ? "Free" : `₹${eventData.nonMemberPrice}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="md:col-span-3">
          <form onSubmit={navigateNext} className="bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10">
            <AnimatePresence mode="wait">
              
              {/* PAYMENT STEP */}
              {isPaymentStep && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-xl font-black text-foreground mb-2 border-b border-white/10 pb-4 uppercase tracking-wider">Final Step</h3>
                  
                  {isPaid ? (
                    <div className="p-5 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20">
                      <h4 className="font-black text-foreground mb-1">Payment — ₹{effectivePrice}</h4>
                      <p className="text-sm text-foreground/50 mb-4">Scan the QR code below to pay via UPI</p>
                      {upiLink && (
                        <div className="bg-white p-3 rounded-xl w-fit mx-auto mb-4 shadow-md">
                          <QRCodeSVG value={upiLink} size={160} />
                        </div>
                      )}
                      <p className="text-xs text-center text-foreground/40 mb-4">Works with GPay, PhonePe, Paytm & all UPI apps</p>
                      <label className={labelCls}>Upload Payment Receipt *</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        required
                        disabled={uploadingReceipt || isSubmitting}
                        onChange={e => setPaymentReceipt(e.target.files[0])}
                        className={`${inputCls} file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90`}
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-primary/10 border border-primary/20 rounded-2xl">
                      <CheckCircle className="mx-auto text-primary mb-4" size={48} />
                      <h4 className="text-xl font-bold text-foreground">You're all set!</h4>
                      <p className="text-foreground/60 text-sm mt-2">This event is completely free. Click submit below to confirm your registration.</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={navigateBack} className="px-5 py-4 border border-white/20 rounded-xl text-sm font-bold text-foreground hover:bg-white/5 transition-colors flex items-center justify-center flex-1">
                      <ChevronLeft size={16} className="mr-1" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || uploadingReceipt}
                      className="bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 px-5 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-sm flex items-center justify-center flex-[2]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</span>
                      ) : "Confirm & Register"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* REGULAR STEP */}
              {!isPaymentStep && currentSection && (
                <motion.div
                  key={currentSection.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-xl font-black text-foreground border-b border-white/10 pb-4 tracking-wider">
                    {currentSection.title}
                  </h3>
                  {currentSection.description && (
                    <p className="text-sm text-foreground/60 mb-2">{currentSection.description}</p>
                  )}

                  {/* Standard Form Fields only on root section */}
                  {currentSection.id === 'root' && (
                    <>
                      {/* External toggle */}
                      {eventData.externalAllowed && (
                        <div className="flex gap-3 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 mb-2">
                          <span className="text-sm font-semibold text-foreground/70 mr-1">Are you from TCET?</span>
                          {["Yes", "No"].map(v => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => { setIsFromTcet(v === "Yes"); setFormData(p => ({ ...p, yearOfStudy: "", collegeName: v === "Yes" ? "TCET" : "" })); }}
                              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${isFromTcet === (v === "Yes") ? "bg-primary text-white border-primary" : "bg-transparent text-foreground/60 border-white/20"}`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="relative flex flex-col mb-2">
                        <label className={labelCls}>
                          Full Name *
                          {fetchingMembers && <span className="ml-2 text-xs normal-case text-primary font-medium animate-pulse">(Loading members database...)</span>}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => { if (formData.name && filteredMembers.length > 0) setShowDropdown(true) }}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                          className={inputCls}
                          required
                          autoComplete="off"
                        />
                        {showDropdown && filteredMembers.length > 0 && (
                          <ul className="absolute z-30 w-full mt-[72px] max-h-60 overflow-auto bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl custom-scrollbar">
                            {filteredMembers.map((m, idx) => (
                              <li
                                key={idx}
                                onMouseDown={() => handleSelectMember(m)}
                                className="px-5 py-3 hover:bg-primary/20 cursor-pointer text-foreground font-medium transition-colors border-b border-white/10 dark:border-white/5 last:border-b-0"
                              >
                                {m.name || m.Name} <span className="text-sm opacity-60 ml-1">({m.college || m.club || m.department || m.branch || "TCET"})</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <Input label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      <Input label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

                      {isFromTcet
                        ? <Input label="Branch / Department *" name="branch" value={formData.branch} onChange={handleChange} required />
                        : <Input label="College Name *" name="collegeName" value={formData.collegeName} onChange={handleChange} required />
                      }

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Year of Study *</label>
                          <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required className={inputCls}>
                            <option value="">Select Year</option>
                            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        {isFromTcet && <Input label="Division" name="division" value={formData.division} onChange={handleChange} />}
                      </div>

                      {isFromTcet && <Input label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />}

                      <div>
                        <label className={labelCls}>Rotaract Member? *</label>
                        <select name="isMember" value={formData.isMember} onChange={handleChange} required className={inputCls}>
                          <option value="No">Not a member</option>
                          <option value="Yes">Yes, I am a Rotaract member</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Custom Fields for current section */}
                  {currentSection.fields.map(field => (
                    <div key={field.label} className="mt-2">
                      <label className={labelCls}>{field.label}{field.required ? " *" : ""}</label>
                      {field.type === "text" && <input type="text" required={field.required} value={customFieldData[field.label] || ''} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                      {field.type === "textarea" && <textarea rows={3} required={field.required} value={customFieldData[field.label] || ''} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                      {field.type === "number" && <input type="number" required={field.required} value={customFieldData[field.label] || ''} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                      {field.type === "dropdown" && (
                        <select required={field.required} value={customFieldData[field.label] || ''} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls}>
                          <option value="">Select...</option>
                          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      )}
                      {field.type === "radio" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                          {field.options?.map(o => (
                            <label key={o} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-colors cursor-pointer shadow-sm">
                              <input type="radio" name={field.label} value={o} required={field.required} checked={customFieldData[field.label] === o} onChange={() => handleCustomChange(field.label, o)} className="w-4 h-4 accent-primary flex-shrink-0" />
                              <span className="text-sm font-semibold text-foreground/80">{o}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {field.type === "checkbox" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                          {field.options?.map(o => (
                            <label key={o} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-colors cursor-pointer shadow-sm">
                              <input
                                type="checkbox"
                                value={o}
                                checked={(customFieldData[field.label] || "").split(",").includes(o)}
                                onChange={e => {
                                  const prev = (customFieldData[field.label] || "").split(",").filter(Boolean);
                                  const next = e.target.checked ? [...prev, o] : prev.filter(x => x !== o);
                                  handleCustomChange(field.label, next.join(","));
                                }}
                                className="w-4 h-4 accent-primary rounded flex-shrink-0"
                              />
                              <span className="text-sm font-semibold text-foreground/80">{o}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {field.type === "file" && (
                        <input
                          type="file"
                          required={field.required && !customFieldData[field.label]}
                          disabled={uploadingReceipt}
                          onChange={e => handleCustomChange(field.label, e.target.files[0])}
                          className={`${inputCls} file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90`}
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                    {navigationHistory.length > 1 ? (
                      <button type="button" onClick={navigateBack} className="px-5 py-3 border border-white/20 rounded-xl text-sm font-bold text-foreground hover:bg-white/5 transition-colors flex items-center gap-1">
                        <ChevronLeft size={16} /> Back
                      </button>
                    ) : <div />}
                    <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-1">
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Helpers
const inputCls = "w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm placeholder:text-foreground/30";
const labelCls = "block text-sm font-semibold text-foreground/70 mb-2";

const Input = ({ label, name, type = "text", value, onChange, required }) => (
  <div className="mb-2">
    <label className={labelCls}>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} className={inputCls} />
  </div>
);

export default EventRegistration;
