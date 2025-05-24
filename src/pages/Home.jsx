import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import image from '../assets/image.png';

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center px-6 py-10 max-w-7xl mx-auto gap-10">

        {/* Left Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-[45px] font-bold leading-tight mb-6">
            Health Data Platform <br />
            Driven By{' '}
            <span style={{ color: '#FF861C' }}>open</span>
            <span style={{ color: '#258BB0' }}>EHR</span>{' '}
            <span className="mx-2">&amp;</span>{' '}
            <span style={{ color: '#E90516' }}>FHIR</span>
          </h1>

          <p className="text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            Medblocks is a leading health data platform rooted in openEHR and FHIR standards. Accelerate the delivery of compliant, secure healthcare products and services with unprecedented speed.
          </p>

          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block text-center"
            >
              Dashboard
            </Link>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 w-full max-w-4xl">
          <img src={image} alt="Health Data" className="w-full h-auto object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
}
