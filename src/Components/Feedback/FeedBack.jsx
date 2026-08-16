import { useState } from "react";
import axios from "axios";
import { FaInstagram, FaLinkedin, FaEnvelope, FaThumbtack, FaMapMarkerAlt } from "react-icons/fa";

export default function FeedBackForm() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    event: "",
    feedback: "",
    clubname: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addFeedBack`,
        formData
      );
      setSuccessMsg(res.data.message || "Feedback submitted successfully!");
      setFormData({
        name: "",
        mail: "",
        event: "",
        feedback: "",
        clubname: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-white dark:bg-stone-900 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 items-stretch justify-center perspective-[2000px]">

        {/* Left Side - 3 Pinned Cards */}
        <div className="md:w-1/3 flex flex-col gap-6 justify-center">

          {/* Card 1: Email */}
          <div className="relative bg-orange-500 p-6 rounded-xl shadow-lg shadow-orange-500/20 transform transition-all duration-300 md:-rotate-3 hover:rotate-0 hover:scale-105 hover:z-10 group text-white">
            <div className="absolute -top-3 left-4 text-stone-200/80 drop-shadow-md z-20">
              <FaThumbtack className="text-3xl transform -rotate-45" />
            </div>
            <div className="flex justify-between items-start mb-2 mt-4">
              <h3 className="text-xl font-bold">Email Us</h3>
              <div className="bg-white/20 p-2 rounded-full">
                <FaEnvelope className="text-lg" />
              </div>
            </div>
            <p className="text-sm font-medium opacity-90 mb-4">We usually respond within 24 hours.</p>
            <a href="mailto:tcetrotaract@gmail.com" className="font-semibold text-white hover:text-stone-200 underline">tcetrotaract@gmail.com</a>
          </div>

          {/* Card 2: Location */}
          <div className="relative bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6 rounded-xl shadow-lg transform transition-all duration-300 md:rotate-2 hover:rotate-0 hover:scale-105 hover:z-10 group text-stone-800 dark:text-white">
            <div className="absolute -top-3 left-4 text-orange-500 drop-shadow-md z-20">
              <FaThumbtack className="text-3xl transform -rotate-45" />
            </div>
            <div className="flex justify-between items-start mb-2 mt-4">
              <h3 className="text-xl font-bold">Location</h3>
              <div className="bg-orange-100 dark:bg-stone-700 p-2 rounded-full text-orange-600 dark:text-orange-400">
                <FaMapMarkerAlt className="text-lg" />
              </div>
            </div>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">Mumbai, India</p>
          </div>

          {/* Card 3: Connect */}
          <div className="relative bg-stone-100 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 p-6 rounded-xl shadow-lg transform transition-all duration-300 md:-rotate-2 hover:rotate-0 hover:scale-105 hover:z-10 group text-stone-800 dark:text-white">
            <div className="absolute -top-3 left-4 text-orange-500 drop-shadow-md z-20">
              <FaThumbtack className="text-3xl transform -rotate-45" />
            </div>
            <div className="flex justify-between items-start mb-4 mt-4">
              <h3 className="text-xl font-bold">Connect</h3>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/rc_tcet/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="bg-white dark:bg-stone-600 p-2 rounded-full text-orange-600 dark:text-orange-400">
                  <FaInstagram className="text-lg" />
                </div>
                <span className="font-medium text-sm text-stone-700 dark:text-stone-200">@rc_tcet</span>
              </a>
              <a href="https://www.linkedin.com/company/rotaract-club-of-tcet/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="bg-white dark:bg-stone-600 p-2 rounded-full text-orange-600 dark:text-orange-400">
                  <FaLinkedin className="text-lg" />
                </div>
                <span className="font-medium text-sm text-stone-700 dark:text-stone-200">Rotaract Club of TCET</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Side - Form Container */}
        <div className="md:w-2/3 transform transition-all duration-500 md:rotate-1 hover:rotate-0 mt-8 md:mt-0">
          {/* Outer Board (like a clipboard or framing) */}
          <div className="bg-stone-200 dark:bg-stone-800 p-4 md:p-6 rounded-[2rem] shadow-2xl h-full border-b-8 border-r-8 border-stone-300 dark:border-stone-950">
            {/* Inner Form Area */}
            <div className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-white rounded-[1.5rem] p-8 md:p-10 h-full border border-stone-200 dark:border-stone-800">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Send a Message</h2>

              {successMsg && (
                <div className="bg-green-100 text-green-700 border border-green-200 p-4 rounded-xl mb-6">{successMsg}</div>
              )}
              {errorMsg && (
                <div className="bg-red-100 text-red-700 border border-red-200 p-4 rounded-xl mb-6">{errorMsg}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2 text-stone-600 dark:text-stone-400">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2 text-stone-600 dark:text-stone-400">Email Address *</label>
                    <input
                      type="email"
                      name="mail"
                      placeholder="john@school.edu"
                      value={formData.mail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2 text-stone-600 dark:text-stone-400">Event Name *</label>
                    <input
                      type="text"
                      name="event"
                      placeholder="Event"
                      value={formData.event}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2 text-stone-600 dark:text-stone-400">Club Name *</label>
                    <input
                      type="text"
                      name="clubname"
                      placeholder="Club Name"
                      value={formData.clubname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-stone-600 dark:text-stone-400">Your Message *</label>
                  <textarea
                    name="feedback"
                    placeholder="How can we collaborate?"
                    value={formData.feedback}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors resize-none text-stone-800 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 transform hover:-translate-y-1 flex items-center gap-2 mt-4"
                >
                  {loading ? "Submitting..." : "Send Message"}
                  {!loading && <span className="text-lg leading-none">➣</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
