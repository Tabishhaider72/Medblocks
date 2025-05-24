import Navbar from '../components/Navbar';
import PatientForm from '../components/Patient/PatientForm';

export default function NewPatient() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <p className="text-center text-base font-medium mt-7 mb-6 text-gray-700">
          “Every patient you register brings us one step closer to better care. Keep going — you're making a real impact!”
        </p>
        
        <PatientForm />
      </div>
    </div>
  );
}
