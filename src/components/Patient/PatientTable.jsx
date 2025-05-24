import React, { useEffect, useState, useMemo, useRef } from 'react';
import { getAllPatients } from '../../db/sqlJsDb';
import { exportComponentAsPNG } from 'react-component-export-image';

const FILTER_OPTIONS = [
  { label: 'All', days: null },
  { label: 'Last Day', days: 1 },
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last Month', days: 30 },
  { label: 'Last Year', days: 365 },
];

export default function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDays, setFilterDays] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    getAllPatients().then(setPatients);
  }, []);

  const isWithinDays = (dateStr, days) => {
    if (!days) return true;
    const date = new Date(dateStr);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);
    return diff <= days;
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      if (!isWithinDays(p.visitDate, filterDays)) return false;
      const term = searchTerm.toLowerCase();
      return (
        p.fullName.toLowerCase().includes(term) ||
        p.department.toLowerCase().includes(term) ||
        p.doctor.toLowerCase().includes(term) ||
        p.contact.toLowerCase().includes(term) ||
        p.visitDate.toLowerCase().includes(term)
      );
    });
  }, [patients, searchTerm, filterDays]);

  return (
    <div style={{ margin: '6rem' }}>
      {/* Filter and Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <select
          value={filterDays ?? ''}
          onChange={(e) => setFilterDays(e.target.value ? Number(e.target.value) : null)}
          style={{
            padding: '0.2rem',
            borderRadius: '0.5rem',
            border: '1px solid #2f57f6',
            backgroundColor: 'white',
            color: 'black',
            fontSize: '1rem',
          }}
        >
          {FILTER_OPTIONS.map(({ label, days }) => (
            <option key={label} value={days ?? ''}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #2f57f6',
            backgroundColor: 'white',
            color: 'black',
            fontSize: '1rem',
            width: '500px',
          }}
        />
      </div>

      {/* Patient Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#ffff', color: '#2f57f6' }}>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Full Name</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Age</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Contact</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Date of Visit</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Department</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>Doctor</th>
            <th style={{ padding: '1rem', borderBottom: '1px solid black' }}>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>
                No patients found.
              </td>
            </tr>
          ) : (
            filteredPatients.map((p, index) => (
              <tr key={index} style={{ borderBottom: '1px white' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold', color: '#2f57f6'}}>{p.fullName}</td>
                <td style={{ padding: '1rem' }}>{p.age}</td>
                <td style={{ padding: '1rem' }}>{p.contact}</td>
                <td style={{ padding: '1rem' }}>{p.visitDate}</td>
                <td style={{ padding: '1rem' }}>{p.department}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      backgroundColor: '#f68d2f',
                      color: '#fff',
                      borderRadius: '1rem',
                      padding: '0.25rem 0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    {p.doctor}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => setSelectedPatient(p)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#007bff',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '1rem',
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedPatient && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            ref={modalRef}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              width: '400px',
              position: 'relative',
              color: 'black',
            }}
          >
            <button
              onClick={() => setSelectedPatient(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: '1rem' }}>Patient Details</h2>
            <p>
              <strong>Full Name:</strong> {selectedPatient.fullName}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p>
              <strong>Contact:</strong> {selectedPatient.contact}
            </p>
            <p>
              <strong>Date of Visit:</strong> {selectedPatient.visitDate}
            </p>
            <p>
              <strong>Department:</strong> {selectedPatient.department}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedPatient.doctor}
            </p>
            <button
              onClick={() => exportComponentAsPNG(modalRef, { fileName: 'patient-details.png' })}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid black',
                backgroundColor: '#f68d2f',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
