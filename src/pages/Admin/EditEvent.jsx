import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, Upload, GripVertical, ChevronDown } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SEO from '../../Components/SEO';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtc2xaeaf';
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'rctcet_unsigned';

const AVENUES = [
  'Sports', 'Shiksha', 'Club Service', 'Community Service', 'Public Relations',
  'Digital Communication', 'Social media relations', 'Entrepreneurship Development',
  'Editorial Service', 'Partners in Service', 'Professional Development',
  'International Service', 'Marketing', 'Club Ambassador'
];

const FIELD_TYPES = [
  { value: 'text', label: 'Short Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Number' },
  { value: 'radio', label: 'Multiple Choice (Radio)' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'file', label: 'File Upload (Image/PDF)' },
  { value: 'section', label: 'Section Header' },
];

const emptyField = () => ({
  id: Math.random().toString(36).slice(2),
  label: '',
  type: 'text',
  required: false,
  options: [],
  optionInput: '',
  nextSection: '',
  conditionalRouting: {},
});

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(true);

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
    otherCollegePrice: '',
    registrationLimit: '',
    registrationDeadline: '',
    upiId: '',
    eventImage: '',
    eventDescription: '',
  });

  const [customFields, setCustomFields] = useState([]);

  const updateForm = (key, value) => setForm(f => ({ ...f, [key]: value }));

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${APPS_SCRIPT_URL}?action=getEvent&id=${eventId}`);
        const data = await res.json();
        
        setForm({
          eventName: data.eventName || '',
          date: '', 
          startTime: '', 
          endTime: '',
          hours: data.hours || '',
          avenue: data.avenue || '',
          externalAllowed: data.externalAllowed || false,
          memberPrice: data.memberPrice || 'Free',
          nonMemberPrice: data.nonMemberPrice || 'Free',
          otherCollegePrice: data.otherCollegePrice || '',
          registrationLimit: data.registrationLimit || '',
          registrationDeadline: data.registrationDeadline || '',
          upiId: data.upiId || '',
          eventImage: data.eventImage || '',
          eventDescription: data.eventDescription || '',
        });
        setCustomFields(data.formFields || []);
      } catch (e) {
        alert("Failed to load event: " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

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
  
  const updateConditionalRouting = (fieldId, option, value) => {
    setCustomFields(f => f.map(x => {
      if (x.id !== fieldId) return x;
      return { ...x, conditionalRouting: { ...x.conditionalRouting, [option]: value } };
    }));
  };

  const addOption = (id) =>
    setCustomFields(f => f.map(x => {
      if (x.id !== id || !x.optionInput.trim()) return x;
      return { ...x, options: [...x.options, x.optionInput.trim()], optionInput: '' };
    }));
  const removeOption = (id, opt) =>
    setCustomFields(f => f.map(x => {
      if (x.id !== id) return x;
      const newRouting = { ...x.conditionalRouting };
      delete newRouting[opt];
      return { ...x, options: x.options.filter(o => o !== opt), conditionalRouting: newRouting };
    }));

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(customFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCustomFields(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        action: 'editEvent',
        id: eventId,
        adminKey: ADMIN_KEY,
        ...form,
        externalAllowed: form.externalAllowed,
        formFields: customFields.map(({ id, optionInput, ...rest }) => rest),
      };
      
      // Clean up empty date/time fields so we don't accidentally overwrite with empty if they didn't change it
      if (!payload.date) delete payload.date;
      if (!payload.startTime) delete payload.startTime;
      if (!payload.endTime) delete payload.endTime;

      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Event updated!`);
        navigate('/admin/dashboard');
      } else {
        alert('Failed to update event: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isPaid = form.memberPrice !== 'Free' || form.nonMemberPrice !== 'Free' || (form.otherCollegePrice && form.otherCollegePrice !== 'Free');
  const sectionFields = customFields.filter(f => f.type === 'section');

  const renderRoutingDropdown = (value, onChange, placeholder = "Continue to next section", currentSectionId = null) => (
    <select value={value || ''} onChange={e => onChange(e.target.value)} className="w-full p-2 text-xs rounded border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 text-foreground focus:outline-none focus:border-primary">
      <option value="">{placeholder}</option>
      {sectionFields.filter(s => s.id !== currentSectionId).map(s => <option key={s.id} value={s.id}>Go to section: {s.label || 'Untitled Section'}</option>)}
      <option value="submit">Submit Form</option>
    </select>
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <SEO title={`Edit Event ${eventId}`} description="Admin — Edit Event" />

      <div className="max-w-3xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-sm font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-black text-foreground tracking-tight mb-8">Edit Event: {eventId}</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Section 1: Event Info */}
          <Section title="Event Information">
            <Field label="Event Name *">
              <input type="text" required value={form.eventName} onChange={e => updateForm('eventName', e.target.value)} placeholder="e.g. Versova Beach Cleanup" className={input} />
            </Field>
            <Field label="Event Description *">
              <textarea required rows={3} value={form.eventDescription} onChange={e => updateForm('eventDescription', e.target.value)} placeholder="Short description shown on the event card..." className={input} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Date (Leave blank to keep existing)">
                <input type="date" value={form.date} onChange={e => updateForm('date', e.target.value)} className={input} />
              </Field>
              <Field label="Start Time (Leave blank to keep existing)">
                <input type="time" value={form.startTime} onChange={e => updateForm('startTime', e.target.value)} className={input} />
              </Field>
              <Field label="End Time (Leave blank to keep existing)">
                <input type="time" value={form.endTime} onChange={e => updateForm('endTime', e.target.value)} className={input} />
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
            <Field label="Registration Deadline">
              <input type="datetime-local" value={form.registrationDeadline} onChange={e => updateForm('registrationDeadline', e.target.value)} className={input} />
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

          {/* Section 2: Pricing */}
          <Section title="Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Member Price">
                <input type="text" value={form.memberPrice} onChange={e => updateForm('memberPrice', e.target.value)} placeholder="Free or 150" className={input} />
              </Field>
              <Field label="Non-Member Price">
                <input type="text" value={form.nonMemberPrice} onChange={e => updateForm('nonMemberPrice', e.target.value)} placeholder="Free or 200" className={input} />
              </Field>
              <Field label="Other College Price">
                <input type="text" value={form.otherCollegePrice} onChange={e => updateForm('otherCollegePrice', e.target.value)} placeholder="Optional fallback" className={input} />
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

          {/* Section 3: Media */}
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
                <p className="text-sm text-foreground/50 font-medium">{imageUploading ? 'Uploading...' : 'Click to upload event banner (Optional)'}</p>
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

          {/* Section 4: Custom Fields */}
          <Section title="Custom Form Fields">
            <p className="text-sm text-foreground/50 mb-4">These appear after the standard fields (Name, Email, Phone, etc.). Use Section Headers to create a multi-page form.</p>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="custom-fields">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-3">
                    {customFields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white/10 dark:bg-black/20 border ${snapshot.isDragging ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/20 dark:border-white/10'} rounded-2xl p-5`}
                            >
                              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors" {...provided.dragHandleProps}>
                                  <GripVertical size={20} />
                                </div>
                                <button type="button" onClick={() => removeField(field.id)} className="text-red-500/60 hover:text-red-500 transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <input
                                  type="text"
                                  placeholder={field.type === 'section' ? "Section Title" : "Field label (e.g. T-Shirt Size)"}
                                  value={field.label}
                                  onChange={e => updateField(field.id, 'label', e.target.value)}
                                  className={input}
                                />
                                <select value={field.type} onChange={e => updateField(field.id, 'type', e.target.value)} className={input}>
                                  {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                              </div>

                              {field.type === 'section' && (
                                <div className="mb-3 flex flex-col gap-3">
                                  <textarea
                                    placeholder="Section Description (Optional)"
                                    value={field.optionInput}
                                    onChange={e => updateField(field.id, 'optionInput', e.target.value)}
                                    className={input}
                                    rows={2}
                                  />
                                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                                    <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">After section, go to</label>
                                    {renderRoutingDropdown(field.nextSection, val => updateField(field.id, 'nextSection', val), "Continue to next section", field.id)}
                                  </div>
                                </div>
                              )}

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
                                  <div className="flex flex-col gap-2 mt-4">
                                    {field.options.map(opt => (
                                      <div key={opt} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
                                        <div className="flex items-center gap-2 pl-2 text-sm font-semibold">
                                          <button type="button" onClick={() => removeOption(field.id, opt)} className="text-red-400 hover:text-red-500 transition-colors">×</button>
                                          {opt}
                                        </div>
                                        {(field.type === 'radio' || field.type === 'dropdown') && (
                                          <div className="w-full sm:w-48">
                                            {renderRoutingDropdown(field.conditionalRouting?.[opt], val => updateConditionalRouting(field.id, opt, val), "Continue to next section", field.id)}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {field.type !== 'section' && (
                                <div className="flex items-center justify-start mt-4 pt-4 border-t border-white/10">
                                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground/70 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={field.required}
                                      onChange={e => updateField(field.id, 'required', e.target.checked)}
                                      className="accent-primary w-4 h-4"
                                    />
                                    Required
                                  </label>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <button
              type="button"
              onClick={addField}
              className="flex items-center justify-center gap-2 w-full py-4 mt-2 border-2 border-dashed border-white/20 dark:border-white/10 rounded-2xl text-sm font-bold text-foreground/50 hover:border-primary/40 hover:text-primary transition-all"
            >
              <Plus size={16} /> Add Field
            </button>
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
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </form>
        )}
      </div>
    </div>
  );
};

// Helpers
const input = "w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm";

const Section = ({ title, children }) => (
  <div className="bg-white/10 dark:bg-black/20  border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg">
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

export default EditEvent;
