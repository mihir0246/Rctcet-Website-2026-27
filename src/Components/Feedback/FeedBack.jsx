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
    <div className="relative min-h-screen p-6 md:p-12 lg:p-24 bg-background flex items-center justify-center overflow-hidden pt-32 lg:pt-40">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none z-0" 
        style={{ backgroundImage: `url('https://res.cloudinary.com/dtc2xaeaf/image/upload/v1771630629/Baseline_grid_bg_zywtov.svg')`, backgroundSize: '100px' }}
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch justify-center relative z-10 perspective-[2000px]">

        {/* Left Side - 3 Pinned Cards */}
        <div className="lg:w-1/3 flex flex-col gap-6 justify-center mt-12 lg:mt-0">

          {/* Card 1: Email */}
          <div className="relative bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-[2rem] shadow-xl transform transition-all duration-500 lg:-rotate-3 hover:rotate-0 hover:scale-105 hover:z-20 group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(110,159,159,0.2)] z-10">
            <div className="absolute -top-4 left-6 text-primary drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-20">
              <FaThumbtack className="text-4xl transform -rotate-45 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            <div className="flex justify-between items-start mb-2 mt-4">
              <h3 className="text-2xl font-bold text-foreground">Email Us</h3>
              <div className="bg-primary/20 backdrop-blur-md p-3 rounded-2xl border border-primary/30 text-primary">
                <FaEnvelope className="text-xl" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted mb-6 leading-relaxed">We usually respond within 24 hours.</p>
            <a href="mailto:tcetrotaract@gmail.com" className="font-bold text-lg text-primary hover:text-primary-hover underline underline-offset-4 transition-colors">tcetrotaract@gmail.com</a>
          </div>

          {/* Card 2: Location */}
          <div className="relative bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-[2rem] shadow-xl transform transition-all duration-500 lg:rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(110,159,159,0.2)] z-10">
            <div className="absolute -top-4 left-6 text-primary drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-20">
              <FaThumbtack className="text-4xl transform -rotate-45 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            <div className="flex justify-between items-start mb-6 mt-4">
              <h3 className="text-2xl font-bold text-foreground">Location</h3>
              <div className="bg-primary/20 backdrop-blur-md p-3 rounded-2xl border border-primary/30 text-primary">
                <FaMapMarkerAlt className="text-xl" />
              </div>
            </div>
            <a href="https://maps.app.goo.gl/yD6JJuuEj3RkYJJD8?g_st=ic" target="_blank" rel="noreferrer" className="text-lg font-bold text-primary hover:text-primary-hover underline underline-offset-4 transition-colors">
              TCET, Mumbai
            </a>
          </div>

          {/* Card 3: Connect */}
          <div className="relative bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-[2rem] shadow-xl transform transition-all duration-500 lg:-rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(110,159,159,0.2)] z-10">
            <div className="absolute -top-4 left-6 text-primary drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-20">
              <FaThumbtack className="text-4xl transform -rotate-45 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            <div className="flex justify-between items-start mb-6 mt-4">
              <h3 className="text-2xl font-bold text-foreground">Connect</h3>
            </div>
            <div className="flex flex-col gap-4">
              <a href="https://www.instagram.com/rc_tcet/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group/link">
                <div className="bg-primary/20 backdrop-blur-md p-3 rounded-2xl border border-primary/30 text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors duration-300">
                  <FaInstagram className="text-xl" />
                </div>
                <span className="font-bold text-lg text-foreground group-hover/link:text-primary transition-colors">@rc_tcet</span>
              </a>
              <a href="https://www.linkedin.com/company/rotaract-club-of-tcet/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group/link">
                <div className="bg-primary/20 backdrop-blur-md p-3 rounded-2xl border border-primary/30 text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors duration-300">
                  <FaLinkedin className="text-xl" />
                </div>
                <span className="font-bold text-lg text-foreground group-hover/link:text-primary transition-colors">Rotaract Club of TCET</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Side - Form Container */}
        <div className="lg:w-2/3 transform transition-all duration-500 lg:rotate-1 hover:rotate-0 mt-8 lg:mt-0 relative z-20">
          <div className="relative bg-white/10 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-full flex flex-col justify-center">
            
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tight">Send a Message</h2>
              <p className="text-muted text-lg">Have a question or want to collaborate? Reach out to us!</p>
            </div>

            {successMsg && (
              <div className="bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30 p-4 rounded-xl mb-8 font-medium">{successMsg}</div>
            )}
            {errorMsg && (
              <div className="bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 p-4 rounded-xl mb-8 font-medium">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Full Name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Email Address <span className="text-primary">*</span></label>
                  <input
                    type="email"
                    name="mail"
                    placeholder="john@college.edu"
                    value={formData.mail}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Event Name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    name="event"
                    placeholder="Beach Cleanup"
                    value={formData.event}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Club Name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    name="clubname"
                    placeholder="Rotaract Club of TCET"
                    value={formData.clubname}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-foreground/30 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold mb-3 text-foreground/80 uppercase tracking-wider">Your Message <span className="text-primary">*</span></label>
                <textarea
                  name="feedback"
                  placeholder="How can we collaborate together?"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl focus:outline-none focus:border-primary/60 dark:focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-foreground/30 font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white font-black text-lg py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(110,159,159,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(110,159,159,0.4)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-4"
              >
                {loading ? "SUBMITTING..." : "SEND MESSAGE"}
                {!loading && <span className="text-2xl leading-none">↗</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
