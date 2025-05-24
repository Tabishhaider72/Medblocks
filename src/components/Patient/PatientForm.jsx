import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initDb, savePatientToDB } from "../../db/sqlJsDb"; // ⬅️ import initDb
import { departments } from "../../utils/departments";
import image2 from "../../assets/image2.png";
import { motion } from "framer-motion";

const patientTypes = ["Inpatient", "Outpatient", "Emergency", "Routine Checkup"];

export default function PatientForm() {
  const [form, setForm] = useState({
    fullName: "", age: "", gender: "", contact: "",
    address: "", visitDate: "", department: "",
    symptoms: "", doctor: "", type: "",
    insurance: false, policyInfo: "", consent: false
  });

  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  useEffect(() => {
    const selectedDept = departments.find(dep => dep.name === form.department);
    setAvailableSymptoms(selectedDept ? selectedDept.symptoms : []);
    setAvailableDoctors(selectedDept ? selectedDept.doctors : []);
    setForm(prev => ({
      ...prev,
      symptoms: "",
      doctor: ""
    }));
  }, [form.department]);

  // ⬇️ initialize DB on mount
  useEffect(() => {
    initDb();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) return alert("Consent required.");
    await savePatientToDB(form);
    navigate("/dashboard");
  };

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 min-h-screen"
    >
      <motion.section
        className="flex flex-col space-y-4"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} required className={inputClass} value={form.fullName} />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className={inputClass} value={form.age} />
        <select name="gender" onChange={handleChange} required className={inputClass} value={form.gender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="contact" placeholder="Contact Number" onChange={handleChange} required className={inputClass} value={form.contact} />
        <input name="address" placeholder="Address" onChange={handleChange} required className={inputClass} value={form.address} />
      </motion.section>

      <motion.section
        className="flex flex-col space-y-4"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-2">Medical Information</h2>
        <input name="visitDate" type="date" onChange={handleChange} required className={inputClass} value={form.visitDate} />
        <select name="department" onChange={handleChange} required className={inputClass} value={form.department}>
          <option value="">Select Department</option>
          {departments.map(dep => (
            <option key={dep.name} value={dep.name}>{dep.name}</option>
          ))}
        </select>
        <select name="symptoms" onChange={handleChange} required disabled={!form.department} className={inputClass + " disabled:bg-gray-100"} value={form.symptoms}>
          <option value="">Select Symptoms</option>
          {availableSymptoms.map(symptom => (
            <option key={symptom} value={symptom}>{symptom}</option>
          ))}
        </select>
        <select name="doctor" onChange={handleChange} required disabled={!form.department} className={inputClass + " disabled:bg-gray-100"} value={form.doctor}>
          <option value="">Assigned Doctor</option>
          {availableDoctors.map(doctor => (
            <option key={doctor} value={doctor}>{doctor}</option>
          ))}
        </select>
        <select name="type" onChange={handleChange} required className={inputClass} value={form.type}>
          <option value="">Select Patient Type</option>
          {patientTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </motion.section>

      <motion.section
        className="flex flex-col space-y-4"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-2">Insurance & Consent</h2>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" name="insurance" onChange={handleChange} className="form-checkbox h-5 w-5 text-blue-600" checked={form.insurance} />
          <span>Has Insurance?</span>
        </label>
        {form.insurance && (
          <input name="policyInfo" placeholder="Insurance Info" onChange={handleChange} className={inputClass} value={form.policyInfo} />
        )}
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" name="consent" onChange={handleChange} required className="form-checkbox h-5 w-5 text-blue-600" checked={form.consent} />
          <span>Consent to store data</span>
        </label>
        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Submit
        </motion.button>
        <img src={image2} alt="Info graphic" className="mt-4 rounded w-full object-cover max-h-70" />
      </motion.section>
    </form>
  );
}
