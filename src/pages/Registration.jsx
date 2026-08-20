import SEO from "../Components/SEO";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
};

// Reusable input component for clean UI - MOVED OUTSIDE to prevent re-renders losing focus
const InputField = ({ label, name, type = "text", required = true, placeholder = "", options = null, isTextarea = false, formData, handleChange }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-semibold text-foreground mb-1.5 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="w-full p-3.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
      >
        <option value="" disabled className="bg-background text-foreground">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
        ))}
      </select>
    ) : isTextarea ? (
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full p-3.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner h-24 custom-scrollbar"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full p-3.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/50 shadow-inner"
      />
    )}
  </div>
);

const CheckboxGroup = ({ label, field, options, required = true, formData, handleCheckboxChange }) => (
  <div className="mb-6 w-full">
    <label className="block text-sm font-semibold text-foreground mb-3 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors cursor-pointer">
          <input
            type="checkbox"
            value={opt}
            checked={formData[field].includes(opt)}
            onChange={(e) => handleCheckboxChange(e, field)}
            className="w-4 h-4 text-primary bg-background border-white/20 rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm font-medium text-foreground">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const RadioGroup = ({ label, name, options, required = true, formData, handleChange }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-semibold text-foreground mb-3 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={formData[name] === opt}
            onChange={handleChange}
            required={required}
            className="w-4 h-4 text-primary bg-background border-white/20 focus:ring-primary"
          />
          <span className="text-sm font-medium text-foreground">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const formRef = React.useRef(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal
    email: "",
    personalEmail: "",
    gsuiteId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    // Step 2: Academic & Location
    year: "",
    department: "",
    division: "",
    rollNumber: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    pincode: "",
    city: "",
    railwayStation: "",
    // Step 3: Family
    fatherName: "",
    fatherAge: "",
    fatherOccupation: "",
    motherName: "",
    motherAge: "",
    motherOccupation: "",
    motherOccupationOther: "", // if other selected
    parentContact: "",
    hasSiblings: "",
    siblingCount: "",
    // Step 4: Skills
    rotaractYear: "",
    hobbies: "",
    helpWith: [],
    playSports: "",
    sportsAchievement: "",
    culturalActivities: [],
    culturalAchievement: "",
    // Step 5: Payment
    paymentMethod: "",
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

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const currentValues = prevState[field];
      if (checked) {
        return { ...prevState, [field]: [...currentValues, value] };
      } else {
        return { ...prevState, [field]: currentValues.filter((v) => v !== value) };
      }
    });
  };

  const nextStep = () => {
    // Check HTML5 validity of the form inputs before proceeding
    if (formRef.current && !formRef.current.reportValidity()) {
      return; // Stop if there are validation errors
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== totalSteps) {
      nextStep();
      return;
    }

    if (!paymentReceipt) {
      toast.error("Please upload the payment screenshot.");
      return;
    }

    setIsSubmitting(true);

    try {
      let receiptUrl = "";
      if (paymentReceipt) {
        toast.loading("Uploading receipt to Cloudinary...", { id: "uploadToast" });
        
        const uploadData = new FormData();
        uploadData.append("file", paymentReceipt);
        // Use the Unsigned Upload Preset provided by the user
        uploadData.append("upload_preset", "rctcet_receipts");

        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/rctcet/image/upload", {
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

      const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_MEMBERSHIP_URL || "";
      
      if (!scriptUrl) {
        throw new Error("Google Apps Script URL is missing! Add VITE_GOOGLE_APPS_SCRIPT_MEMBERSHIP_URL to your .env file.");
      }

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          receiptUrl: receiptUrl,
          eventId: generalMembershipEvent.id,
          eventName: generalMembershipEvent.title,
        }),
      });

      toast.success("Membership Registration submitted successfully!");
      setStep(1);
      setFormData({
        email: "", personalEmail: "", gsuiteId: "", firstName: "", middleName: "", lastName: "",
        dob: "", gender: "", bloodGroup: "", phone: "", year: "", department: "", division: "",
        rollNumber: "", addressLine1: "", addressLine2: "", addressLine3: "", pincode: "", city: "",
        railwayStation: "", fatherName: "", fatherAge: "", fatherOccupation: "", motherName: "",
        motherAge: "", motherOccupation: "", motherOccupationOther: "", parentContact: "", hasSiblings: "",
        siblingCount: "", rotaractYear: "", hobbies: "", helpWith: [], playSports: "",
        sportsAchievement: "", culturalActivities: [], culturalAchievement: "", paymentMethod: "",
      });
      setPaymentReceipt(null);
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.dismiss("uploadToast");
      toast.error(`Error: ${error.message || "Failed to submit registration"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">Personal Details</h2>
            <InputField label="Personal Mail ID" name="personalEmail" type="email" formData={formData} handleChange={handleChange} />
            <InputField label="Gsuite ID (Enter NA if not applicable)" name="gsuiteId" formData={formData} handleChange={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="First Name" name="firstName" formData={formData} handleChange={handleChange} />
              <InputField label="Middle Name" name="middleName" formData={formData} handleChange={handleChange} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Last Name" name="lastName" formData={formData} handleChange={handleChange} />
              <InputField label="Date of Birth" name="dob" type="date" formData={formData} handleChange={handleChange} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Gender" name="gender" options={["Male", "Female", "Prefer not to say"]} formData={formData} handleChange={handleChange} />
              <InputField label="Blood Group" name="bloodGroup" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} formData={formData} handleChange={handleChange} />
            </div>
            <InputField label="Mobile Number" name="phone" type="tel" formData={formData} handleChange={handleChange} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">Academic & Location Details</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Year" name="year" options={["FE", "SE", "TE", "BE"]} formData={formData} handleChange={handleChange} />
              <InputField label="Department" name="department" options={["COMPS", "IT", "AI&DS", "AI&ML", "IOT", "E&TC", "CIVIL", "BBA", "MECH", "E&CS", "CSE(Cyber Security)", "BCA", "MME", "B.Voc"]} formData={formData} handleChange={handleChange} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Division" name="division" options={["A", "B", "C", "D", "N/A"]} formData={formData} handleChange={handleChange} />
              <InputField label="Roll Number" name="rollNumber" formData={formData} handleChange={handleChange} />
            </div>
            <InputField label="Residential Address Line 1" name="addressLine1" formData={formData} handleChange={handleChange} />
            <InputField label="Residential Address Line 2" name="addressLine2" formData={formData} handleChange={handleChange} />
            <InputField label="Residential Address Line 3" name="addressLine3" required={false} formData={formData} handleChange={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Pincode" name="pincode" type="number" formData={formData} handleChange={handleChange} />
              <InputField label="City" name="city" formData={formData} handleChange={handleChange} />
            </div>
            <InputField label="Nearby Railway Station" name="railwayStation" formData={formData} handleChange={handleChange} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">Family Details</h2>
            <InputField label="Full Name of Father" name="fatherName" formData={formData} handleChange={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Age of Father" name="fatherAge" type="number" formData={formData} handleChange={handleChange} />
              <RadioGroup label="Occupation of Father" name="fatherOccupation" options={["Working", "Non-Working"]} formData={formData} handleChange={handleChange} />
            </div>
            <InputField label="Full Name of Mother" name="motherName" formData={formData} handleChange={handleChange} />
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField label="Age of Mother" name="motherAge" type="number" formData={formData} handleChange={handleChange} />
              <div className="w-full">
                <RadioGroup label="Occupation of Mother" name="motherOccupation" options={["Working", "Non-Working", "Other"]} formData={formData} handleChange={handleChange} />
                {formData.motherOccupation === "Other" && (
                  <InputField label="Specify Other Occupation" name="motherOccupationOther" formData={formData} handleChange={handleChange} />
                )}
              </div>
            </div>
            <InputField label="Contact No. of your parent" name="parentContact" type="tel" formData={formData} handleChange={handleChange} />
            <RadioGroup label="Any Siblings?" name="hasSiblings" options={["Yes", "No"]} formData={formData} handleChange={handleChange} />
            {formData.hasSiblings === "Yes" && (
              <InputField label="If yes, How many?" name="siblingCount" type="number" formData={formData} handleChange={handleChange} />
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">Skills & Rotaract Profile</h2>
            <InputField label="Rotaract Year" name="rotaractYear" options={["First Year of Rotaract", "Second Year of Rotaract", "Third Year of Rotaract"]} formData={formData} handleChange={handleChange} />
            <InputField label="Any Hobbies/Skills?" name="hobbies" isTextarea formData={formData} handleChange={handleChange} />
            <CheckboxGroup 
              label="You can help us with" 
              field="helpWith" 
              options={["Celebrity Contact", "Car/Bike", "Production Contacts", "Camera (DSLR)", "Sponsorships & Associations", "Venue Contacts/Permissions & Associations", "Editing/Content Writing", "Doctor Contact", "Celebrity Speaker Contacts", "None"]} 
              formData={formData} handleCheckboxChange={handleCheckboxChange}
            />
            <InputField label="Do you play any sports? (Mention name)" name="playSports" isTextarea formData={formData} handleChange={handleChange} />
            <InputField label="Do you have any special recognition/achievement in sports?" name="sportsAchievement" isTextarea formData={formData} handleChange={handleChange} />
            <CheckboxGroup 
              label="Are you good at any of the following cultural activities?" 
              field="culturalActivities" 
              options={["Singing", "Dance", "Musical Instrument", "Drama", "Monologue", "None"]} 
              formData={formData} handleCheckboxChange={handleCheckboxChange}
            />
            <InputField label="Do you have any special recognition/achievement in any of the above cultural activities?" name="culturalAchievement" isTextarea formData={formData} handleChange={handleChange} />
          </motion.div>
        );
      case 5:
        // Dynamic QR code generation for UPI
        const upiString = `upi://pay?pa=ajayboss004@okaxis&pn=Ajay%20Sharma&am=${generalMembershipEvent.price}&cu=INR`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

        return (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">Payment & Declaration</h2>
            
            <RadioGroup label="Payment Method" name="paymentMethod" options={["UPI", "Google Pay", "PayTM", "IMPS", "Cash", "Other"]} formData={formData} handleChange={handleChange} />

            {["UPI", "Google Pay", "PayTM", "IMPS"].includes(formData.paymentMethod) && (
              <div className="mb-8 p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-inner text-foreground">
                <h4 className="text-center font-bold text-foreground mb-2 text-xl">Registration Fee: ₹{generalMembershipEvent.price}</h4>
                <p className="text-center text-sm text-foreground/70 mb-6">Scan the QR code below to pay with any UPI app</p>
                
                <div className="bg-white p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg border border-gray-200">
                  <img src={qrUrl} alt="Dynamic UPI QR Code" className="w-56 h-56 rounded-lg object-contain mix-blend-multiply" />
                </div>

                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl text-center mb-6 border border-white/10 text-sm space-y-2 text-foreground">
                  <p><span className="font-bold">Name of Account:</span> Ajay Sharma</p>
                  <p><span className="font-bold">Account Number:</span> 04120100030365</p>
                  <p><span className="font-bold">IFS Code:</span> BARB0SAKINA</p>
                  <p><span className="font-bold">Name of Bank:</span> Bank Of Baroda</p>
                  <p><span className="font-bold">Bank Branch:</span> Branch - Sakinaka</p>
                  <p><span className="font-bold">UPI ID:</span> ajayboss004@okaxis</p>
                </div>
                
                <label className="block text-sm font-semibold text-foreground mb-3 text-center">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                <div className="flex justify-center">
                  <input 
                    id="receiptInput"
                    type="file" 
                    accept="image/*,.pdf"
                    required
                    onChange={(e) => setPaymentReceipt(e.target.files[0])}
                    className="w-full max-w-sm p-2.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 transition-all cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="mb-8 p-6 rounded-2xl border-l-4 border-primary bg-primary/5 dark:bg-primary/10">
              <h3 className="font-bold text-primary mb-3 text-lg uppercase tracking-wider">Declaration</h3>
              <p className="text-sm font-medium leading-relaxed mb-4 text-foreground/90">
                ALL OF THE DETAILS FILLED BY YOU IS KEPT CONFIDENTIAL WITH US AND WITH ONLY A LIMITED ACCESS. YOU DO NOT HAVE TO WORRY ABOUT ANY SORT OF DATA/PRIVACY BREACH. 
                WE AT ROTARACT CLUB OF TCET ASSURE THAT ALL OF THIS DATA WOULD BE KEPT CONFIDENTIAL AT ALL COST.
              </p>
              <h4 className="font-bold text-red-500 dark:text-red-400 mb-2 uppercase tracking-wider">Important Notice</h4>
              <p className="text-sm font-medium leading-relaxed mb-4 text-foreground/90">
                AFTER FILLING UP OF THIS FORM, ALL THE DETAILS ENTERED WILL BE SCRUTINIZED AND YOU'LL BE ADDED TO THE ROTARACT CLUB OF TCET'S OFFICIAL GROUP WITHIN 3 DAYS. IN CASE YOU HAVEN'T BEEN ADDED FOR MORE THAN 3 DAYS, PLEASE FEEL FREE TO CONTACT THE FOLLOWING AND APPROACH THEM WITH THE SAME:
              </p>
              <div className="text-sm font-bold text-foreground space-y-1">
                <p>Rtr. Tiya Agrawal : +91 77770 18975</p>
                <p>Rtr. Maithali Mani : +91 89692 52527</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
      <SEO title="Join RCTCET" description="Register to become a member of the Rotaract Club of TCET." />

      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/10 dark:bg-black/40 backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 uppercase tracking-tighter drop-shadow-sm">
            Membership Form
          </h1>
          <p className="text-foreground/70 font-medium text-lg">Step {step} of {totalSteps}</p>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto h-2 bg-black/10 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 font-bold text-foreground bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all shadow-sm ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 font-bold text-white bg-primary hover:bg-primary/90 border border-white/20 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-10 py-3 font-black text-white bg-gradient-to-r from-primary to-secondary hover:shadow-[0_10px_30px_rgba(110,159,159,0.5)] border border-white/20 rounded-xl transition-all shadow-xl hover:-translate-y-1 tracking-widest uppercase
                           ${isSubmitting ? "opacity-70 cursor-not-allowed transform-none hover:shadow-none" : ""}`}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT FORM"}
              </button>
            )}
          </div>
        </form>

        <Toaster />
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
