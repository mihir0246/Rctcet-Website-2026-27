import SEO from "../Components/SEO";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, Clock, Users, Award, AlertCircle, XCircle, CheckCircle } from "lucide-react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
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

  // Autocomplete states
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);

  // Load event from Apps Script
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getEvent&id=${eventId}`);
        const data = await res.json();
        if (data.error) { setEventStatus("inactive"); return; }

        setEventData(data);

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
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getMembers`);
        const data = await res.json();
        if (data.status === 'success' && data.members) {
          setMembers(data.members);
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
          (m.Name || m.name || "").toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMembers(filtered);
        setShowDropdown(true);
      }
    }
  };

  const handleSelectMember = (m) => {
    setFormData(prev => ({
      ...prev,
      name: m.Name || m.name || "",
      email: m.Email || m.email || prev.email,
      phone: m["Phone Number"] || m.phone || prev.phone,
      branch: m.Department || m.branch || prev.branch,
      yearOfStudy: m["Year of Study"] || m.yearOfStudy || prev.yearOfStudy,
      division: m.Division || m.division || prev.division,
      rollNumber: m["Roll No"] || m.rollNumber || prev.rollNumber,
      isMember: "Yes"
    }));
    setIsFromTcet(true);
    setShowDropdown(false);
  };

  const handleCustomChange = (label, value) => {
    setCustomFieldData(prev => ({ ...prev, [label]: value }));
  };

  const uploadReceipt = async (file) => {
    setUploadingReceipt(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: "POST", body: data });
    const json = await res.json();
    setUploadingReceipt(false);
    return json.secure_url || "";
  };

  const effectivePrice = formData.isMember === "Yes"
    ? (eventData?.memberPrice ?? "Free")
    : (eventData?.nonMemberPrice ?? "Free");

  const upiLink = eventData?.upiId && effectivePrice !== "Free"
    ? `upi://pay?pa=${eventData.upiId}&pn=Rotaract+Club+TCET&am=${effectivePrice}&cu=INR&tn=${encodeURIComponent(eventData.eventName)}`
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let receiptUrl = "";
      if (effectivePrice !== "Free" && paymentReceipt) {
        toast.loading("Uploading receipt...", { id: "receipt" });
        receiptUrl = await uploadReceipt(paymentReceipt);
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
        collegeName: !isFromTcet ? formData.collegeName : "",
        yearOfStudy: formData.yearOfStudy,
        division: isFromTcet ? formData.division : "",
        rollNumber: isFromTcet ? formData.rollNumber : "",
        isMember: formData.isMember,
        receiptUrl,
      };

      // Handle custom fields (including files)
      for (const field of (eventData.formFields || [])) {
        if (field.type === 'section') continue;
        const val = customFieldData[field.label];
        
        if (field.type === 'file' && val instanceof File) {
          toast.loading(`Uploading ${field.label}...`, { id: `upload-${field.label}` });
          payload[field.label] = await uploadReceipt(val);
          toast.dismiss(`upload-${field.label}`);
        } else {
          payload[field.label] = val || "";
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
    inactive: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20", title: "Event Not Found", desc: "This event is no longer available." },
    closed: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", title: "Registration Closed", desc: `The registration deadline for ${eventData?.eventName} has passed.` },
    full: { icon: Users, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20", title: "Registrations Full", desc: `All ${eventData?.registrationLimit} spots for ${eventData?.eventName} have been filled.` },
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
    <div className="min-h-screen bg-background transition-colors py-12 px-4 flex justify-center">
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
            <img src={eventData.eventImage} alt={eventData.eventName} className="w-full h-52 object-cover" />
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
                  <span className="text-foreground/60">Member Fee</span>
                  <span className="font-bold text-primary">{eventData.memberPrice === "Free" ? "Free" : `₹${eventData.memberPrice}`}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-foreground/60">Non-Member Fee</span>
                  <span className="font-bold text-primary">{eventData.nonMemberPrice === "Free" ? "Free" : `₹${eventData.nonMemberPrice}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="md:col-span-3 bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10">
          <h3 className="text-lg font-black text-foreground mb-6 border-b border-white/10 pb-4 uppercase tracking-wider">Participant Details</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* External toggle */}
            {eventData.externalAllowed && (
              <div className="flex gap-3 p-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20">
                <span className="text-sm font-semibold text-foreground/70 mr-1">Are you from TCET?</span>
                {["Yes", "No"].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setIsFromTcet(v === "Yes"); setFormData(p => ({ ...p, yearOfStudy: "" })); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${isFromTcet === (v === "Yes") ? "bg-primary text-white border-primary" : "bg-transparent text-foreground/60 border-white/20"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}

            {/* Standard fields */}
            <div className="relative flex flex-col mb-4">
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
                <ul className="absolute z-30 w-full mt-[72px] max-h-60 overflow-auto bg-white dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl custom-scrollbar">
                  {filteredMembers.map((m, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => handleSelectMember(m)}
                      className="px-5 py-3 hover:bg-primary/20 cursor-pointer text-foreground font-medium transition-colors border-b border-white/10 dark:border-white/5 last:border-b-0"
                    >
                      {m.Name || m.name} <span className="text-sm opacity-60 ml-1">({m.Department || m.branch || "TCET"})</span>
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

            {/* Custom fields */}
            {eventData.formFields?.map((field) => {
              if (field.type === "section") {
                return (
                  <div key={field.label} className="mt-8 mb-4 border-b border-white/10 pb-4">
                    <h3 className="text-xl font-black text-foreground tracking-tight">{field.label}</h3>
                    {field.optionInput && <p className="text-foreground/60 text-sm mt-1 whitespace-pre-wrap">{field.optionInput}</p>}
                  </div>
                );
              }

              return (
                <div key={field.label}>
                  <label className={labelCls}>{field.label}{field.required ? " *" : ""}</label>
                  {field.type === "text" && <input type="text" required={field.required} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                  {field.type === "textarea" && <textarea rows={3} required={field.required} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                  {field.type === "number" && <input type="number" required={field.required} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls} />}
                  {field.type === "dropdown" && (
                    <select required={field.required} onChange={e => handleCustomChange(field.label, e.target.value)} className={inputCls}>
                      <option value="">Select...</option>
                      {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                  {field.type === "radio" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                      {field.options?.map(o => (
                        <label key={o} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-colors cursor-pointer shadow-sm">
                          <input type="radio" name={field.label} value={o} required={field.required} onChange={() => handleCustomChange(field.label, o)} className="w-4 h-4 accent-primary flex-shrink-0" />
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
                      required={field.required}
                      disabled={uploadingReceipt}
                      onChange={e => handleCustomChange(field.label, e.target.files[0])}
                      className={`${inputCls} file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90`}
                    />
                  )}
                </div>
              );
            })}

            {/* Payment section */}
            {effectivePrice !== "Free" && (
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
                  disabled={uploadingReceipt}
                  onChange={e => setPaymentReceipt(e.target.files[0])}
                  className={`${inputCls} file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary/90`}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || uploadingReceipt}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest text-sm mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : "Confirm Registration"}
            </button>
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
  <div>
    <label className={labelCls}>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} className={inputCls} />
  </div>
);

export default EventRegistration;
