import { useState } from 'react';
import Navbar from '../components/Navbar';
import PatientTable from '../components/Patient/PatientTable';
import PatientModal from '../components/Patient/PatientModal';

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div>
      <Navbar showNewPatientButton={true} />  {/* pass a prop */}
      <div className="p-4">
        <PatientTable onView={setSelectedPatient} />
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      </div>
    </div>
  );
}
