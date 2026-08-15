// Initialize Firebase (replace with your Firebase config)
// const firebaseConfig = {
//   apiKey: "AIzaSyClsdZeFbSFMLCw8YWc96m1HsPRrkF4ru0",
//   authDomain: "rctcet-1b6e4.firebaseapp.com",
//   projectId: "rctcet-1b6e4",
//   storageBucket: "rctcet-1b6e4.firebasestorage.app",
//   messagingSenderId: "210277545370",
//   appId: "1:210277545370:web:17eb63e1885c5a43f1f623",
//   measurementId: "G-S97K8B7PQD"
// };
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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactsCollection = collection(db, "contacts");
      await addDoc(contactsCollection, {
        ...formData,
        timestamp: new Date(),
      });

      toast.success("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors flex items-center justify-center px-4">
      <SEO title="Contact Us" description="Get in touch with the Rotaract Club of TCET." />
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-orange-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
          CONTACT US
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your Phone no"
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your Message..."
            className="w-full p-2 mb-4 rounded-xl border border-gray-300 
                       dark:border-gray-700 dark:bg-gray-800 dark:text-white h-32"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-xl 
                       hover:bg-gray-800 transition-colors 
                       dark:bg-orange-600 dark:hover:bg-orange-500"
          >
            SUBMIT
          </button>
        </form>

        <Toaster />
      </motion.div>
    </div>
  );
};

export default ContactForm;
