import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, Upload, GripVertical, ChevronDown } from 'lucide-react';
import SEO from '../../Components/SEO';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtc2xaeaf';
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'rctcet_unsigned';

const AVENUES = [
  'Club Service', 'Community Service', 'International Service',
  'Professional Development', 'The Rotaract Foundation', 'Sports & Well-being'
];

const FIELD_TYPES = [
  { value: 'text', label: 'Short Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Number' },
  { value: 'radio', label: 'Multiple Choice (Radio)' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkboxes' },
];

const emptyField = () => ({
  id: Math.random().toString(36).slice(2),
  label: '',
  type: 'text',
  required: false,
  options: [],
  optionInput: '',
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [form, setForm] = useState({
    eventName: '',
    date: '',
    startTime: '',
    endTime: '',
    hours: '',
    avenue: '',
    externalAllowed: false,
    memberPrice: 'Free',
    nonMemberPrice: 'Free',
    registrationLimit: '',
    registrationDeadline: '',
    upiId: '',
    eventImage: '',
    eventDescription: '',
  });

  const [customFields, setCustomFields] = useState([]);

  const updateForm = (key, value) => setForm(f => ({ ...f, [key]: value }));

  // Cloudinary upload
  const uploadImage = async (file) => {
    setImageUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
      method: 'POST', body: data,
    });
    const json = await res.json();
    setImageUploading(false);
    return json.secure_url;
  };

  // Custom field helpers
  const addField = () => setCustomFields(f => [...f, emptyField()]);
  const removeField = (id) => setCustomFields(f => f.filter(x => x.id !== id));
  const updateField = (id, key, value) =>
    setCustomFields(f => f.map(x => x.id === id ? { ...x, [key]: value } : x));
  const addOption = (id) =>
    setCustomFields(f => f.map(x => {
      if (x.id !== id || !x.optionInput.trim()) return x;
      return { ...x, options: [...x.options, x.optionInput.trim()], optionInput: '' };
    }));
  const removeOption = (id, opt) =>
    setCustomFields(f => f.map(x => x.id === id ? { ...x, options: x.options.filter(o => o !== opt) } : x));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.eventImage) return alert('Please upload an event banner image.');
    setSubmitting(true);
    try {
      const payload = {
        action: 'createEvent',
        adminKey: ADMIN_KEY,
        ...form,
        externalAllowed: form.externalAllowed,
        formFields: customFields.map(({ id, optionInput, ...rest }) => rest),
      };
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Event created! ID: ${data.eventId}`);
        navigate('/admin/dashboard');
      } else {
        alert('Failed to create event: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isPaid = form.memberPrice !== 'Free' || form.nonMemberPrice !== 'Free';

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <SEO title="Create Event" description="Admin — Create a new event" />

      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-sm font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-black text-foreground tracking-tight mb-8">Create New Event</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* ── Section 1: Event Info ── */}
          <Section title="Event Information">
            <Field label="Event Name *">
              <input type="text" required value={form.eventName} onChange={e => updateForm('eventName', e.target.value)} placeholder="e.g. Versova Beach Cleanup" className={input} />
            </Field>
            <Field label="Event Description *">
              <textarea required rows={3} value={form.eventDescription} onChange={e => updateForm('eventDescription', e.target.value)} placeholder="Short description shown on the event card..." className={input} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Date *">
                <input type="date" required value={form.date} onChange={e => updateForm('date', e.target.value)} className={input} />
              </Field>
              <Field label="Start Time *">
                <input type="time" required value={form.startTime} onChange={e => updateForm('startTime', e.target.value)} className={input} />
              </Field>
              <Field label="End Time *">
                <input type="time" required value={form.endTime} onChange={e => updateForm('endTime', e.target.value)} className={input} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="AICTE Hours">
                <input type="number" min="0" step="0.5" value={form.hours} onChange={e => updateForm('hours', e.target.value)} placeholder="e.g. 3" className={input} />
              </Field>
              <Field label="Avenue *">
                <select required value={form.avenue} onChange={e => updateForm('avenue', e.target.value)} className={input}>
                  <option value="">Select Avenue</option>
                  {AVENUES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Registration Deadline *">
              <input type="datetime-local" required value={form.registrationDeadline} onChange={e => updateForm('registrationDeadline', e.target.value)} className={input} />
            </Field>
            <Field label="Registration Limit">
              <input type="number" min="1" value={form.registrationLimit} onChange={e => updateForm('registrationLimit', e.target.value)} placeholder="Leave blank for unlimited" className={input} />
            </Field>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20">
              <input
                type="checkbox"
                id="externalAllowed"
                checked={form.externalAllowed}
                onChange={e => updateForm('externalAllowed', e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="externalAllowed" className="text-sm font-semibold text-foreground/80 cursor-pointer">
                Allow registrations from outside TCET
              </label>
            </div>
          </Section>

          {/* ── Section 2: Pricing ── */}
          <Section title="Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Member Price">
                <input type="text" value={form.memberPrice} onChange={e => updateForm('memberPrice', e.target.value)} placeholder="Free or 150" className={input} />
              </Field>
              <Field label="Non-Member Price">
                <input type="text" value={form.nonMemberPrice} onChange={e => updateForm('nonMemberPrice', e.target.value)} placeholder="Free or 200" className={input} />
              </Field>
            </div>
            <AnimatePresence>
              {isPaid && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Field label="UPI ID (for payment QR)">
                    <input type="text" value={form.upiId} onChange={e => updateForm('upiId', e.target.value)} placeholder="e.g. rctcet@upi" className={input} />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* ── Section 3: Media ── */}
          <Section title="Event Banner">
            {form.eventImage ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={form.eventImage} alt="Preview" className="w-full h-52 object-cover rounded-2xl" />
                <button
                  type="button"
                  onClick={() => updateForm('eventImage', '')}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/20 dark:border-white/10 rounded-2xl p-10 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all ${imageUploading ? 'opacity-60 pointer-events-none' : ''}`}>
                {imageUploading
                  ? <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  : <Upload className="text-foreground/30" size={32} />}
                <p className="text-sm text-foreground/50 font-medium">{imageUploading ? 'Uploading...' : 'Click to upload event banner'}</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files[0]) return;
                    const url = await uploadImage(e.target.files[0]);
                    updateForm('eventImage', url);
                  }}
                />
              </label>
            )}
          </Section>

          {/* ── Section 4: Custom Fields ── */}
          <Section title="Custom Form Fields">
            <p className="text-sm text-foreground/50 mb-4">These will appear after the standard fields (Name, Email, Phone, etc.) in the registration form.</p>

            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {customFields.map((field) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Field label (e.g. T-Shirt Size)"
                        value={field.label}
                        onChange={e => updateField(field.id, 'label', e.target.value)}
                        className={input}
                      />
                      <select value={field.type} onChange={e => updateField(field.id, 'type', e.target.value)} className={input}>
                        {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>

                    {/* Options for radio/dropdown/checkbox */}
                    {['radio', 'dropdown', 'checkbox'].includes(field.type) && (
                      <div className="mb-3">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add an option..."
                            value={field.optionInput}
                            onChange={e => updateField(field.id, 'optionInput', e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addOption(field.id); } }}
                            className={`${input} flex-1`}
                          />
                          <button type="button" onClick={() => addOption(field.id)} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary/20 transition-all">
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.options.map(opt => (
                            <span key={opt} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                              {opt}
                              <button type="button" onClick={() => removeOption(field.id, opt)} className="hover:text-red-500 transition-colors">×</button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={e => updateField(field.id, 'required', e.target.checked)}
                          className="accent-primary"
                        />
                        Required
                      </label>
                      <button type="button" onClick={() => removeField(field.id)} className="text-red-500/60 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addField}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-white/20 dark:border-white/10 rounded-2xl text-sm font-bold text-foreground/50 hover:border-primary/40 hover:text-primary transition-all"
              >
                <Plus size={16} /> Add Custom Field
              </button>
            </div>
          </Section>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all uppercase tracking-widest"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Event...
              </span>
            ) : 'Publish Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Helpers
const input = "w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";

const Section = ({ title, children }) => (
  <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg">
    <h2 className="text-sm font-black uppercase tracking-widest text-foreground/50 mb-5">{title}</h2>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground/70 mb-2">{label}</label>
    {children}
  </div>
);

export default CreateEvent;
