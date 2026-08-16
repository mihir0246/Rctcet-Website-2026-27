import SEO from "../Components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const generalMembershipEvent = {
  id: "rotaract-membership",
  title: "RC TCET Membership",
  price: "650",
  qrCode: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    reasonToJoin: "",
  });

  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (paymentReceipt) {
        toast.loading("Uploading receipt to Cloudinary...", { id: "uploadToast" });
        
        const uploadData = new FormData();
        uploadData.append("file", paymentReceipt);
        
        // TODO: Replace this placeholder with your actual Cloudinary Unsigned Upload Preset name
        uploadData.append("upload_preset", "YOUR_UNSIGNED_PRESET_HERE"); 

        // Uploading to dtc2xaeaf (your Cloudinary cloud name)
        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dtc2xaeaf/image/upload", {
          method: "POST",
          body: uploadData,
        });

        const cloudinaryResult = await cloudinaryResponse.json();

        if (cloudinaryResult.secure_url) {
          receiptUrl = cloudinaryResult.secure_url;
        } else {
          throw new Error("Cloudinary upload failed: " + (cloudinaryResult.error?.message || "Unknown error"));
        }

        toast.dismiss("uploadToast");
      }

      const registrationsCollection = collection(db, "registrations");
      await addDoc(registrationsCollection, {
        ...formData,
        eventId: generalMembershipEvent.id,
        eventName: generalMembershipEvent.title,
        receiptUrl: receiptUrl,
        timestamp: new Date(),
      });

      toast.success("Membership Registration submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
        reasonToJoin: "",
      });
      setPaymentReceipt(null);
      
      const fileInput = document.getElementById("receiptInput");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.dismiss("uploadToast");
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <SEO title="Join RCTCET" description="Register to become a member of the Rotaract Club of TCET." />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-orange-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg relative z-10"
      >
        <h1 className="text-4xl font-bold text-orange-500 mb-2 text-center">
          JOIN RCTCET
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Become a part of our legacy.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your Phone no"
            required
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch / Department"
              required
              className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="" disabled>Select Year</option>
              <option value="FE">First Year (FE/FT)</option>
              <option value="SE">Second Year (SE/ST)</option>
              <option value="TE">Third Year (TE/TT)</option>
              <option value="BE">Fourth Year (BE/BT)</option>
            </select>
          </div>

          <textarea
            name="reasonToJoin"
            value={formData.reasonToJoin}
            onChange={handleChange}
            placeholder="Why do you want to join RCTCET?"
            required
            className="w-full p-2 mb-6 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white h-32"
          />

          {/* Payment Section */}
          <div className="mb-6 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-center font-bold text-gray-800 dark:text-white mb-2">Registration Fee: ₹{generalMembershipEvent.price}</h4>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">Scan the QR code below to pay</p>
            
            <img src={generalMembershipEvent.qrCode} alt="Payment Scanner" className="w-48 h-48 mx-auto rounded-lg shadow-md mb-4 object-contain bg-white" />
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Payment Receipt *</label>
            <input 
              id="receiptInput"
              type="file" 
              accept="image/*,.pdf"
              required
              onChange={(e) => setPaymentReceipt(e.target.files[0])}
              className="w-full p-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-orange-900/30 dark:file:text-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black text-white p-3 rounded-xl 
                       hover:bg-gray-800 transition-colors 
                       dark:bg-orange-600 dark:hover:bg-orange-500 font-bold tracking-wide
                       ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "SUBMITTING..." : "REGISTER NOW"}
          </button>
        </form>

        <Toaster />
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
