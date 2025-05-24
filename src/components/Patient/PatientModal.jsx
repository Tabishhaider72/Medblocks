export default function PatientModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-2">{patient.fullName}</h2>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
        <p>Contact: {patient.contact}</p>
        <p>Address: {patient.address}</p>
        <p>Visit Date: {patient.visitDate}</p>
        <p>Department: {patient.department}</p>
        <p>Doctor: {patient.doctor}</p>
        <p>Type: {patient.type}</p>
        <p>Insurance: {patient.insurance ? patient.policyInfo : "No"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
