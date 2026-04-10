import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DonationPage = () => {
  const { backendurl } = useContext(AppContext);
  const [donations, setDonations] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${backendurl}/apiback/user/donation-get`);
        setDonations(response.data.donations || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setDonations([]); 
      }
    };

    fetchDonations();
  }, [backendurl]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl  text-center text-gray-800 mb-10">Hope Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <div key={donation._id} className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <img 
                src={donation.image} 
                alt="Donation" 
                className="w-full h-72 object-cover"
              />
              <div className="p-3 flex justify-between items-center">
                {/* Display Organ Name if donortype is "Organ" */}
                <p className="text-2xl font-semibold text-gray-900">
                  {donation.donortype === 'Organ' ? donation.organ : donation.donortype}
                </p>
                <button 
                  onClick={() => navigate(`/donate/${donation._id}`)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition duration-300 shadow-md"
                >
                  Donate
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No donations available</p>
        )}
      </div>
    </div>
  );
};
