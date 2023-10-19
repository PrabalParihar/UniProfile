import React, { useState, useEffect } from 'react';

const UserProfile = ({ profile }) => {
  return (
    <div className="bg-white shadow-lg p-4 mb-4 rounded-lg flex items-center">
      <img src={profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mr-4" />
      <div>
        <h2 className="text-xl font-semibold mb-2">{profile.identity}</h2>
        <p>Display Name: {profile.displayName}</p>
        <p>Platform: {profile.platform}</p>
        {/* Display other profile information as needed */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [identity, setIdentity] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = async () => {
    setIsLoading(true);

    try {
      // Make an API request to fetch user profiles based on the entered identity.
      // You can use libraries like axios for this.
      // Replace 'your_api_endpoint' with the actual API endpoint.
      const response = await fetch(`https://api.web3.bio/profile/${identity}`);
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Get Details About Anonymous Web3 Public Addresses</h1>
        <input
          type="text"
          placeholder="Enter Identity"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={fetchProfiles}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Fetch Profiles
        </button>

        {isLoading && <p className="mt-4">Loading profiles...</p>}

        {profiles.map((profile, index) => (
  <UserProfile key={index} profile={profile} />
))}
      </div>
    </div>
  );
};

export default Dashboard;
