import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export const DonationPersonal = () => {
  const { donationId } = useParams();
  const { backendurl } = useContext(AppContext);
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const response = await axios.post(`${backendurl}/apiback/user/donation-getbyId`, { donationId });
        setDonation(response.data);
      } catch (error) {
        console.error('Error fetching donation details:', error);
      }
    };

    fetchDonationDetails();
  }, [donationId, backendurl]);

  if (!donation) {
    return <p className="text-center text-lg text-gray-600">Loading donation details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center  justify-center p-8">
      <div className="bg-white  rounded-2xl  w-full max-w-4xl">
        {/* Image Section */}
        <img 
          src={donation.image} 
          alt="Donation" 
          className="w-full  object-cover rounded-t-2xl shadow-md"
        />
        
        {/* Content Section */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            {donation.firstname} {donation.lastname}
          </h2>
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-gray-700">
              <p className="text-lg font-semibold">Age:</p>
              <p className="text-gray-900">{donation.age} years</p>
            </div>
            <div className="text-gray-700">
              <p className="text-lg font-semibold">Donation Type:</p>
              <p className="text-gray-900">{donation.donortype}</p>
            </div>
            
            {/* Organ Name Section (Only if Donor Type is Organ) */}
            {donation.donortype === 'Organ' && (
              <div className="text-gray-700">
                <p className="text-lg font-semibold">Organ Name:</p>
                <p className="text-gray-900">{donation.organ}</p>
              </div>
            )}

            <div className="text-gray-700 col-span-2">
              <p className="text-lg font-semibold">Description:</p>
              <p className="text-gray-900">{donation.description}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg col-span-2 shadow-sm">
              <p className="text-lg font-semibold">Contact Information:</p>
              <p className="text-gray-900">📧 Email: {donation.email}</p>
              <p className="text-gray-900">📞 Phone: {donation.phone}</p>
            </div>
            <div className="bg-gray-50 rounded-lg  shadow-sm">
              <p className="text-lg font-semibold">Payment Information:</p>
              <p className="text-gray-900">UPI Id: {donation.upiid}</p>
             
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-6">
            {donation.donortype === 'Money' ? (
              <button className="w-full bg-primary text-white py-3 rounded-xl text-lg font-bold hover:bg-primary transition duration-300 shadow-lg">
                💰 Pay Now on UPI
              </button>
            ) : (
              <p className="text-center text-lg text-green-700 font-semibold">
                📢 Please contact the donor directly for further details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
