import SEO from "../Components/SEO";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { upcomingEvents } from "../data/events";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    isMember: "No",
  });

  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundEvent = upcomingEvents.find((ev) => ev.id === eventId);
    if (foundEvent) {
      setEventData(foundEvent);
    } else {
      // Event not found, you could also navigate to 404 or events list
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let receiptUrl = "";

      const effectivePrice = formData.isMember === "Yes"
        ? (eventData.memberPrice !== undefined ? eventData.memberPrice : "Free")
        : eventData.price;

      if (paymentReceipt && effectivePrice !== "Free") {
        toast.loading("Uploading receipt to Cloudinary...", { id: "uploadToast" });

        const uploadData = new FormData();
        uploadData.append("file", paymentReceipt);

        // TODO: Replace this placeholder with your actual Cloudinary Unsigned Upload Preset name
        uploadData.append("upload_preset", "YOUR_UNSIGNED_PRESET_HERE");

        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dtc2xaeaf/image/upload", {
          method: "POST",
          body: uploadData,
        });

        const cloudinaryResult = await cloudinaryResponse.json();

        if (cloudinaryResult.secure_url) {
          receiptUrl = cloudinaryResult.secure_url;
        } else {
          throw new Error("Cloudinary upload failed");
        }

        toast.dismiss("uploadToast");
      }

      const registrationsCollection = collection(db, "registrations");
      await addDoc(registrationsCollection, {
        ...formData,
        eventId: eventData.id,
        eventName: eventData.title,
        receiptUrl: receiptUrl,
        timestamp: new Date(),
        type: "event_registration"
      });

      toast.success("Registration submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
        isMember: "No",
      });
      setPaymentReceipt(null);

      const fileInput = document.getElementById("receiptInput");
      if (fileInput) fileInput.value = "";

      // Optionally redirect to events page after short delay
      setTimeout(() => navigate("/events"), 2000);

    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.dismiss("uploadToast");
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!eventData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Event not found</h2>
        <Link to="/events" className="text-primary hover:underline font-medium">Browse Upcoming Events</Link>
      </div>
    );
  }

  const effectivePrice = formData.isMember === "Yes"
    ? (eventData?.memberPrice !== undefined ? eventData.memberPrice : "Free")
    : eventData?.price;

  return (
    <div className="min-h-screen bg-background transition-colors py-12 px-4 flex justify-center relative overflow-hidden">
      <SEO title={`Register - ${eventData.title}`} description={eventData.description} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8"
      >
        {/* Left Side: Event Details */}
        <div className="md:col-span-2">
          <div className="sticky top-24 bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/10">
            <img
              src={eventData.image}
              alt={eventData.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
                Event Registration
              </span>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {eventData.title}
              </h2>
              <p className="text-foreground/70 text-sm mb-6">
                {eventData.description}
              </p>

              <div className="border-t border-white/20 dark:border-white/10 pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground/80">Member Fee</span>
                  <span className="text-xl font-bold text-primary drop-shadow-sm">
                    {eventData.memberPrice !== undefined
                      ? (eventData.memberPrice === "Free" ? "Free" : `₹${eventData.memberPrice}`)
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground/80">Non-Member Fee</span>
                  <span className="text-xl font-bold text-primary drop-shadow-sm">
                    {eventData.price === "Free" ? "Free" : `₹${eventData.price}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-3 bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/10">
          <h3 className="text-xl font-bold text-foreground mb-6 border-b border-white/20 dark:border-white/10 pb-4">
            Participant Details
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Branch/Department *</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Year of Study *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                >
                  <option value="" disabled className="bg-background text-foreground">Select Year</option>
                  <option value="FE" className="bg-background text-foreground">First Year (FE/FT)</option>
                  <option value="SE" className="bg-background text-foreground">Second Year (SE/ST)</option>
                  <option value="TE" className="bg-background text-foreground">Third Year (TE/TT)</option>
                  <option value="BE" className="bg-background text-foreground">Fourth Year (BE/BT)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Are you a Rotaract Member? *</label>
              <select
                name="isMember"
                value={formData.isMember}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
              >
                <option value="No" className="bg-background text-foreground">Not a member</option>
                <option value="Yes" className="bg-background text-foreground">Member</option>
              </select>
            </div>

            {/* Payment Section */}
            {effectivePrice !== "Free" && (
              <div className="mb-8 p-5 rounded-2xl border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-inner">
                <h4 className="font-bold text-foreground mb-4 text-center">Payment Details</h4>
                <p className="text-center text-sm text-foreground/70 mb-4">Please scan the QR code to pay ₹{effectivePrice}</p>

                {eventData.qrCode ? (
                  <div className="bg-white p-2 rounded-xl w-fit mx-auto mb-4">
                    <img src={eventData.qrCode} alt="Payment Scanner" className="w-40 h-40 rounded-lg shadow-sm object-contain" />
                  </div>
                ) : (
                  <div className="w-40 h-40 mx-auto rounded-xl bg-white/10 dark:bg-black/40 flex items-center justify-center mb-4 border border-white/10">
                    <span className="text-xs text-foreground/50 font-medium">Scanner not available</span>
                  </div>
                )}

                <label className="block text-sm font-medium text-foreground mb-2">Upload Payment Receipt *</label>
                <input
                  id="receiptInput"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={(e) => setPaymentReceipt(e.target.files[0])}
                  className="w-full p-2.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary/90 text-white p-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 uppercase tracking-widest font-bold text-sm ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "SUBMITTING..." : "CONFIRM REGISTRATION"}
            </button>
          </form>

          <Toaster />
        </div>
      </motion.div>
    </div>
  );
};

export default EventRegistration;
