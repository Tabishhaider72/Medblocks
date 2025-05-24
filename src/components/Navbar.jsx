import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import arrowIcon from '../assets/arrow.png'; 

export default function Navbar({ showNewPatientButton = false }) {
  const [openDropdown, setOpenDropdown] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? "" : name);
  };

  const menuItems = [
    {
      label: 'Training',
      items: ['openEHR Webinar', 'FHIR Webinar', 'FHIR Bootcamp', 'openEHR Bootcamp'],
    },
    {
      label: 'Product',
      items: ['Platform', 'Medblocks UI'],
    },
    {
      label: 'Services',
      items: ['Medblocks Sprint', 'Hourly Consulting'],
    },
  ];

  const linkStyle = "text-base text-gray-600 hover:text-blue-600 px-2 py-2";
  const dropdownItemStyle = "hover:text-blue-600 cursor-pointer";

  return (
    <nav className="bg-white px-6 py-4 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-[20px] text-black">Medblocks</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {menuItems.map(({ label, items }) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(label)}
              onMouseLeave={() => setOpenDropdown("")}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className={linkStyle}>{label}</span>
                <img src={arrowIcon} alt="arrow" className="w-3 h-3 mt-1" />
              </div>
              {openDropdown === label && (
                <div className="absolute top-10 left-0 w-64 bg-white rounded-lg border border-gray-200 p-4 z-20 space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className={dropdownItemStyle}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/docs" className={linkStyle}>Docs</Link>
          <Link to="/blog" className={linkStyle}>Blog</Link>
          <Link to="/about" className={linkStyle}>About Us</Link>

          {!showNewPatientButton && (
            <Link
              to="/dashboard"
              className="ml-5 bg-blue-600 text-white px-5 py-2 rounded-lg text-base hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
          )}

          {showNewPatientButton && (
            <Link
              to="/new-patient"
              className="ml-5 bg-blue-600 text-white px-5 py-2 rounded-lg text-base hover:bg-blue-700 transition"
            >
              + New Patient
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="h-10 w-10 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4 px-4">
          {menuItems.map(({ label, items }) => (
            <div key={label}>
              <div
                onClick={() => toggleDropdown(label)}
                className="flex justify-between items-center text-gray-600 cursor-pointer"
              >
                <span>{label}</span>
                <img
                  src={arrowIcon}
                  alt="arrow"
                  className={`w-3 h-3 transform transition-transform ${openDropdown === label ? 'rotate-180' : ''}`}
                />
              </div>
              {openDropdown === label && (
                <div className="pl-4 mt-2 space-y-1">
                  {items.map((item, idx) => (
                    <div key={idx} className={dropdownItemStyle}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/docs" className={linkStyle}>Docs</Link>
          <Link to="/blog" className={linkStyle}>Blog</Link>
          <Link to="/about" className={linkStyle}>About Us</Link>

          {!showNewPatientButton && (
            <Link
              to="/dashboard"
              className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Dashboard
            </Link>
          )}

          {showNewPatientButton && (
            <Link
              to="/new-patient"
              className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              + New Patient
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
