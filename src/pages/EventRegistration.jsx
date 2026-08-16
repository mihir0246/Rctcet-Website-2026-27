import SEO from "../components/SEO";
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1A1612]">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Event not found</h2>
        <Link to="/events" className="text-orange-500 hover:underline font-medium">Browse Upcoming Events</Link>
      </div>
    );
  }

  const effectivePrice = formData.isMember === "Yes"
    ? (eventData?.memberPrice !== undefined ? eventData.memberPrice : "Free")
    : eventData?.price;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1612] transition-colors py-12 px-4 flex justify-center">
      <SEO title={`Register - ${eventData.title}`} description={eventData.description} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8"
      >
        {/* Left Side: Event Details */}
        <div className="md:col-span-2">
          <div className="sticky top-24 bg-white dark:bg-[#2D241C] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-[#4A3B2F]">
            <img
              src={eventData.image}
              alt={eventData.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="inline-block bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Event Registration
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {eventData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {eventData.description}
              </p>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Member Fee</span>
                  <span className="text-xl font-bold text-orange-500">
                    {eventData.memberPrice !== undefined
                      ? (eventData.memberPrice === "Free" ? "Free" : `₹${eventData.memberPrice}`)
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Non-Member Fee</span>
                  <span className="text-xl font-bold text-orange-500">
                    {eventData.price === "Free" ? "Free" : `₹${eventData.price}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-3 bg-white dark:bg-[#2D241C] rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-[#4A3B2F]">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            Participant Details
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch/Department *</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year of Study *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
                >
                  <option value="" disabled>Select Year</option>
                  <option value="FE">First Year (FE/FT)</option>
                  <option value="SE">Second Year (SE/ST)</option>
                  <option value="TE">Third Year (TE/TT)</option>
                  <option value="BE">Fourth Year (BE/BT)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Are you a Rotaract Member? *</label>
              <select
                name="isMember"
                value={formData.isMember}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-[#4A3B2F] dark:bg-[#1A1612] dark:text-white focus:border-orange-500 outline-none transition-colors"
              >
                <option value="No">Not a member</option>
                <option value="Yes">Member</option>
              </select>
            </div>

            {/* Payment Section */}
            {effectivePrice !== "Free" && (
              <div className="mb-8 p-5 rounded-xl border-2 border-orange-100 dark:border-gray-700 bg-orange-50/50 dark:bg-[#1A1612]">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">Payment Details</h4>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">Please scan the QR code to pay ₹{effectivePrice}</p>

                {eventData.qrCode ? (
                  <img src={eventData.qrCode} alt="Payment Scanner" className="w-40 h-40 mx-auto rounded-lg shadow-sm mb-4 object-contain bg-white p-2" />
                ) : (
                  <div className="w-40 h-40 mx-auto rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <span className="text-xs text-gray-500">Scanner not available</span>
                  </div>
                )}

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Payment Receipt *</label>
                <input
                  id="receiptInput"
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={(e) => setPaymentReceipt(e.target.files[0])}
                  className="w-full p-2 rounded-xl border border-gray-300 dark:border-[#4A3B2F] bg-white dark:bg-[#1A1612] text-gray-800 dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 dark:file:bg-orange-900/30 dark:file:text-orange-400"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-orange-500 text-white p-3.5 rounded-xl hover:bg-orange-600 transition-colors font-bold tracking-wide shadow-lg shadow-orange-500/30 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
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
