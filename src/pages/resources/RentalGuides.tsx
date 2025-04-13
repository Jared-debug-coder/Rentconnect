import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaMoneyBillWave, FaMapMarkerAlt, FaSearch, FaFileAlt, FaHome } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom";  // Importing useNavigate for navigation

const RentalGuides = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container px-4 py-12 flex-1">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}  // Go back one step in the history stack
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 mb-4"
        >
          Go Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Rental Guides</h1>

        <div className="prose prose-lg max-w-none">
          <h2>Finding the Perfect Rental Property in Kenya</h2>
          <p>
            Searching for a rental property in Kenya can be a complex process, but with the right guidance,
            you can find your perfect home. This comprehensive guide will help you navigate the rental market
            and make informed decisions.
          </p>

          <h3 className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" /> Step 1: Determine Your Budget
          </h3>
          <p>
            Before you start looking for properties, establish a clear budget. As a general rule, your rent should
            not exceed 30% of your monthly income. Remember to factor in additional costs such as:
          </p>
          <ul>
            <li>Utility bills (electricity, water, internet)</li>
            <li>Security deposit (typically 1-3 months' rent)</li>
            <li>Service charges for apartments in managed complexes</li>
            <li>Transportation costs to and from work</li>
          </ul>

          <h3 className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500" /> Step 2: Choose the Right Location
          </h3>
          <p>
            Location is one of the most important factors when renting a property. Consider:
          </p>
          <ul>
            <li>Proximity to your workplace or school</li>
            <li>Access to public transportation</li>
            <li>Availability of amenities (shops, hospitals, etc.)</li>
            <li>Security of the neighborhood</li>
            <li>Noise levels and general environment</li>
          </ul>

          <h3 className="flex items-center">
            <FaSearch className="mr-2 text-yellow-500" /> Step 3: Property Viewing Checklist
          </h3>
          <p>
            When viewing potential properties, keep this checklist handy:
          </p>
          <ul>
            <li>Check for signs of dampness or mold</li>
            <li>Test all electrical fixtures and plumbing</li>
            <li>Assess security features (door locks, window grilles, perimeter wall)</li>
            <li>Examine the condition of appliances if included</li>
            <li>Check mobile network reception and internet connectivity</li>
            <li>Inquire about water supply reliability</li>
            <li>Ask about power backup systems for areas with frequent outages</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg my-6">
            <h4 className="font-semibold text-brand-600">Pro Tip</h4>
            <p className="mt-1">
              Visit the property at different times of day to get a complete picture of the neighborhood
              dynamics, traffic patterns, and noise levels.
            </p>
          </div>

          <h3 className="flex items-center">
            <FaFileAlt className="mr-2 text-purple-500" /> Step 4: Understanding Lease Agreements
          </h3>
          <p>
            Before signing any lease agreement, make sure you understand:
          </p>
          <ul>
            <li>Lease duration and renewal terms</li>
            <li>Rent payment schedule and acceptable methods</li>
            <li>Conditions for security deposit refund</li>
            <li>Maintenance responsibilities</li>
            <li>Rules regarding modifications to the property</li>
            <li>Break-lease clauses and penalties</li>
          </ul>

          <h3 className="flex items-center">
            <FaHome className="mr-2 text-red-500" /> Step 5: Moving In
          </h3>
          <p>
            Once you've found your perfect rental property:
          </p>
          <ul>
            <li>Document the condition of the property with photos before moving in</li>
            <li>Ensure all agreed-upon repairs are completed</li>
            <li>Get all agreements in writing, even if verbally promised</li>
            <li>Set up utilities in your name</li>
            <li>Meet neighbors and security personnel</li>
          </ul>

          <p>
            By following these guidelines, you'll be well-equipped to find a rental property that meets your
            needs and offers good value for your money in Kenya's dynamic housing market.
          </p>
        </div>
      </div>

      <Footer />

      {/* Internal CSS Styling */}
      <style>{`
        .container {
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 30px;
          padding-bottom: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .prose h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #374151;
        }

        .prose ul {
          list-style-type: disc;
          margin-left: 20px;
          color: #4b5563;
        }

        .prose ul li {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .bg-gray-50 {
          background-color: #f9fafb;
        }

        .text-brand-600 {
          color: #10b981;
        }

        .font-semibold {
          font-weight: 600;
        }

        .my-6 {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .mt-1 {
          margin-top: 0.25rem;
        }

        .container p {
          font-size: 1rem;
          line-height: 1.75rem;
          color: #6b7280;
        }

        .container h4 {
          font-size: 1.25rem;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
};

export default RentalGuides;
